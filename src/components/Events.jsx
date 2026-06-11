import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import BookingModal from './BookingModal.jsx'

export default function Events() {
  const { t } = useLang()
  const e = t.events
  const [open, setOpen] = useState(false)

  return (
    <section id="events" className="section section--events">
      <div className="container">
        <SectionHead tag={e.tag} title={e.title} lead={e.lead} />

        <div className="events-grid">
          {e.items.map((item, i) => (
            <Reveal className="event-card" key={item.t} delay={i * 90}>
              <span className="event-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="events-cta">
          <button type="button" className="btn btn--accent" onClick={() => setOpen(true)}>
            {e.cta}
          </button>
        </Reveal>
      </div>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
