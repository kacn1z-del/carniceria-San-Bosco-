import { useState } from 'react'
import './Header.css'

const WHATSAPP_NUMBER = '50663024507'

const NAV_LINKS = [
  { href: '#historia', label: 'Nuestra Historia' },
  { href: '#productos', label: 'Productos' },
  { href: '#vision', label: 'Visión y Misión' },
  { href: '#ubicaciones', label: 'Ubicaciones' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="wrap header__bar">
        <a href="#top" className="header__logo">
          <span className="header__logo-line">CARNICERÍA</span>
          <span className="header__logo-main">SAN BOSCO</span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a
            className="header__whatsapp"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Escribir por WhatsApp"
          >
            WhatsApp
          </a>
          <button className="header__cart" onClick={onOpenCart} aria-label="Ver carrito">
            🛒
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </button>
          <button
            className="header__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
