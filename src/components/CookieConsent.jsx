import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { updateConsent } from '../analytics'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'nexiuse_cookie_consent' // 'accepted' | 'declined'

export default function CookieConsent() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setVisible(true)
    } else {
      // Returning visitor — re-apply their previous choice to GA
      // immediately, without waiting for a new click.
      updateConsent(saved)
    }
  }, [])

  const handleChoice = (choice) => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
    updateConsent(choice)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        {t('cookies.text')}{' '}
        <a href={`/${lang}/privacy`} className={styles.link}>{t('cookies.learnMore')}</a>
      </p>
      <div className={styles.actions}>
        <button className={styles.decline} onClick={() => handleChoice('declined')}>
          {t('cookies.decline')}
        </button>
        <button className={styles.accept} onClick={() => handleChoice('accepted')}>
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  )
}
