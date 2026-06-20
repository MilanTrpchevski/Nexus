import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import styles from './Services.module.css'

const ICONS = ['◻', '◎', '△', '◈']

function ServiceCard({ num, icon, name, desc }) {
  const ref = useReveal()
  return (
    <div className={`${styles.card} reveal`} ref={ref}>
      <div className={styles.num}>{num}</div>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.name}>{name}</div>
      <p className={styles.desc}>{desc}</p>
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <section id="services" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <p className={styles.eyebrow}>{t('services.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('services.titleLine1')}<br /><em>{t('services.titleEm')}</em>
          </h2>
        </div>
        <div className={styles.headerDesc}>
          <p>{t('services.desc')}</p>
        </div>
      </div>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.name}
            num={String(i + 1).padStart(2, '0')}
            icon={ICONS[i]}
            name={item.name}
            desc={item.desc}
          />
        ))}
      </div>
    </section>
  )
}
