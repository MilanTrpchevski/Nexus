import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        NEX<span>US</span>
      </div>
      <span className={styles.copy}>
        © {new Date().getFullYear()} Nexus Digital. All rights reserved.
      </span>
      <div className={styles.links}>
        <a href="#services">Services</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  )
}
