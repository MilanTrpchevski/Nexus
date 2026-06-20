import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import mk from './locales/mk.json'

export const SUPPORTED_LANGS = ['en', 'mk']
export const DEFAULT_LANG = 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mk: { translation: mk },
  },
  lng: DEFAULT_LANG, // actual language is driven by the URL — see LanguageLayout
  fallbackLng: DEFAULT_LANG,
  interpolation: {
    escapeValue: false, // React already escapes output
  },
})

export default i18n
