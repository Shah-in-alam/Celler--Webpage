import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="section section--about">
      <div className="container">
        <SectionHead tag={a.tag} title={a.title} />

        <div className="about__grid">
          <Reveal className="about__copy">
            <p className="about__lead">{a.lead}</p>
            <p>{a.body1}</p>
            <p>{a.body2}</p>
          </Reveal>

          <Reveal className="about__media" delay={120}>
            {/* Swap the image at public/images/founder.jpg to change this photo. */}
            <img
              className="about__photo"
              src="/images/founder.jpg"
              alt={a.photoCaption}
              width="1600"
              height="900"
              loading="lazy"
            />
            <p className="about__caption">{a.photoCaption}</p>
          </Reveal>
        </div>

        <Reveal className="about__philosophy">
          <h3 className="about__philosophy-title">{a.philosophyTitle}</h3>
          <div className="values">
            {a.values.map((v, i) => (
              <div className="value-card" key={v.t}>
                <span className="value-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{v.t}</h4>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
