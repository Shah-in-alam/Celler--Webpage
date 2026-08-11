import { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'

const LINKS = ['about', 'wine', 'shop', 'events', 'gallery', 'reviews', 'visit']

export default function Nav() {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" onClick={close}>
          Cellar
        </a>

        <button
          className="nav__burger"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="nav-menu" className={`nav__menu ${open ? 'nav__menu--open' : ''}`}>
          {LINKS.map((key) => (
            <a key={key} href={`#${key}`} className="nav__link" onClick={close}>
              {t.nav[key]}
            </a>
          ))}
          <a href="#shop" className="nav__shopcta" onClick={close}>
            {t.nav.shopCta}
          </a>
          <button
            className="nav__lang"
            onClick={toggle}
            aria-label={lang === 'en' ? 'Schakel naar Nederlands' : 'Switch to English'}
          >
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span className={lang === 'nl' ? 'on' : ''}>NL</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
