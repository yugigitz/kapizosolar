/**
 * Build-time prerendering.
 *
 * The site is a Vite SPA, so the shipped index.html contains no content and no
 * per-route metadata until React runs. Search crawlers that execute JavaScript
 * cope with that, but many clients do not — notably WhatsApp, Facebook and
 * other link-preview scrapers, and several AI answer engines.
 *
 * This script serves the built `dist/` folder, visits every route in headless
 * Chromium, waits for React to render and for the per-route <head> tags to be
 * applied, then writes the resulting HTML to dist/<route>/index.html.
 *
 * The result is a static site where every route has real content, its own
 * title, description, canonical, Open Graph tags and JSON-LD in the raw HTML —
 * while remaining a normal SPA once hydrated.
 *
 * This step is additive. If Chromium is unavailable the build still succeeds
 * and the site still works as a client-rendered SPA.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const PORT = 5199

export const ROUTES = [
  '/',
  '/solar-calculator',
  '/solutions',
  '/solutions/residential',
  '/solutions/commercial',
  '/solutions/industrial',
  '/solutions/agricultural',
  '/plans',
  '/plans/essential',
  '/plans/recommended',
  '/plans/high-performance',
  '/pm-surya-ghar',
  '/solar-knowledge',
  '/solar-knowledge/rooftop-solar-guide-telangana',
  '/solar-knowledge/on-grid-vs-hybrid-solar',
  '/solar-knowledge/how-to-choose-solar-system-size',
  '/solar-knowledge/net-metering-explained',
  '/solar-knowledge/solar-maintenance-guide',
  '/about',
  '/faq',
  '/contact',
  '/privacy-policy',
  '/terms',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      let filePath = path.join(DIST, urlPath)
      if (!existsSync(filePath) || urlPath === '/' || !path.extname(filePath)) {
        filePath = path.join(DIST, 'index.html')
      }
      const body = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end('not found')
    }
  })
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)))
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error('prerender: dist/index.html not found — run `vite build` first.')
    process.exit(1)
  }

  let browser
  try {
    browser = await chromium.launch()
  } catch (err) {
    console.warn(
      '\nprerender: could not launch Chromium, skipping prerender.\n' +
        '           The build is still valid and works as a client-rendered SPA,\n' +
        '           but routes will not have static HTML for non-JS crawlers.\n' +
        '           Run `npx playwright install chromium` to enable prerendering.\n' +
        `           (${err.message.split('\n')[0]})\n`,
    )
    return
  }

  const server = await startServer()
  const page = await browser.newPage()
  // Block external hosts so the build does not depend on network egress.
  await page.route('**/*', (route) =>
    route.request().url().startsWith(`http://127.0.0.1:${PORT}`) ? route.continue() : route.abort(),
  )

  let written = 0
  for (const route of ROUTES) {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'load' })
    // Wait until the router has applied this route's canonical link.
    await page.waitForFunction(
      (expected) => {
        const c = document.querySelector('link[rel="canonical"]')
        return !!c && c.getAttribute('href')?.endsWith(expected === '/' ? '.in/' : expected)
      },
      route,
      { timeout: 10000 },
    )
    // Reveal-on-scroll elements start hidden; make them visible in static HTML
    // so the content is present and legible without JavaScript.
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'))
    })

    const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))

    const outDir = route === '/' ? DIST : path.join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), html, 'utf8')
    written++
  }

  await browser.close()
  server.close()
  console.log(`prerender: wrote ${written} static route${written === 1 ? '' : 's'}.`)
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
