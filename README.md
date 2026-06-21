# NEXIUSE — Digital Agency Website

React + Vite marketing agency site with a working contact form via
**Netlify Forms** (no third-party API keys needed).

---

## ⚡ Quick Start

```bash
npm install
cp .env.example .env        # fill in your contact info (see below)
npm run dev                  # → http://localhost:5173
```

> ⚠️ Netlify Forms only works once deployed on Netlify — it won't
> actually send anything while running `npm run dev` locally. That's
> expected; just test the UI locally and verify real submissions
> after deploying.

---

## 📬 How the contact form works

Netlify scans your repo at **build time** for any `<form>` with a
`data-netlify="true"` attribute and registers it. Since our real form
is rendered client-side by React (which Netlify's build bot can't
see), we ship a tiny **hidden static form** in `index.html` purely so
Netlify knows the form exists and what fields to expect:

```html
<!-- index.html -->
<form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input type="text" name="user_name" />
  <input type="email" name="user_email" />
  <input type="text" name="company" />
  <input type="text" name="service" />
  <textarea name="message"></textarea>
  <input type="text" name="bot-field" />
</form>
```

The real, interactive form in `Contact.jsx` submits via `fetch()` to
the same Netlify endpoint with `form-name: contact` in the payload.
No SDK, no API keys, no third-party account.

### Viewing submissions
Netlify Dashboard → your site → **Forms** tab. Every submission shows
up there automatically.

### Getting emailed when a form is submitted
1. Netlify Dashboard → your site → **Site configuration → Forms**
2. Under **Form notifications** → **Add notification** → **Email notification**
3. Enter your inbox address → Save

Free tier = 100 submissions/month, which is far more than enough at
this stage.

### Spam protection
The hidden `bot-field` input is a honeypot — bots that fill in every
field (including hidden ones) get silently rejected by Netlify.
Real users never see it.

---

## 🌍 Language Switching (English / Macedonian) — URL-based

The site uses **react-i18next** + **react-router-dom**. Language is part
of the URL, not just client state:

```
nexiuse.com/en   ← English version
nexiuse.com/mk   ← Macedonian version
nexiuse.com/     ← redirects to /en or /mk automatically
```

This means you can hand out **`nexiuse.com/mk`** directly on a cold call
or in a Macedonian-language ad, and the visitor lands straight on the
Macedonian version — no guessing, no toggle needed, no confusion.

### File structure

```
src/i18n/
├── index.js              ← i18next config (resources only — language is set by the URL)
├── LanguageLayout.jsx     ← reads the :lang URL param, syncs it to i18next, redirects invalid langs
├── RootRedirect.jsx       ← handles "/" → sends visitor to /en or /mk
└── locales/
    ├── en.json            ← English translations
    └── mk.json             ← Macedonian translations
```

### How it works
- Visiting `/` checks `localStorage` first, then browser language, then defaults to `/en`
- Visiting `/mk` or `/en` directly always shows that language, regardless of saved preference
- The navbar's **EN / МК** toggle swaps the URL prefix while preserving any in-page anchor (e.g. switching while on `#contact` keeps you scrolled to the contact section)
- Whichever language you land on via direct link gets remembered in `localStorage` for next time you visit `/`
- Invalid paths (e.g. `/fr`, `/anything-else`) redirect back to a valid language automatically

### Editing translations
Open `en.json` or `mk.json` and edit the text directly — no JSX touching
needed. The JSON structure mirrors the page sections (`hero`, `services`,
`pricing`, `contact`, etc.). Both files must keep the **same keys**, only
the values differ.

Example — changing the hero subtitle:
```json
// en.json
"hero": {
  "sub": "From websites that convert to campaigns that scale..."
}

// mk.json
"hero": {
  "sub": "Од веб-страници што продаваат до кампањи што растат..."
}
```

### Adding a third language
1. Create `src/i18n/locales/de.json` (or whichever), copying `en.json`'s structure
2. Import it in `src/i18n/index.js` and add it to the `resources` object
3. Add `'de'` to `SUPPORTED_LANGS` in the same file
4. Add a button/option in `Navbar.jsx`'s language switcher

---




```
src/
├── components/
│   ├── Cursor.jsx
│   ├── Navbar.jsx + Navbar.module.css
│   ├── Hero.jsx + Hero.module.css
│   ├── Ticker.jsx
│   ├── Services.jsx + Services.module.css
│   ├── Process.jsx + Process.module.css
│   ├── Pricing.jsx + Pricing.module.css
│   ├── Contact.jsx + Contact.module.css       ← Netlify Forms lives here
│   ├── Footer.jsx + Footer.module.css
│   └── CookieConsent.jsx + .module.css        ← cookie banner
├── hooks/
│   └── useReveal.js
├── i18n/
│   ├── index.js
│   ├── LanguageLayout.jsx
│   ├── RootRedirect.jsx
│   └── locales/
│       ├── en.json
│       └── mk.json
├── styles/
│   └── global.css
├── App.jsx                  ← router shell (defines /en, /mk, /privacy, / routes)
├── HomePage.jsx              ← actual page content (Hero, Services, etc.)
├── PrivacyPage.jsx + .module.css
├── PageviewTracker.jsx       ← fires GA pageview on every route change
├── SEO.jsx                   ← dynamic per-route, per-language meta tags
├── analytics.js              ← GA4 + Consent Mode v2 logic
└── main.jsx
public/
├── robots.txt
└── sitemap.xml
index.html                                      ← SEO meta tags + hidden Netlify form
netlify.toml                                     ← build + SPA redirect config
```

