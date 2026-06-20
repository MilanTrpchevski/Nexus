import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../i18n'

const STORAGE_KEY = 'nexiuse_lang'

/**
 * Reads the :lang segment from the URL (e.g. /mk, /en).
 * - If it's a supported language, syncs i18next to it and remembers
 *   the choice in localStorage for next time the user lands on "/".
 * - If it's missing or invalid, redirects to a valid language path.
 */
export default function LanguageLayout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  const isValid = SUPPORTED_LANGS.includes(lang)

  useEffect(() => {
    if (isValid) {
      i18n.changeLanguage(lang)
      window.localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    }
  }, [lang, isValid, i18n])

  if (!isValid) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />
  }

  return <Outlet />
}
