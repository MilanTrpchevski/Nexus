import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SEO from './SEO'
import styles from './PrivacyPage.module.css'

export default function PrivacyPage() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <>
      <SEO
        path="/privacy"
        titleKey="privacy.seoTitle"
        descriptionKey="privacy.seoDescription"
      />
      <Navbar />
      <main className={styles.wrap}>
        <h1 className={styles.title}>{t('privacy.title')}</h1>
        <p className={styles.updated}>{t('privacy.lastUpdated')}</p>

        <section className={styles.section}>
          <h2>{t('privacy.section1Title')}</h2>
          <p>{t('privacy.section1Body')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.section2Title')}</h2>
          <p>{t('privacy.section2Body')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.section3Title')}</h2>
          <p>{t('privacy.section3Body')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.section4Title')}</h2>
          <p>{t('privacy.section4Body')}</p>
        </section>

        <a href={`/${lang}`} className={styles.back}>
          {t('privacy.backHome')}
        </a>
      </main>
      <Footer />
    </>
  )
}
