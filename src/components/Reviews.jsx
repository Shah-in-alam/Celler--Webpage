import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

function Stars({ n }) {
  return (
    <span className="stars" aria-label={`${n} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true" className={i < n ? 'on' : ''}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function Reviews() {
  const { t } = useLang()
  const r = t.reviews

  return (
    <section id="reviews" className="section section--reviews">
      <div className="container">
        <SectionHead tag={r.tag} title={r.title} lead={r.lead} />

        <div className="reviews-grid">
          {r.items.map((item, i) => (
            <Reveal className="review-card" key={item.name} delay={(i % 3) * 80}>
              <Stars n={item.rating} />
              <blockquote className="review-card__text">“{item.text}”</blockquote>
              <p className="review-card__name">{item.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
