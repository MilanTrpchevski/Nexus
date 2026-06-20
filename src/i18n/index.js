import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import mk from './locales/mk.json'

const STORAGE_KEY = 'nexiuse_lang'

// Determine initial language: saved preference > browser language > English
function getInitialLanguage() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'mk') return saved

  const browserLang = navigator.language?.slice(0, 2)
  if (browserLang === 'mk') return 'mk'

  return 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mk: { translation: mk },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes output
  },
})

// Persist language choice whenever it changes
i18n.on('languageChanged', (lng) => {
  window.localStorage.setItem(STORAGE_KEY, lng)
  document.documentElement.lang = lng
})

// Set initial <html lang="..."> attribute
document.documentElement.lang = i18n.language

export default i18n
