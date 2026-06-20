import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { num: '48h',  label: t('hero.stats.response') },
    { num: '100%', label: t('hero.stats.expertise') },
    { num: '3×',   label: t('hero.stats.leads') },
    { num: 'MK',   label: t('hero.stats.based') },
  ]

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>{t('hero.eyebrow')}</p>
        <h1 className={styles.heading}>
          {t('hero.headingLine1')}
          <em>{t('hero.headingEm')}</em>
          {t('hero.headingLine3')}
        </h1>
        <p className={styles.sub}>{t('hero.sub')}</p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>{t('hero.ctaPrimary')}</a>
          <a href="#services" className={styles.btnGhost}>
            {t('hero.ctaGhost')} <span>↓</span>
          </a>
        </div>
        <div className={styles.scrollIndicator}>{t('hero.scroll')}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.visual} />
        <div className={styles.statGrid}>
          {stats.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${i === 0 ? styles.statAccent : ''}`}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
