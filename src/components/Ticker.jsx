const ITEMS = [
  'Web Design', 'SEO Optimization', 'Social Media Marketing',
  'Google Ads', 'Brand Identity', 'E-Commerce', 'Content Strategy',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
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
