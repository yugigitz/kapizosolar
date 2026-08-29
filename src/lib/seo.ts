import { SITE_URL, business, phones } from '@/data/business'
import { serviceList } from '@/data/services'

export type SeoConfig = {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applySeo({ title, description, path, ogImage, noindex }: SeoConfig) {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? `${SITE_URL}/kapizo-solar-og.png`

  document.title = title
  upsertMeta('meta[name="description"]', 'name', 'description', description)
  upsertMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  )
  upsertLink('canonical', url)

  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', image)
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', business.name)
  upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN')

  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)
}

const JSONLD_ID = 'kapizo-jsonld'

export function applyJsonLd(schemas: object[]) {
  document.querySelectorAll(`script[data-kapizo="${JSONLD_ID}"]`).forEach((n) => n.remove())
  if (!schemas.length) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.dataset.kapizo = JSONLD_ID
  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
  document.head.appendChild(script)
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${business.address.line1}, ${business.address.line2}`,
  addressLocality: business.address.city,
  addressRegion: business.address.state,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
}

const areaServed = [
  { '@type': 'AdministrativeArea', name: 'Telangana' },
  { '@type': 'City', name: 'Mancherial' },
]

/**
 * One business entity, typed as both Organization and LocalBusiness rather than
 * emitted as two nodes — they describe the same company, and duplicate nodes
 * with different @ids would misrepresent that as two entities.
 *
 * Deliberately omitted, because none of it is verified: aggregateRating,
 * review, award, hasCredential, foundingDate, numberOfEmployees, priceRange,
 * openingHours and geo coordinates.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: business.name,
  url: SITE_URL,
  logo: `${SITE_URL}/kapizo-logo.png`,
  image: `${SITE_URL}/kapizo-logo.png`,
  description: business.description,
  slogan: business.tagline,
  telephone: `+91${phones.primary}`,
  address: postalAddress,
  areaServed,
  knowsAbout: serviceList,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: `+91${phones.primary}`,
      contactType: 'sales',
      areaServed: 'IN-TG',
      availableLanguage: ['en', 'te', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      telephone: `+91${phones.secondary}`,
      contactType: 'customer support',
      areaServed: 'IN-TG',
      availableLanguage: ['en', 'te', 'hi'],
    },
  ],
  // No founder/jobTitle nodes: designations are not finalised, and structured
  // data must not assert a role the site does not state.
}

/**
 * Kept as a named export so pages can reference the business entity explicitly.
 * It is the same node as `organizationSchema`; emitting both on one page is a
 * no-op because they share an @id.
 */
export const localBusinessSchema = organizationSchema

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: business.name,
  description: business.description,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Telangana' },
      { '@type': 'City', name: 'Mancherial' },
    ],
  }
}
