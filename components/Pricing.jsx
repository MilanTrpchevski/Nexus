import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import styles from './Pricing.module.css'

function PricingCard({ tier, price, cycle, featured, features, badge, cta }) {
  const ref = useReveal()
  return (
    <div
      className={`${styles.card} ${featured ? styles.featured : ''} reveal`}
      ref={ref}
    >
      {featured && <div className={styles.badge}>{badge}</div>}
      <div className={styles.tierLabel}>{tier}</div>
      <div className={styles.price}>
        <sup>€</sup>{price}
      </div>
      <div className={styles.cycle}>{cycle}</div>
      <ul className={styles.features}>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <a href="#contact" className={styles.btn}>{cta}</a>
    </div>
  )
}

export default function Pricing() {
  const { t } = useTranslation()
  const plans = t('pricing.plans', { returnObjects: true })

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <p className={styles.eyebrow}>{t('pricing.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('pricing.titleLine1')}<br /><em>{t('pricing.titleEm')}</em>
          </h2>
        </div>
        <div className={styles.headerDesc}>
          <p>{t('pricing.desc')}</p>
        </div>
      </div>
      <div className={styles.grid}>
        {plans.map((p, i) => (
          <PricingCard
            key={p.tier}
            {...p}
            featured={i === 1}
            badge={t('pricing.badge')}
            cta={t('pricing.cta')}
          />
        ))}
      </div>
    </section>
  )
}
