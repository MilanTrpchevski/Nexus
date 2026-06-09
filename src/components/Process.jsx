import useReveal from '../hooks/useReveal'
import styles from './Process.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Discovery Call',
    text: 'We learn about your business, goals, and target customers. Free consultation — no pressure, no jargon.',
  },
  {
    n: '02',
    title: 'Strategy & Proposal',
    text: 'We send you a clear plan with timeline, deliverables, and pricing. No hidden costs, ever.',
  },
  {
    n: '03',
    title: 'Design & Build',
    text: 'Our team gets to work. You receive regular updates and have input throughout the process.',
  },
  {
    n: '04',
    title: 'Launch & Grow',
    text: 'We go live and monitor performance. Then we help you scale with ongoing marketing support.',
  },
]

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
  return (
    <section id="process" className={styles.section}>
      <div className={styles.left}>
        <div>
          <p className={styles.eyebrow}>How It Works</p>
          <h2 className={styles.title}>
            Our<br /><em>Process</em>
          </h2>
        </div>
        <p className={styles.desc}>
          Simple, transparent, and collaborative. We keep you in the loop at every step.
        </p>
      </div>
      <div className={styles.right}>
        {STEPS.map((s) => (
          <Step key={s.n} {...s} />
        ))}
      </div>
    </section>
  )
}
