import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'mk' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>
        NEXI<span>USE</span>
      </a>
      <ul className={styles.links}>
        <li><a href="#services">{t('nav.services')}</a></li>
        <li><a href="#process">{t('nav.process')}</a></li>
        <li><a href="#pricing">{t('nav.pricing')}</a></li>
        <li><a href="#contact">{t('nav.contact')}</a></li>
      </ul>
      <div className={styles.navRight}>
        <button
          className={styles.langSwitch}
          onClick={toggleLanguage}
          aria-label="Switch language"
        >
          <span className={i18n.language === 'en' ? styles.langActive : ''}>EN</span>
          <span className={styles.langDivider}>/</span>
          <span className={i18n.language === 'mk' ? styles.langActive : ''}>МК</span>
        </button>
        <a href="#contact" className={styles.cta}>{t('nav.cta')}</a>
      </div>
    </nav>
  )
}
