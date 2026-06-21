import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Contact.module.css'

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
  user_name:  '',
  user_email: '',
  user_phone: '',
  company:    '',
  service:    '',
  message:    '',
}

function encodeForm(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const { t } = useTranslation()
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const validate = (f) => {
    const errs = {}
    if (!f.user_name.trim())  errs.user_name  = 'required'
    if (!f.user_email.trim()) errs.user_email = 'required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.user_email)) errs.user_email = 'invalid'
    if (!f.message.trim())    errs.message    = 'required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'contact', ...fields }),
      })

      if (!response.ok) throw new Error(`Netlify form submit failed: ${response.status}`)

      setStatus('success')
      setFields(INITIAL)
      setErrors({})
    } catch (err) {
      console.error('Netlify form error:', err)
      setStatus('error')
    }
  }

  const resetStatus = () => setStatus('idle')

  return (
    <section id="contact" className={styles.section}>
      {/* ── LEFT PANEL ── */}
      <div className={styles.left}>
        <p className={styles.eyebrow}>{t('contact.eyebrow')}</p>
        <h2 className={styles.title}>
          {t('contact.titleLine1')}<br /><em>{t('contact.titleEm')}</em>
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
        <p className={styles.formEyebrow}>{t('contact.formEyebrow')}</p>
        <h3 className={styles.formTitle}>{t('contact.formTitle')}</h3>

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className={styles.successBox}>
            <span className={styles.successIcon}>✓</span>
            <div>
              <strong>{t('contact.successTitle')}</strong>
              <p>{t('contact.successText')}</p>
            </div>
            <button className={styles.resetBtn} onClick={resetStatus}>
              {t('contact.resetBtn')}
            </button>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className={styles.errorBox}>
            <span>⚠</span>
            <div>
              <strong>{t('contact.errorTitle')}</strong>
              <p>{t('contact.errorText')}</p>
            </div>
            <button className={styles.resetBtn} onClick={resetStatus}>
              {t('contact.tryAgainBtn')}
            </button>
          </div>
        )}

        {/* FORM — hidden on success */}
        {status !== 'success' && (
          <form name="contact" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="user_name">{t('contact.labels.name')}</label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder={t('contact.placeholders.name')}
                  value={fields.user_name}
                  onChange={handleChange}
                  className={errors.user_name ? styles.inputError : ''}
                />
                {errors.user_name && (
                  <span className={styles.fieldError}>{t('formErrors.required')}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="user_email">{t('contact.labels.email')}</label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  placeholder={t('contact.placeholders.email')}
                  value={fields.user_email}
                  onChange={handleChange}
                  className={errors.user_email ? styles.inputError : ''}
                />
                {errors.user_email && (
                  <span className={styles.fieldError}>
                    {errors.user_email === 'invalid'
                      ? t('formErrors.invalidEmail')
                      : t('formErrors.required')}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="company">{t('contact.labels.company')}</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder={t('contact.placeholders.company')}
                  value={fields.company}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="user_phone">{t('contact.labels.phone')}</label>
                <input
                  id="user_phone"
                  name="user_phone"
                  type="tel"
                  placeholder={t('contact.placeholders.phone')}
                  value={fields.user_phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="service">{t('contact.labels.service')}</label>
              <select
                id="service"
                name="service"
                value={fields.service}
                onChange={handleChange}
              >
                <option value="">{t('contact.serviceOptions.select')}</option>
                <option value="Website Design">{t('contact.serviceOptions.web')}</option>
                <option value="SEO & Content">{t('contact.serviceOptions.seo')}</option>
                <option value="Social Media">{t('contact.serviceOptions.social')}</option>
                <option value="Paid Advertising">{t('contact.serviceOptions.ads')}</option>
                <option value="Full Package">{t('contact.serviceOptions.full')}</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">{t('contact.labels.message')}</label>
              <textarea
                id="message"
                name="message"
                placeholder={t('contact.placeholders.message')}
                value={fields.message}
                onChange={handleChange}
                className={errors.message ? styles.inputError : ''}
              />
              {errors.message && (
                <span className={styles.fieldError}>{t('formErrors.required')}</span>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.submit} ${status === 'sending' ? styles.sending : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('contact.sending') : t('contact.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
