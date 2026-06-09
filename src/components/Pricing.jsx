import useReveal from '../hooks/useReveal'
import styles from './Pricing.module.css'

const PLANS = [
  {
    tier: 'Starter',
    price: '299',
    cycle: 'one-time payment',
    featured: false,
    features: [
      '5-page website',
      'Mobile responsive design',
      'Contact form integration',
      'Basic on-page SEO',
      '30 days support',
    ],
  },
  {
    tier: 'Growth',
    price: '699',
    cycle: 'one-time + €99/mo',
    featured: true,
    features: [
      '10-page website',
      'Custom design + branding',
      'Full SEO setup',
      'Social media setup',
      'Google Business setup',
      'Monthly reporting',
    ],
  },
  {
    tier: 'Scale',
    price: '1499',
    cycle: 'one-time + €199/mo',
    featured: false,
    features: [
      'Full custom website / e-shop',
      'Brand identity package',
      'Google + Meta Ads management',
      'Monthly content creation',
      'Weekly reports + strategy calls',
      'Priority support',
    ],
  },
]

function PricingCard({ tier, price, cycle, featured, features }) {
  const ref = useReveal()
  return (
    <div
      className={`${styles.card} ${featured ? styles.featured : ''} reveal`}
      ref={ref}
    >
      {featured && <div className={styles.badge}>Popular</div>}
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
      <a href="#contact" className={styles.btn}>Get Started</a>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <p className={styles.eyebrow}>Transparent Costs</p>
          <h2 className={styles.title}>
            Our<br /><em>Pricing</em>
          </h2>
        </div>
        <div className={styles.headerDesc}>
          <p>
            Straightforward packages designed for Macedonian businesses at every
            stage. All prices in EUR. Custom quotes available for larger projects.
          </p>
        </div>
      </div>
      <div className={styles.grid}>
        {PLANS.map((p) => (
          <PricingCard key={p.tier} {...p} />
        ))}
      </div>
    </section>
  )
}
