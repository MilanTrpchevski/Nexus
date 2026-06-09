import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>Digital Agency — Skopje, MK</p>
        <h1 className={styles.heading}>
          We Build
          <em>Brands</em>
          Online.
        </h1>
        <p className={styles.sub}>
          From websites that convert to campaigns that scale — we help Macedonian
          businesses claim their space on the internet.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>Get a Free Quote</a>
          <a href="#services" className={styles.btnGhost}>
            Our Services <span>↓</span>
          </a>
        </div>
        <div className={styles.scrollIndicator}>Scroll</div>
      </div>

      <div className={styles.right}>
        <div className={styles.visual} />
        <div className={styles.statGrid}>
          {[
            { num: '48h',  label: 'Avg. Response Time' },
            { num: '100%', label: 'Local Expertise' },
            { num: '3×',   label: 'More Leads via Web' },
            { num: 'MK',   label: 'Based in Macedonia' },
          ].map((s, i) => (
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
