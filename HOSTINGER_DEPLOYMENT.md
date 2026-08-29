# Deploying Kapizo Solar to Hostinger

Manual deployment guide for `kapizosolar.in` on Hostinger shared hosting.

Nothing in this repository connects to Hostinger, touches DNS, or deploys
automatically. Every step below is one you run yourself.

---

## Before you start

You need:

- Your Hostinger hPanel login
- The lead notification mailbox `connect@kapizosolar.in`, which already exists.
  You do not need to create a second mailbox: the same address is used both as
  the destination and as the sending identity
- Node.js 18 or newer on the machine where you run the build

Confirm PHP is enabled for the domain in hPanel → Advanced → PHP Configuration.
PHP 8.0 or newer is fine. The lead form will not work without it.

---

## 1. Build the site

```bash
npm install
npm run build
```

This produces `dist/`. The build also prerenders all 23 routes to static HTML,
which is what lets Google, and WhatsApp link previews, read the pages without
running JavaScript.

You should see this line at the end:

```
prerender: wrote 23 static routes.
```

If it says prerendering was skipped, run `npx playwright install chromium` and
build again. The site still works without it, but shared links will preview
blank and search engines will see empty pages.

---

## 2. Directory structure on Hostinger

Two things must sit **outside** `public_html`, where the web server cannot
serve them: your credentials, and your customer lead data.

```
/home/uXXXXXXX/                 ← your Hostinger home directory
│
├── .env                        ← credentials. NEVER inside public_html
├── storage/                    ← lead store. NEVER inside public_html
│   └── leads.jsonl               (created automatically on first enquiry)
│
└── public_html/                ← everything from dist/ goes here
    ├── .htaccess               ← IMPORTANT: hidden file, easy to miss
    ├── index.html
    ├── robots.txt
    ├── sitemap.xml
    ├── llms.txt
    ├── favicon.svg
    ├── apple-touch-icon.png
    ├── kapizo-logo.png
    ├── kapizo-solar-og.png
    ├── api/
    │   └── submit-lead.php     ← the lead endpoint
    ├── assets/                 ← hashed JS, CSS and images
    ├── about/index.html
    ├── contact/index.html
    ├── faq/index.html
    ├── plans/index.html
    ├── plans/essential/index.html
    ├── plans/recommended/index.html
    ├── plans/high-performance/index.html
    ├── pm-surya-ghar/index.html
    ├── privacy-policy/index.html
    ├── solar-calculator/index.html
    ├── solar-knowledge/index.html
    ├── solar-knowledge/…/index.html      (5 articles)
    ├── solutions/index.html
    ├── solutions/…/index.html            (4 segments)
    └── terms/index.html
```

**Upload the entire contents of `dist/` into `public_html` — not the `dist`
folder itself.** If you end up with `public_html/dist/index.html`, the site
will not load.

---

## 3. Upload

**Option A — hPanel File Manager**

1. Zip the *contents* of `dist/` (select everything inside it, not the folder).
2. hPanel → Files → File Manager → open `public_html`.
3. Delete any existing placeholder such as `default.php` or Hostinger's
   parking page.
4. Upload the zip and use *Extract*.
5. **Turn on hidden files** (File Manager → Settings → Show hidden files) and
   confirm `.htaccess` is present. It is the single most commonly missed file,
   and without it every page except the homepage returns 404.

**Option B — FTP**

Get FTP credentials from hPanel → Files → FTP Accounts, then upload everything
inside `dist/` to `public_html`. Make sure your FTP client is set to show and
transfer hidden files, or `.htaccess` will be silently skipped.

---

## 4. Create the `.env` file

In File Manager, navigate **one level above** `public_html` — you should see
`public_html` listed as a folder. Create a new file there named `.env`:

```ini
LEAD_TO_EMAIL=connect@kapizosolar.in
LEAD_FROM_EMAIL=connect@kapizosolar.in
LEAD_SUBJECT_PREFIX=[Kapizo Lead]
LEAD_STORE_PATH=/home/uXXXXXXX/storage/leads.jsonl
LEAD_RATE_LIMIT_PER_HOUR=20
LEAD_ALLOWED_ORIGINS=https://kapizosolar.in,https://www.kapizosolar.in
```

### What each value means

| Variable | What to enter |
|---|---|
| `LEAD_TO_EMAIL` | Where enquiries are emailed. Use `connect@kapizosolar.in`. Comma-separate to add people later: `connect@kapizosolar.in,partner@kapizosolar.in` |
| `LEAD_FROM_EMAIL` | The address the notification is sent *from*. Use `connect@kapizosolar.in` — the same mailbox. It must be an address on kapizosolar.in, because mail claiming to come from a domain you do not control is rejected or filtered. This is **not** a login: the site sends via PHP `mail()`, so no password is involved |
| `LEAD_SUBJECT_PREFIX` | Subject-line prefix. Useful for a mail filter |
| `LEAD_STORE_PATH` | Absolute path to the lead file. Replace `uXXXXXXX` with your real username — the File Manager shows it in the path bar. Must be outside `public_html` |
| `LEAD_RATE_LIMIT_PER_HOUR` | Max enquiries accepted from one IP per hour. `20` is sensible; raise it only if you see genuine customers blocked |
| `LEAD_ALLOWED_ORIGINS` | Which sites may post to the endpoint. Leave as-is unless you add a domain |

