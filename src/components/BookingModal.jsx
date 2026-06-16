import { useState, useEffect, useRef } from 'react'
import { useLang } from '../i18n.jsx'
import Calendar from './Calendar.jsx'
import Confetti from './Confetti.jsx'

const TIME_SLOTS = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const TYPE_EMOJI = ['🎂', '🥳', '🍷', '🤝', '✨']
const MIN_PEOPLE = 2
const MAX_PEOPLE = 40

// Decorative confetti dots scattered across the party header.
const DOTS = [
  { l: '5%', t: '28%', c: '#e3a44d' },
  { l: '15%', t: '66%', c: '#fffaf2' },
  { l: '27%', t: '20%', c: '#f1e8d9' },
  { l: '39%', t: '70%', c: '#e3a44d' },
  { l: '52%', t: '30%', c: '#fffaf2' },
  { l: '64%', t: '62%', c: '#c98429' },
  { l: '76%', t: '24%', c: '#fffaf2' },
  { l: '86%', t: '60%', c: '#e3a44d' },
  { l: '93%', t: '34%', c: '#f1e8d9' },
]

export default function BookingModal({ open, onClose }) {
  const { t } = useLang()
  const b = t.booking

  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [people, setPeople] = useState(6)
  const [typeIndex, setTypeIndex] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false) // review step
  const [sent, setSent] = useState(false) // celebratory popup

  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement
      document.body.style.overflow = 'hidden'
      const id = setTimeout(() => closeRef.current?.focus(), 0)
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

  if (!open) return null

  const handleClose = () => {
    document.body.style.overflow = ''
    setError('')
    setDone(false)
    setSent(false)
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

  const fmtDate = (d) => (d ? `${d.getDate()} ${b.months[d.getMonth()]} ${d.getFullYear()}` : '')
  const clamp = (n) => Math.max(MIN_PEOPLE, Math.min(MAX_PEOPLE, n))

  const submit = (e) => {
    e.preventDefault()
    if (!date || !time) {
      setError(b.selectDateTime)
      return
    }
    if (!name.trim() || !email.trim()) {
      setError(b.required)
      return
    }
    setError('')
    setDone(true)
  }

  const mailtoHref = () => {
    const subject = `${b.title} — ${b.types[typeIndex]}`
    const lines = [
      `${b.summary.type}: ${b.types[typeIndex]}`,
      `${b.summary.date}: ${fmtDate(date)}`,
      `${b.summary.time}: ${time}`,
      `${b.summary.people}: ${people}`,
      `${b.summary.name}: ${name}`,
      `${b.summary.email}: ${email}`,
      phone.trim() ? `${b.summary.phone}: ${phone}` : null,
      notes.trim() ? `${b.summary.notes}: ${notes}` : null,
    ].filter(Boolean)
    return `mailto:hello@cellar.wine?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      lines.join('\n'),
    )}`
  }

  const sendRequest = () => {
    // Hand the filled-in request off to the visitor's mail client…
    window.location.href = mailtoHref()
    // …and celebrate.
    setSent(true)
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__party">
          <span className="party-dots" aria-hidden="true">
            {DOTS.map((d, i) => (
              <span key={i} style={{ left: d.l, top: d.t, background: d.c }} />
            ))}
          </span>
          <button type="button" className="modal__close" onClick={handleClose} aria-label={b.close} ref={closeRef}>
            ✕
          </button>
          <h2 id="booking-title" className="modal__title">
            🎉 {b.title}
          </h2>
          <p className="modal__party-tag">{b.partyTag}</p>
        </div>

        <div className="modal__body">
          {sent ? (
            <div className="booking-sent">
              <Confetti />
              <span className="booking-sent__emoji" aria-hidden="true">
                🥳
              </span>
              <h3>{b.sentTitle}</h3>
              <p>{b.sentBody}</p>
              <button type="button" className="btn btn--primary" onClick={handleClose}>
                {b.sentClose}
              </button>
            </div>
          ) : !done ? (
            <form className="booking" onSubmit={submit} noValidate>
              <p className="modal__subtitle">{b.subtitle}</p>

              <div className="field">
                <span className="field__label">{b.dateLabel}</span>
                <Calendar
                  value={date}
                  onChange={setDate}
                  weekdays={b.weekdays}
                  months={b.months}
                  labels={{ prevMonth: b.prevMonth, nextMonth: b.nextMonth }}
                />
              </div>

              <div className="field">
                <span className="field__label">{b.timeLabel}</span>
                <div className="chips" role="group" aria-label={b.timeLabel}>
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`chip ${time === slot ? 'is-on' : ''}`}
                      aria-pressed={time === slot}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="field__label" id="people-label">
                  {b.peopleLabel}
                </span>
                <div className="stepper" aria-labelledby="people-label">
                  <button type="button" className="stepper__btn" onClick={() => setPeople((p) => clamp(p - 1))} aria-label={b.decrease}>
                    −
                  </button>
                  <input
                    type="number"
                    className="stepper__input"
                    value={people}
                    min={MIN_PEOPLE}
                    max={MAX_PEOPLE}
                    onChange={(e) => setPeople(clamp(parseInt(e.target.value || '0', 10) || MIN_PEOPLE))}
                  />
                  <button type="button" className="stepper__btn" onClick={() => setPeople((p) => clamp(p + 1))} aria-label={b.increase}>
                    +
                  </button>
                </div>
                <p className="field__hint">{b.bigGroup}</p>
              </div>

              <div className="field">
                <span className="field__label">{b.typeLabel}</span>
                <div className="chips" role="group" aria-label={b.typeLabel}>
                  {b.types.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      className={`chip ${typeIndex === i ? 'is-on' : ''}`}
                      aria-pressed={typeIndex === i}
                      onClick={() => setTypeIndex(i)}
                    >
                      <span aria-hidden="true">{TYPE_EMOJI[i]}</span> {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-row">
                <label className="field">
                  <span className="field__label">{b.nameLabel} *</span>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                </label>
                <label className="field">
                  <span className="field__label">{b.emailLabel} *</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                </label>
              </div>

              <label className="field">
                <span className="field__label">{b.phoneLabel}</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </label>

              <label className="field">
                <span className="field__label">{b.notesLabel}</span>
                <textarea rows="3" value={notes} placeholder={b.notesPlaceholder} onChange={(e) => setNotes(e.target.value)} />
              </label>

              {error && (
                <p className="modal__error" role="alert">
                  {error}
                </p>
              )}

              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={handleClose}>
                  {b.cancel}
                </button>
                <button type="submit" className="btn btn--primary">
                  {b.submit}
                </button>
              </div>
            </form>
          ) : (
            <div className="booking-success">
              <span className="booking-success__badge" aria-hidden="true">
                ✓
              </span>
              <h3>{b.successTitle}</h3>
              <p>{b.successBody}</p>

              <dl className="summary">
                <div>
                  <dt>{b.summary.type}</dt>
                  <dd>
                    {TYPE_EMOJI[typeIndex]} {b.types[typeIndex]}
                  </dd>
                </div>
                <div>
                  <dt>{b.summary.date}</dt>
                  <dd>{fmtDate(date)}</dd>
                </div>
                <div>
                  <dt>{b.summary.time}</dt>
                  <dd>{time}</dd>
                </div>
                <div>
                  <dt>{b.summary.people}</dt>
                  <dd>{people}</dd>
                </div>
                <div>
                  <dt>{b.summary.name}</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>{b.summary.email}</dt>
                  <dd>{email}</dd>
                </div>
                {phone.trim() && (
                  <div>
                    <dt>{b.summary.phone}</dt>
                    <dd>{phone}</dd>
                  </div>
                )}
                {notes.trim() && (
                  <div>
                    <dt>{b.summary.notes}</dt>
                    <dd>{notes}</dd>
                  </div>
                )}
              </dl>

              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setDone(false)}>
                  {b.edit}
                </button>
                <button type="button" className="btn btn--primary" onClick={sendRequest}>
                  {b.send}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
