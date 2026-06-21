import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'mk' : 'en'
    // Preserve any in-page anchor (e.g. #contact) when switching language
    navigate(`/${next}${window.location.hash}`)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href={`/${lang}`} className={styles.logo}>
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
        <a href="#pricing" className={styles.cta}>{t('nav.cta')}</a>
      </div>
    </nav>
  )
}
