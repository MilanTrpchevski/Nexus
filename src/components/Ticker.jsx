import { useTranslation } from 'react-i18next'

export default function Ticker() {
  const { t } = useTranslation()
  const items = t('ticker.items', { returnObjects: true })
  const doubled = [...items, ...items]

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
