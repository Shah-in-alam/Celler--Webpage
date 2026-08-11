import { useLang } from '../i18n.jsx'
import Photo from './Photo.jsx'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="top" className="hero">
      {/* Decorative: the headline carries the meaning, so the photo has an empty alt. */}
      <div className="hero__bg" aria-hidden="true">
        <Photo
          name="hero-storefront"
          alt=""
          width={2000}
          height={1333}
          className="hero__bg-img"
          loading="eager"
          priority
        />
      </div>

      <span className="hero__blob hero__blob--1" aria-hidden="true" />
      <span className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="hero__inner container">
        <p className="hero__kicker">
          {t.hero.kicker}
          <span className="hero__sister"> · {t.hero.sister}</span>
        </p>
        <h1 className="hero__title">Cellar</h1>
        <p className="hero__promise">{t.hero.promise}</p>

        <div className="hero__cta">
          <a href="#shop" className="btn btn--primary">
            {t.hero.ctaShop}
          </a>
          <a href="#visit" className="btn btn--ghost">
            {t.hero.ctaVisit}
          </a>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label={t.hero.scroll}>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
