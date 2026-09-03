import './Footer.css'

export default function Footer({ onAdminClick }) {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <span className="footer__logo-line">CARNICERÍA</span>
          <span className="footer__logo-main">SAN BOSCO</span>
          <p>Acosta, San José · Costa Rica</p>
        </div>

        <div className="footer__social">
          <a
            href="https://www.facebook.com/share/1BWK8rexQW/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
            Instagram
          </a>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p>© {new Date().getFullYear()} Carnicería San Bosco. Todos los derechos reservados.</p>
        <p>
          Desarrollo: KCN Studio ·{' '}
          <button className="footer__admin" onClick={onAdminClick}>
            Panel Admin
          </button>
        </p>
      </div>
    </footer>
  )
}