Nothing here is secret in the password sense, but it should not be public. The
`.env` sits outside the web root, and `.htaccess` blocks `.env` by name as a
second layer in case one is ever uploaded into `public_html` by mistake.

Then create the `storage` folder next to `.env`. The endpoint creates it
automatically on the first enquiry, but making it yourself lets you confirm the
path is right. Permissions `750` are enough.

---

## 5. Enable HTTPS

hPanel → Security → SSL. Install the free certificate for `kapizosolar.in` and
wait for it to show as active.

Do this **before** testing the site. The `.htaccess` redirects all HTTP traffic
to `https://kapizosolar.in`, so until the certificate is live you will get
browser warnings.

You do not need to configure the redirect anywhere — `.htaccess` already
handles both HTTP → HTTPS and `www` → non-`www`, in a single hop.

---

## 6. Point the domain

If `kapizosolar.in` is registered with Hostinger and already attached to this
hosting plan, there is nothing to do.

If it is registered elsewhere, point its nameservers at Hostinger using the
values shown in hPanel → Domains. DNS changes can take a few hours to
propagate; the site will be intermittently unreachable until they settle. This
is normal and not a fault in the deployment.

---

## 7. Post-deployment checklist

Work through this in order. Each step catches a different failure.

### Pages

- [ ] `https://kapizosolar.in` loads
- [ ] `http://kapizosolar.in` redirects to `https://`
- [ ] `https://www.kapizosolar.in` redirects to the non-`www` address
- [ ] Open `https://kapizosolar.in/plans/recommended` **directly in a fresh tab**,
      not by clicking through. If this 404s, `.htaccess` did not upload
- [ ] Refresh a deep page with F5 — it should stay on that page
- [ ] `https://kapizosolar.in/no-such-page` shows the 404 page
- [ ] Check on a real phone, not just a narrow desktop window

### The lead form — the important one

- [ ] Submit a real test enquiry from `/contact`
- [ ] You get the green confirmation with a `KPZ-...` reference
- [ ] **The notification email arrives.** Check spam
- [ ] The line appears in `storage/leads.jsonl` (File Manager → View)

If the confirmation appears but no email arrives, the lead is still saved to
`leads.jsonl` — that is deliberate, so a mail misconfiguration never loses a
customer. Fix `LEAD_FROM_EMAIL` (it must be a mailbox on your domain) and test
again.

If you get "Your enquiry was not sent", PHP is not running or the endpoint did
not upload. Confirm `public_html/api/submit-lead.php` exists and PHP is enabled.

### Contact paths

- [ ] Tap the phone number on a mobile — the dialler opens with 7799049801
- [ ] Tap a WhatsApp button — WhatsApp opens with the message prefilled
- [ ] Use the calculator, then "Get My Detailed Solar Quote" — the WhatsApp
      message should contain your bill, customer type and estimated system size

### Security

- [ ] `https://kapizosolar.in/.env` returns 403 or 404 — **never** file contents
- [ ] `https://kapizosolar.in/storage/leads.jsonl` returns 403 or 404
- [ ] `https://kapizosolar.in/assets/` does not list files

If any of these show real content, stop and re-check that `.env` and `storage/`
are outside `public_html`.

### Search engines — after the above passes

- [ ] `https://kapizosolar.in/robots.txt` and `/sitemap.xml` load
- [ ] Paste a page link into a WhatsApp chat to yourself. The preview should
      show the title, description and logo. A blank preview means the
      prerendered files did not upload
- [ ] Add the site to Google Search Console and submit
      `https://kapizosolar.in/sitemap.xml`
- [ ] Add it to Bing Webmaster Tools

---

## Updating the site later

```bash
git pull
npm install
npm run build
```

Then re-upload the contents of `dist/` to `public_html`, overwriting.

You do **not** need to touch `.env` or `storage/` again — they live outside
`public_html` and are not affected by re-uploads. That separation is the reason
they are there.

Asset filenames contain a content hash, so browsers pick up changes
immediately. If a page looks stale, hard-refresh with Ctrl+F5.

---

## If something breaks

**Every page except the homepage 404s** — `.htaccess` is missing from
`public_html`. Enable hidden files in File Manager and upload it.

**The site loads but is unstyled** — you probably uploaded the `dist` folder
itself instead of its contents. Files should be at `public_html/index.html`,
not `public_html/dist/index.html`.

**The form says "not sent"** — PHP is off, or `api/submit-lead.php` is missing.
Check both in hPanel.

**Confirmation works but no email** — `LEAD_FROM_EMAIL` is not a mailbox on
`kapizosolar.in`. The leads are safe in `leads.jsonl` meanwhile.

**Redirect loop** — the SSL certificate is not active yet. Wait for hPanel to
show it as issued.

**Changes do not appear** — hard-refresh (Ctrl+F5). If it persists, clear any
cache in hPanel → Advanced.

---

## Still to be filled in

These are commercial values the site currently shows as "Shared on request".
They live in one file, `src/data/plans.ts`, and appear everywhere
automatically once set:

- Price per kW for each plan
- Warranty terms — module, inverter, battery, workmanship
- `recommendedReason` for the Essential and High Performance options

Two other open items:

- The logo PNG has a baked near-white background rather than true
  transparency. It is used on light backgrounds only, so this is not visible
  today, but a properly transparent version would give more freedom.
- The PM Surya Ghar subsidy figures were verified against Government of India
  and MNRE published sources. Confirm them on
  [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in) before launch, since scheme
  terms change.
