import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, i18n } = useTranslation()

  const currLang = i18n.language
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        NEXI<span>USE</span>
      </div>
      <span className={styles.copy}>
        {t('footer.copy', { year: new Date().getFullYear() })}
      </span>
      <div className={styles.links}>
        <a href="#services">{t('nav.services')}</a>
        <a href="#pricing">{t('nav.pricing')}</a>
        <a href="#contact">{t('nav.contact')}</a>
        <a href={`/${currLang}/privacy`}>{t('nav.privacy')}</a>
      </div>
    </footer>
  )
}
