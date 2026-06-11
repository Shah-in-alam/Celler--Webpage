import { useState } from 'react'

const startOfDay = (d) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// Inline, Monday-first month calendar. Past days are disabled.
export default function Calendar({ value, onChange, weekdays, months, labels }) {
  const today = startOfDay(new Date())
  const init = value ? new Date(value) : today
  const [view, setView] = useState({ y: init.getFullYear(), m: init.getMonth() })

  const firstOfMonth = new Date(view.y, view.m, 1)
  const offset = (firstOfMonth.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d))

  const selected = value ? startOfDay(new Date(value)) : null

  const prev = () =>
    setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }))
  const next = () =>
    setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }))

  // Don't allow navigating to a month entirely in the past.
  const canPrev =
    view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth())

  return (
    <div className="cal">
      <div className="cal__head">
        <button type="button" className="cal__nav" onClick={prev} disabled={!canPrev} aria-label={labels.prevMonth}>
          ‹
        </button>
        <span className="cal__title" aria-live="polite">
          {months[view.m]} {view.y}
        </span>
        <button type="button" className="cal__nav" onClick={next} aria-label={labels.nextMonth}>
          ›
        </button>
      </div>

      <div className="cal__grid cal__grid--head" aria-hidden="true">
        {weekdays.map((w) => (
          <span key={w} className="cal__wd">
            {w}
          </span>
        ))}
      </div>

      <div className="cal__grid">
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} className="cal__cell cal__cell--empty" aria-hidden="true" />
          const past = d < today
          const isSel = sameDay(d, selected)
          return (
            <button
              key={d.toISOString()}
              type="button"
              className={`cal__cell ${isSel ? 'is-selected' : ''}`}
              disabled={past}
              aria-pressed={isSel}
              aria-label={`${d.getDate()} ${months[view.m]} ${view.y}`}
              onClick={() => onChange(d)}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
