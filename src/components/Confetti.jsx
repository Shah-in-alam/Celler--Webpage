const COLORS = ['#e3a44d', '#6e2540', '#8a3a57', '#c98429', '#fffaf2', '#f1e8d9']

// Lightweight falling-confetti burst. Decorative only (hidden from a11y tree,
// and disabled under prefers-reduced-motion via CSS).
export default function Confetti({ count = 40 }) {
  const pieces = Array.from({ length: count }).map((_, i) => {
    const size = 6 + Math.random() * 7
    const style = {
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size * 0.6}px`,
      background: COLORS[i % COLORS.length],
      animationDelay: `${Math.random() * 0.5}s`,
      animationDuration: `${1.8 + Math.random() * 1.4}s`,
    }
    return <span key={i} className="confetti__piece" style={style} />
  })
  return (
    <span className="confetti" aria-hidden="true">
      {pieces}
    </span>
  )
}
