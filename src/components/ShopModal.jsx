import { useState, useEffect, useRef, useMemo } from 'react'
import { useLang } from '../i18n.jsx'
import Bottle from './Bottle.jsx'
import { wines } from '../data/wines.js'

const TYPE_ORDER = ['all', 'sparkling', 'orange', 'rose', 'red', 'white']
const fmt = (n) => `€${Number(n).toFixed(2).replace(/\.00$/, '')}`

export default function ShopModal({ open, onClose }) {
  const { t, lang } = useLang()
  const s = t.shop

  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('all')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState({}) // { id: qty }

  const dialogRef = useRef(null)
  const searchRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      document.body.style.overflow = 'hidden'
      const id = setTimeout(() => searchRef.current?.focus(), 0)
      return () => clearTimeout(id)
    }
    document.body.style.overflow = ''
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
      else if (e.key === 'Tab') trapFocus(e)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = wines.filter((w) => {
      const matchesType = activeType === 'all' || w.type === activeType
      const matchesQuery =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.region.toLowerCase().includes(q) ||
        w.grape.toLowerCase().includes(q) ||
        w.style[lang].toLowerCase().includes(q)
      return matchesType && matchesQuery
    })
    if (sort === 'priceUp') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'priceDown') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [query, activeType, sort, lang])

  if (!open) return null

  const handleClose = () => {
    document.body.style.overflow = ''
    onClose()
    if (lastFocused.current?.focus) lastFocused.current.focus()
  }

  const trapFocus = (e) => {
    if (!dialogRef.current) return
    const focusables = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const list = Array.from(focusables).filter((el) => !el.disabled && el.offsetParent !== null)
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const setQty = (id, qty) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })

  const cartEntries = Object.entries(cart)
  const totalCount = cartEntries.reduce((sum, [, q]) => sum + q, 0)
  const totalPrice = cartEntries.reduce((sum, [id, q]) => {
    const wine = wines.find((w) => w.id === id)
    return sum + (wine ? wine.price * q : 0)
  }, 0)

  const orderHref = () => {
    const lines = cartEntries.map(([id, q]) => {
      const wine = wines.find((w) => w.id === id)
      return `${q}× ${wine.name} (${wine.region}) — ${fmt(wine.price)} = ${fmt(wine.price * q)}`
    })
    lines.push('', `${s.total}: ${fmt(totalPrice)}`)
    return `mailto:hello@cellar.wine?subject=${encodeURIComponent('Wine order — Cellar')}&body=${encodeURIComponent(
      lines.join('\n'),
    )}`
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleClose}>
      <div
        className="modal modal--shop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-title"
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="shopx__head">
          <button type="button" className="modal__close" onClick={handleClose} aria-label={s.close}>
            ✕
          </button>
          <h2 id="shop-title" className="modal__title">
            {s.modalTitle}
          </h2>
          <p className="modal__party-tag">{s.modalSubtitle}</p>
        </header>

        <div className="shopx__body">
          <div className="shopx__toolbar">
            <div className="shopx__search">
              <span className="shopx__search-icon" aria-hidden="true">
                🔎
              </span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={s.searchPlaceholder}
                aria-label={s.searchPlaceholder}
              />
            </div>
            <label className="shopx__sort">
              <span className="shopx__sort-label">{s.sortLabel}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">{s.sortFeatured}</option>
                <option value="priceUp">{s.sortPriceUp}</option>
                <option value="priceDown">{s.sortPriceDown}</option>
              </select>
            </label>
          </div>

          <div className="shopx__filters" role="group" aria-label={s.sortLabel}>
            {TYPE_ORDER.map((type) => (
              <button
                key={type}
                type="button"
                className={`chip ${activeType === type ? 'is-on' : ''}`}
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {s.types[type]}
              </button>
            ))}
          </div>

          <p className="shopx__count">
            {filtered.length} {s.results}
          </p>

          {filtered.length === 0 ? (
            <p className="shopx__empty">{s.empty}</p>
          ) : (
            <div className="shopx__grid">
              {filtered.map((wine) => {
                const qty = cart[wine.id] || 0
                return (
                  <article className="shopx-card" key={wine.id}>
                    <div className="shopx-card__bottle">
                      <Bottle color={wine.color} />
                    </div>
                    <div className="shopx-card__body">
                      <div className="shopx-card__head">
                        <h3 className="shopx-card__name">{wine.name}</h3>
                        <span className="shopx-card__style">{wine.style[lang]}</span>
                      </div>
                      <p className="shopx-card__meta">
                        {wine.region} · {wine.grape}
                      </p>
                      <p className="shopx-card__note">{wine.note[lang]}</p>
                      <div className="shopx-card__foot">
                        <span className="shopx-card__price">{fmt(wine.price)}</span>
                        {qty === 0 ? (
                          <button type="button" className="btn btn--small btn--primary" onClick={() => setQty(wine.id, 1)}>
                            {s.add}
                          </button>
                        ) : (
                          <span className="qty" aria-label={wine.name}>
                            <button type="button" className="qty__btn" onClick={() => setQty(wine.id, qty - 1)} aria-label="−">
                              −
                            </button>
                            <span className="qty__num">{qty}</span>
                            <button type="button" className="qty__btn" onClick={() => setQty(wine.id, qty + 1)} aria-label="+">
                              +
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>

        {totalCount > 0 && (
          <footer className="shopx__cart">
            <div className="shopx__cart-info">
              <span className="shopx__cart-count">
                🧺 {s.basketTitle} · {totalCount}
              </span>
              <span className="shopx__cart-total">
                {s.total} {fmt(totalPrice)}
              </span>
            </div>
            <a className="btn btn--accent" href={orderHref()}>
              {s.order}
            </a>
          </footer>
        )}
      </div>
    </div>
  )
}
