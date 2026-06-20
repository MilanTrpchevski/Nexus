import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'
import styles from './Process.module.css'

function Step({ n, title, text }) {
  const ref = useReveal()
  return (
    <div className={`${styles.step} reveal`} ref={ref}>
      <div className={styles.stepN}>{n}</div>
      <div>
        <div className={styles.stepTitle}>{title}</div>
        <p className={styles.stepText}>{text}</p>
      </div>
    </div>
  )
}

export default function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true })

  return (
    <section id="process" className={styles.section}>
      <div className={styles.left}>
        <div>
          <p className={styles.eyebrow}>{t('process.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('process.titleLine1')}<br /><em>{t('process.titleEm')}</em>
          </h2>
        </div>
        <p className={styles.desc}>{t('process.desc')}</p>
      </div>
      <div className={styles.right}>
        {steps.map((s, i) => (
          <Step key={s.title} n={String(i + 1).padStart(2, '0')} title={s.title} text={s.text} />
        ))}
      </div>
    </section>
  )
}