---

## 🔍 SEO Setup

The site ships with the technical SEO basics already in place:

- `index.html` — static fallback meta title/description (English), Open Graph + Twitter card tags, canonical URL, `hreflang` tags for EN/MK, and `ProfessionalService` structured data (JSON-LD) so Google understands this is a local business
- `src/SEO.jsx` — **dynamic, per-route, per-language** meta tags using `react-helmet-async`. Once the app mounts, this overrides the static tags with the real title/description/keywords for whichever language (`/en` or `/mk`) and page the visitor is actually on
- `public/robots.txt` — allows all crawlers, points to the sitemap
- `public/sitemap.xml` — lists both `/en` and `/mk` with language alternates

### Why dynamic meta tags matter for Macedonian SEO specifically
Google indexes `/en` and `/mk` as separate pages. If both showed the
same English `<title>` and description (which is what a plain static
`index.html` would do), Google has no strong signal that `/mk` is
actually relevant to Macedonian-language searches — it just sees
duplicate English content at two URLs. With `SEO.jsx` wired in:

- Visiting `/mk` → real Macedonian `<title>`, description, and keywords (pulled from `mk.json`'s `seo` key) — written with actual Macedonian search phrases like *"изработка на веб страници"*, not literal English translations
- Visiting `/en` → English equivalents
- Visiting `/en/privacy` or `/mk/privacy` → their own dedicated title/description, not the homepage's

**Where to edit this copy:** `src/i18n/locales/mk.json` → the `seo` key (and `privacy.seoTitle` / `privacy.seoDescription` for the privacy page). Same structure in `en.json`.

### A known limitation (SPA-specific, not a bug)
Google's crawler executes JavaScript before indexing, so it **does**
see the correct per-language title/description from `SEO.jsx`. However,
simpler crawlers — like the ones Facebook/WhatsApp/Twitter use to
generate link preview cards — often don't run JavaScript fully, so a
shared link might show the static English fallback from `index.html`
regardless of which language URL was shared. This only affects social
link previews, not actual Google search rankings. Not worth solving
unless you start running paid social campaigns that rely on rich link
previews — at that point, server-side rendering (Next.js) would be
the real fix, which is a bigger migration than this project needs
right now.

**Before going live, update these placeholders:**
1. In `index.html` — replace every `nexiuse.com` reference with your real domain once you buy it
2. In `index.html` — replace `REPLACE_WITH_YOUR_VERIFICATION_CODE` (see Google Search Console steps below) — only needed if you use the HTML tag method; skip if you verified via DNS instead
3. Add a real `og-image.jpg` (1200×630px) to `public/` for link previews on social media/WhatsApp — currently referenced but not included
4. Add a `favicon.ico` to `public/` and link it in `index.html`'s `<head>` — not included yet

### Google Search Console setup
1. Go to **search.google.com/search-console**
2. Add property → enter your domain (e.g. `nexiuse.com`)
3. Verify via **HTML tag** or **DNS TXT record** (either works)
4. Once verified, go to **Sitemaps** in the left menu → submit `https://nexiuse.com/sitemap.xml`
5. Give it a few days — Google will start indexing both `/en` and `/mk`
6. Use **URL Inspection** → paste each language URL → **Request Indexing** to speed this up

### Submitting to Bing too (optional, takes 2 minutes)
Bing Webmaster Tools lets you **import directly from Google Search Console** once the above is done — bing.com/webmasters → Import from GSC. Covers Bing + Yahoo search traffic for free.

---

## ☁️ Cloudflare Setup

Cloudflare sits in front of your domain's DNS and gives you free CDN
caching, DDoS protection, and faster global load times. Two common
setups depending on what you want:

### Option A — Cloudflare as DNS only (recommended with Netlify)
Use this if you're keeping Netlify as your host and just want
Cloudflare's DNS speed + free SSL/security layer in front of it.

1. Sign up at **cloudflare.com** → **Add a site** → enter your domain
2. Choose the **Free plan**
3. Cloudflare scans your existing DNS records — review them
4. Cloudflare gives you 2 nameservers (e.g. `xxx.ns.cloudflare.com`) — go to your domain registrar (Namecheap etc.) and replace the existing nameservers with these
5. Wait for propagation (Cloudflare emails you once active — usually under an hour)
6. Back in Cloudflare → **DNS** tab → add a `CNAME` record:
   - Name: `@` (or your subdomain, e.g. `www`)
   - Target: your Netlify site's `*.netlify.app` URL
   - Proxy status: **Proxied** (orange cloud ON) — this enables Cloudflare's CDN/protection
7. In Netlify → **Domain management** → add the custom domain so Netlify knows to serve it

### Option B — Cloudflare Pages instead of Netlify
If you want to drop Netlify entirely and host directly on Cloudflare:

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Pick your repo, set build command `npm run build`, build output directory `dist`
3. Add environment variable `VITE_CONTACT_INFO` under project settings
4. Deploy

> ⚠️ Note: if you switch to Cloudflare Pages, **Netlify Forms won't work anymore** since that's a Netlify-specific feature. You'd need to switch the contact form back to something host-agnostic like Formspree or Web3Forms. Stick with **Option A** (Cloudflare DNS in front of Netlify) to keep your current form working with zero code changes.

**My recommendation: Option A.** You get Cloudflare's speed/security benefits without losing the Netlify Forms setup you already have working.

---



| What                | Where                              |
|---------------------|-------------------------------------|
| Colors              | `src/styles/global.css` — CSS vars |
| Services list       | `Services.jsx` — `SERVICES` array  |
| Pricing plans       | `Pricing.jsx` — `PLANS` array      |
| Process steps       | `Process.jsx` — `STEPS` array      |
| Contact info        | `.env` — `VITE_CONTACT_INFO`       |
| Agency name / logo  | `Navbar.jsx`, `Footer.jsx`, `index.html` |

---

## 🍪 Cookie Consent

A lightweight cookie consent banner appears on first visit (any
language) and remembers the choice in `localStorage`.

```
src/components/
├── CookieConsent.jsx          ← banner logic
└── CookieConsent.module.css   ← styling

src/PrivacyPage.jsx            ← linked privacy policy page (/en/privacy, /mk/privacy)
src/PrivacyPage.module.css
```

### How it works
- Shows once per browser until the visitor clicks **Accept** or **Decline**
- Choice is saved under the `nexiuse_cookie_consent` key in `localStorage`
- "Learn more" links to a bilingual privacy policy page (`/en/privacy` or `/mk/privacy` depending on current language)

### Google Analytics 4 — now wired in
Analytics is fully connected using **Google Consent Mode v2**:

- `src/analytics.js` — loads `gtag.js`, sets default consent to "denied," and exposes `updateConsent()` / `trackPageview()`
- `src/PageviewTracker.jsx` — rendered inside the router, fires a pageview on every route change (since React Router doesn't trigger real page loads)
- `CookieConsent.jsx` — calls `updateConsent('accepted')` or `updateConsent('declined')` when the visitor responds to the banner, and re-applies their saved choice on every later visit

**To activate it:**
1. Create a GA4 property at analytics.google.com → copy your **Measurement ID** (`G-XXXXXXXXXX`)
2. Add it to `.env`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Also add it under **Netlify → Site configuration → Environment variables** for production
4. Redeploy

**Until you add a Measurement ID, analytics stays fully inactive** — no script loads, no errors, nothing tracked. Safe to leave blank indefinitely.

**Why nothing shows up in GA for a while even after setup:** if a visitor clicks "Decline," GA receives no individual tracking data (by design — this is the correct GDPR behavior). Only "Accept" clicks generate real analytics data. Don't be surprised by low numbers at first; it reflects genuine consent rates, not a bug.

### Editing the privacy policy text
Open `en.json` / `mk.json` → the `privacy` key. Update the placeholder
copy with your actual business details (legal entity name, contact
email, etc.) before going live — what's there now is a reasonable
starting template, not a substitute for reviewing your actual legal
obligations if you plan to run ads or collect more data later. Once
GA is active, also make sure `privacy.section2Body` accurately
describes that you use Google Analytics.

---

## 🚀 Deployment (Netlify)

1. Push to GitHub
2. netlify.com → **Add new site** → **Import from Git** → pick your repo
3. Build command: `npm run build` | Publish directory: `dist`
4. Add `VITE_CONTACT_INFO` under **Site configuration → Environment variables**
5. Deploy
6. Once live, set up form notifications (see above) and add your custom domain under **Domain management**

> If you were previously deploying via GitHub Actions to GitHub Pages,
> you can delete that workflow — Netlify auto-deploys on every push
> to your default branch with zero YAML config needed.

---

## 📦 Dependencies

| Package           | Purpose                          |
|--------------------|-----------------------------------|
| react + react-dom  | UI framework                      |
| react-router-dom   | URL-based routing (/en, /mk)       |
| vite               | Build tool + dev server           |
| i18next            | Translation engine                |
| react-i18next      | React bindings for i18next        |
| react-helmet-async | Dynamic per-route, per-language meta tags |

No form SDK required — contact form uses Netlify Forms natively.
