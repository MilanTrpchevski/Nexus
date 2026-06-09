# NEXUS — Digital Agency Website

React + Vite marketing agency site with a fully working EmailJS contact form.

---

## ⚡ Quick Start

```bash
npm install
cp .env.example .env        # then fill in your EmailJS keys (see below)
npm run dev                  # → http://localhost:5173
```

---

## 📧 EmailJS Setup (takes ~5 minutes)

### Step 1 — Create a free account
Go to **https://www.emailjs.com** and sign up.  
Free tier = 200 emails/month, no credit card needed.

### Step 2 — Add an Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** (or Outlook, etc.)
3. Click **Connect Account** and log in with the Gmail you want to receive messages on
4. Hit **Create Service**
5. Copy the **Service ID** (looks like `service_xxxxxxx`)

### Step 3 — Create an Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Paste this as the template body:

```
New enquiry from {{user_name}}

From:    {{user_name}}
Email:   {{user_email}}
Company: {{company}}
Service: {{service}}

Message:
{{message}}
```

3. Set **To Email** to your inbox address
4. Set **Subject** to: `New enquiry from {{user_name}} — NEXUS`
5. Hit **Save**
6. Copy the **Template ID** (looks like `template_xxxxxxx`)

### Step 4 — Get your Public Key
Dashboard → **Account** → **API Keys** → copy **Public Key**

### Step 5 — Fill in your .env file

```bash
# .env  (in the project root — never commit this file)
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

Restart the dev server after saving `.env` and the form is live. ✅

---

## 🗂 Project Structure

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
│   ├── Contact.jsx + Contact.module.css   ← EmailJS form lives here
│   └── Footer.jsx + Footer.module.css
├── hooks/
│   └── useReveal.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

---

## 🎨 Customization

| What                | Where                              |
|---------------------|------------------------------------|
| Colors              | `src/styles/global.css` — CSS vars |
| Services list       | `Services.jsx` — `SERVICES` array  |
| Pricing plans       | `Pricing.jsx` — `PLANS` array      |
| Process steps       | `Process.jsx` — `STEPS` array      |
| Contact info        | `Contact.jsx` — `INFO` array       |
| Agency name / logo  | `Navbar.jsx`, `Footer.jsx`, `index.html` |

---

## 🚀 Deployment

### Netlify (recommended — free)
1. Push to GitHub
2. Go to netlify.com → **Add new site** → **Import from Git**
3. Build command: `npm run build` | Publish directory: `dist`
4. Add your `.env` keys under **Site Settings → Environment Variables**

### Vercel
```bash
npm i -g vercel && vercel
# Add env vars in the Vercel dashboard under Settings → Environment Variables
```

> ⚠️ Never commit your `.env` file — it's already in `.gitignore`.

---

## 📦 Dependencies

| Package              | Purpose                     |
|----------------------|-----------------------------|
| react + react-dom    | UI framework                |
| @emailjs/browser     | Send emails from the frontend |
| vite                 | Build tool + dev server     |
