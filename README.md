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

## 🌍 Language Switching (English / Macedonian)

The site uses **react-i18next**. All copy lives in two JSON files:

```
src/i18n/
├── index.js              ← i18next config (auto-detects browser language, persists choice)
└── locales/
    ├── en.json            ← English translations
    └── mk.json            ← Macedonian translations
```

### How it works
- A language toggle button (**EN / МК**) sits in the navbar
- First visit: detects the browser's language — Macedonian browsers get `mk`, everyone else gets `en`
- After that, the choice is saved in `localStorage` so it persists across visits
- Switching language re-renders instantly — no page reload, no extra network request

### Editing translations
Just open `en.json` or `mk.json` and edit the text. The JSON structure mirrors
the page sections (`hero`, `services`, `pricing`, `contact`, etc.) so finding
the right string is straightforward. Both files must keep the **same keys** —
only the values should differ between languages.

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
1. Create `src/i18n/locales/de.json` (or whichever language), copying `en.json`'s structure
2. Import it in `src/i18n/index.js` and add it to the `resources` object
3. Add a button/option in `Navbar.jsx`'s language switcher

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
│   ├── Contact.jsx + Contact.module.css   ← Netlify Forms lives here
│   └── Footer.jsx + Footer.module.css
├── hooks/
│   └── useReveal.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
index.html                                  ← hidden static form for Netlify
netlify.toml                                 ← build + redirect config
```

---

## 🎨 Customization

| What                | Where                              |
|---------------------|-------------------------------------|
| Colors              | `src/styles/global.css` — CSS vars |
| Services list       | `Services.jsx` — `SERVICES` array  |
| Pricing plans       | `Pricing.jsx` — `PLANS` array      |
| Process steps       | `Process.jsx` — `STEPS` array      |
| Contact info        | `.env` — `VITE_CONTACT_INFO`       |
| Agency name / logo  | `Navbar.jsx`, `Footer.jsx`, `index.html` |

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
| vite               | Build tool + dev server           |
| i18next            | Translation engine                |
| react-i18next      | React bindings for i18next        |

No form SDK required — contact form uses Netlify Forms natively.
