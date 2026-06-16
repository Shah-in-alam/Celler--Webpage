import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const MAP_SRC =
  'https://www.google.com/maps?q=Volkstraat%2045,%202000%20Antwerpen,%20Belgium&output=embed'

export default function Visit() {
  const { t } = useLang()
  const v = t.visit

  return (
    <section id="visit" className="section section--visit">
      <div className="container">
        <SectionHead tag={v.tag} title={v.title} />

        <div className="visit__grid">
          <Reveal className="visit__info">
            <div className="visit__block">
              <h3>{v.addressTitle}</h3>
              <address>
                {v.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="visit__block">
              <h3>{v.hoursTitle}</h3>
              <dl className="hours">
                {v.hours.map((row) => (
                  <div className="hours__row" key={row.d}>
                    <dt>{row.d}</dt>
                    <dd>{row.h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="visit__block">
              <h3>{v.contactTitle}</h3>
              <ul className="contact">
                <li>
                  <span className="contact__label">{v.phoneLabel}</span>
                  <a href="tel:+3230000000">+32 3 000 00 00</a>
                </li>
                <li>
                  <span className="contact__label">{v.emailLabel}</span>
                  <a href="mailto:hello@cellar.wine">hello@cellar.wine</a>
                </li>
                <li>
                  <span className="contact__label">{v.instaLabel}</span>
                  <a href="https://instagram.com/cellar_antwerp" target="_blank" rel="noreferrer noopener">
                    @cellar_antwerp
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="visit__map" delay={120}>
            <iframe
              title={v.mapTitle}
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
