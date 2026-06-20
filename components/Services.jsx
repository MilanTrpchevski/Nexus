import useReveal from '../hooks/useReveal'
import styles from './Services.module.css'

const SERVICES = [
  {
    num: '01',
    icon: '◻',
    name: 'Web Design & Dev',
    desc: 'Fast, mobile-first websites that look great and convert visitors into customers. We build on modern stacks with SEO baked in.',
  },
  {
    num: '02',
    icon: '◎',
    name: 'SEO & Content',
    desc: 'Rank higher on Google for searches your customers are making. Local SEO strategies tailored for the Macedonian market.',
  },
  {
    num: '03',
    icon: '△',
    name: 'Social Media',
    desc: 'Strategic content and management for Instagram, Facebook, and TikTok. We build audiences that become loyal customers.',
  },
  {
    num: '04',
    icon: '◈',
    name: 'Paid Advertising',
    desc: 'Google Ads and Meta Ads campaigns that deliver measurable ROI. We manage budget, targeting, and creative — you get results.',
  },
]

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
  return (
    <section id="services" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.title}>
            Our<br /><em>Services</em>
          </h2>
        </div>
        <div className={styles.headerDesc}>
          <p>
            Every business deserves a strong digital presence. We deliver
            end-to-end solutions — from your first website to full-scale
            digital marketing campaigns.
          </p>
        </div>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.num} {...s} />
        ))}
      </div>
    </section>
  )
}
