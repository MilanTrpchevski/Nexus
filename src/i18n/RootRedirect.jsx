import { Navigate } from 'react-router-dom'
import { DEFAULT_LANG } from '../i18n'

const STORAGE_KEY = 'nexiuse_lang'

function detectLanguage() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'mk') return saved

  const browserLang = navigator.language?.slice(0, 2)
  if (browserLang === 'mk') return 'mk'

  return DEFAULT_LANG
}

export default function RootRedirect() {
  const lang = detectLanguage()
  return <Navigate to={`/${lang}`} replace />
}
