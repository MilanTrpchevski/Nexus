// src/components/Contact.jsx (modified)
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INFO = (() => {
  const raw = import.meta.env.VITE_CONTACT_INFO || '[]'
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.warn('Invalid VITE_CONTACT_INFO JSON:', err)
    return []
  }
})()


const INITIAL = {
  user_name:    '',
  user_email:   '',
  company:      '',
  service:      '',
  message:      '',
}

function validate(fields) {
  const errors = {}
  if (!fields.user_name.trim())  errors.user_name  = 'Name is required'
  if (!fields.user_email.trim()) errors.user_email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.user_email))
    errors.user_email = 'Enter a valid email'
  if (!fields.message.trim())    errors.message    = 'Message is required'
  return errors
}

export default function Contact() {
  const formRef              = useRef(null)
  const [fields, setFields]  = useState(INITIAL)
  const [errors, setErrors]  = useState({})
  const [status, setStatus]  = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    console.log("test", fields)
    console.log("public Key", PUBLIC_KEY)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('sending')

    try {

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('success')
      setFields(INITIAL)
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const resetStatus = () => setStatus('idle')

  return (
    <section id="contact" className={styles.section}>
      {/* ── LEFT PANEL ── */}
      <div className={styles.left}>
        <p className={styles.eyebrow}>Get in Touch</p>
        <h2 className={styles.title}>
          Let's<br /><em>Talk.</em>
        </h2>
        <div className={styles.info}>
          {INFO.map((row) => (
            <div key={row.label} className={styles.row}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowVal}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.right}>
        <p className={styles.formEyebrow}>Free Consultation</p>
        <h3 className={styles.formTitle}>Start Your Project</h3>

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className={styles.successBox}>
            <span className={styles.successIcon}>✓</span>
            <div>
              <strong>Message sent!</strong>
              <p>We'll get back to you within 24 hours.</p>
            </div>
            <button className={styles.resetBtn} onClick={resetStatus}>
              Send another
            </button>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className={styles.errorBox}>
            <span>⚠</span>
            <div>
              <strong>Something went wrong.</strong>
              <p>Please try again or email us directly at hello@nexus.mk</p>
            </div>
            <button className={styles.resetBtn} onClick={resetStatus}>
              Try again
            </button>
          </div>
        )}

        {/* FORM — hidden on success */}
        {status !== 'success' && (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="user_name">Your Name *</label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Aleksandar Petrovski"
                  value={fields.user_name}
                  onChange={handleChange}
                  className={errors.user_name ? styles.inputError : ''}
                />
                {errors.user_name && <span className={styles.fieldError}>{errors.user_name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="user_email">Email Address *</label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  placeholder="alex@business.mk"
                  value={fields.user_email}
                  onChange={handleChange}
                  className={errors.user_email ? styles.inputError : ''}
                />
                {errors.user_email && <span className={styles.fieldError}>{errors.user_email}</span>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="company">Business Name</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company"
                  value={fields.company}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="service">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={fields.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="Website Design">Website Design</option>
                  <option value="SEO & Content">SEO &amp; Content</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Paid Advertising">Paid Advertising</option>
                  <option value="Full Package">Full Package</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Tell Us About Your Business *</label>
              <textarea
                id="message"
                name="message"
                placeholder="What do you sell, who are your customers, what's your goal..."
                value={fields.message}
                onChange={handleChange}
                className={errors.message ? styles.inputError : ''}
              />
              {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              className={`${styles.submit} ${status === 'sending' ? styles.sending : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
