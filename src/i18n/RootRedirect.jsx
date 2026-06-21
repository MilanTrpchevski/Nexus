import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { DEFAULT_LANG } from '../i18n'

const STORAGE_KEY = 'nexiuse_lang'
const GEO_TIMEOUT_MS = 2000 // don't make visitors wait long if the API is slow

// Detects whether the visitor is in Macedonia using IP geolocation,
// with browser language as a fallback if the request fails, times
// out, or is blocked (ad blockers, privacy extensions, etc).
async function detectCountryIsMacedonia() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS)

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('Geolocation request failed')

    const data = await res.json()
    // ipapi.co returns ISO 3166-1 alpha-2 country codes — Macedonia is "MK"
    return data.country_code === 'MK'
  } catch (err) {
    clearTimeout(timeout)
    return null // null = "couldn't determine," not "definitely not Macedonia"
  }
}

function detectLanguageFromBrowser() {
  const browserLang = navigator.language?.slice(0, 2)
  return browserLang === 'mk' ? 'mk' : DEFAULT_LANG
}

export default function RootRedirect() {
  const [lang, setLang] = useState(null) // null while still detecting

  useEffect(() => {
    let cancelled = false

    async function resolveLanguage() {
      // 1. Respect an explicit saved preference first — if someone
      //    already chose a language on a previous visit (e.g. via the
      //    navbar toggle), don't override that with geolocation.
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'mk') {
        if (!cancelled) setLang(saved)
        return
      }

      // 2. No saved preference — try geolocation first.
      const isMacedonia = await detectCountryIsMacedonia()
      if (cancelled) return

      if (isMacedonia === true) {
        setLang('mk')
      } else if (isMacedonia === false) {
        setLang('en')
      } else {
        // 3. Geolocation failed/blocked/timed out — fall back to
        //    browser language as a reasonable proxy.
        setLang(detectLanguageFromBrowser())
      }
    }

    resolveLanguage()
    return () => { cancelled = true }
  }, [])

  // Brief blank render while detection resolves (typically well
  // under a second on the happy path, capped at GEO_TIMEOUT_MS).
  if (lang === null) return null

  return <Navigate to={`/${lang}`} replace />
}
