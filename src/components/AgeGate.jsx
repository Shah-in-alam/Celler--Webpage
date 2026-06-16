import { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'

// Wraps the wine-shop content. Until the visitor confirms they are 18+, the
// shop is hidden behind this gate. The choice is remembered in localStorage.
export default function AgeGate({ children }) {
  const { t } = useLang()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    setVerified(localStorage.getItem('cellar-age-verified') === 'true')
  }, [])

  const confirm = () => {
    localStorage.setItem('cellar-age-verified', 'true')
    setVerified(true)
  }

  if (verified) return children

  return (
    <div className="agegate" role="group" aria-labelledby="agegate-title">
      <span className="agegate__badge" aria-hidden="true">
        18+
      </span>
      <h3 id="agegate-title" className="agegate__title">
        {t.ageGate.title}
      </h3>
      <p className="agegate__body">{t.ageGate.body}</p>
      <div className="agegate__actions">
        <button className="btn btn--primary" onClick={confirm}>
          {t.ageGate.yes}
        </button>
        <a className="btn btn--ghost-light" href="#top">
          {t.ageGate.no}
        </a>
      </div>
      <p className="agegate__small">{t.ageGate.responsibly}</p>
    </div>
  )
}
