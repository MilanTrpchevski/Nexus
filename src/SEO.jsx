import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const DOMAIN = 'https://nexiuse.com'

/**
 * Renders language-aware <title>, <meta description>, <meta keywords>,
 * Open Graph, Twitter card, canonical, and hreflang tags for the
 * current route. Pulls copy from the active locale file's "seo" key
 * so Macedonian visitors get real Macedonian meta tags, not a
 * translated-in-name-only English fallback.
 */
export default function SEO({ path = '', titleKey = 'seo.title', descriptionKey = 'seo.description' }) {
  const { t, i18n } = useTranslation()
  const { lang } = useParams()

  const currentLang = lang || i18n.language
  const otherLang = currentLang === 'mk' ? 'en' : 'mk'
  const url = `${DOMAIN}/${currentLang}${path}`

  const title = t(titleKey)
  const description = t(descriptionKey)
  const keywords = t('seo.keywords')

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={`${DOMAIN}/en${path}`} />
      <link rel="alternate" hrefLang="mk" href={`${DOMAIN}/mk${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${DOMAIN}/en${path}`} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${DOMAIN}/og-image.jpg`} />
      <meta property="og:locale" content={currentLang === 'mk' ? 'mk_MK' : 'en_US'} />
      <meta property="og:locale:alternate" content={otherLang === 'mk' ? 'mk_MK' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${DOMAIN}/og-image.jpg`} />
    </Helmet>
  )
}
