import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import Bottle from './Bottle.jsx'
import { wines } from '../data/wines.js'

const fmt = (n) => `€${Number(n).toFixed(2).replace(/\.00$/, '')}`

export default function WineSelection() {
  const { t, lang } = useLang()
  const w = t.wine

  return (
    <section id="wine" className="section section--wine">
      <div className="container">
        <SectionHead tag={w.tag} title={w.title} lead={w.lead} />

        <div className="wine-grid">
          {wines.map((wine, i) => (
            <Reveal className="wine-card" key={wine.id} delay={(i % 3) * 80}>
              <div className="wine-card__bottle">
                <Bottle color={wine.color} />
              </div>
              <div className="wine-card__body">
                <div className="wine-card__head">
                  <h3 className="wine-card__name">{wine.name}</h3>
                  <span className="wine-card__style">{wine.style[lang]}</span>
                </div>
                <p className="wine-card__meta">
                  {wine.region} · {wine.grape}
                </p>
                <p className="wine-card__note">{wine.note[lang]}</p>
                <p className="wine-card__price">
                  <em>{w.priceLabel}</em> {fmt(wine.price)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="wine-note">
          {w.note}
        </Reveal>
      </div>
    </section>
  )
}
