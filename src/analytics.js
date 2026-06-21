// Google Analytics 4 (GA4) integration using Consent Mode v2.
//
// How this works:
// 1. gtag.js loads on every page visit (required for Consent Mode itself
//    to function) but starts in a "denied" state — no cookies are set,
//    no individual tracking happens yet.
// 2. Once the visitor clicks "Accept" on the cookie banner, we update
//    consent to "granted" and GA starts actually tracking that session.
// 3. If they click "Decline", consent stays "denied" permanently for
//    that browser — GA receives only anonymous, cookie-less ping data
//    (no personal tracking), which is the GDPR-compliant default.
//
// Docs: https://developers.google.com/tag-platform/security/guides/consent

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || initialized) return
  initialized = true

  // Standard gtag.js bootstrap
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  // Set default consent state to "denied" BEFORE loading the script.
  // This must happen first so GA respects it from the very first call.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  })

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  })

  // Inject the actual gtag.js script tag
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function updateConsent(choice) {
  if (!window.gtag) return

  window.gtag('consent', 'update', {
    analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
    ad_storage: 'denied', // we're not using ads tracking — keep this denied always
  })
}

// Call this whenever the route changes (React Router doesn't trigger
// full page loads, so GA won't see new pageviews automatically).
export function trackPageview(path) {
  if (!window.gtag || !GA_MEASUREMENT_ID) return
  window.gtag('event', 'page_view', {
    page_path: path,
  })
}
