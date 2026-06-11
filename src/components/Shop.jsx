import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import AgeGate from './AgeGate.jsx'
import Bottle from './Bottle.jsx'
import ShopModal from './ShopModal.jsx'
import { wines } from '../data/wines.js'

const fmt = (n) => `€${Number(n).toFixed(2).replace(/\.00$/, '')}`

export default function Shop() {
  const { t } = useLang()
  const s = t.shop
  const popular = wines.slice(0, 3)
  const [shopOpen, setShopOpen] = useState(false)

  return (
    <section id="shop" className="section section--shop">
      <div className="container">
        <SectionHead tag={s.tag} title={s.title} lead={s.lead} />

        <AgeGate>
          <div className="shop__options">
            <Reveal className="shop-option">
              <span className="shop-option__icon" aria-hidden="true">🏬</span>
              <h3>{s.pickup}</h3>
              <p>{s.pickupD}</p>
            </Reveal>
            <Reveal className="shop-option" delay={100}>
              <span className="shop-option__icon" aria-hidden="true">🚲</span>
              <h3>{s.delivery}</h3>
              <p>{s.deliveryD}</p>
            </Reveal>
          </div>

          <Reveal className="shop__popular">
            <h3 className="shop__popular-title">{s.popular}</h3>
            <ul className="shop-list">
              {popular.map((wine) => (
                <li className="shop-list__item" key={wine.id}>
                  <span className="shop-list__bottle">
                    <Bottle color={wine.color} />
                  </span>
                  <span className="shop-list__info">
                    <span className="shop-list__name">{wine.name}</span>
                    <span className="shop-list__meta">
                      {wine.region} · {wine.grape}
                    </span>
                  </span>
                  <span className="shop-list__price">{fmt(wine.price)}</span>
                  <button className="btn btn--small btn--primary" type="button">
                    {s.add}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="shop__cta">
            <button type="button" className="btn btn--accent" onClick={() => setShopOpen(true)}>
              {s.cta}
            </button>
            <p className="shop__legal">{s.legal}</p>
          </Reveal>
        </AgeGate>
      </div>

      <ShopModal open={shopOpen} onClose={() => setShopOpen(false)} />
    </section>
  )
}
