import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Cellar</span>
          <p className="footer__tagline">{f.tagline}</p>
          <p className="footer__sister">{f.sister}</p>
        </div>

        <div className="footer__meta">
          <p className="footer__age">{f.age}</p>
          <div className="footer__bottom">
            <p>{f.rights}</p>
            <a href="#top" className="footer__back">
              {f.back} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
