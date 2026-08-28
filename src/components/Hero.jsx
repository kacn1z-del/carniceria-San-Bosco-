import { useEffect, useState } from 'react'
import './Hero.css'

// Contenido de ejemplo — reemplazar con fotos reales de cortes/local.
const SLIDES = [
  { titulo: 'CORTES DE RES', enlace: '#productos' },
  { titulo: 'CORTES DE CERDO', enlace: '#productos' },
  { titulo: 'CORTES DE POLLO', enlace: '#productos' },
]

export default function Hero() {
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActivo((v) => (v + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero__hatch" aria-hidden="true" />

      {SLIDES.map((slide, i) => (
        <div
          key={slide.titulo}
          className={`hero__slide ${i === activo ? 'hero__slide--activo' : ''}`}
          aria-hidden={i !== activo}
        >
          <div className="wrap hero__content">
            <p className="eyebrow">Mercado Central de San José · Desde 1942</p>
            <h1 className="hero__title">{slide.titulo}</h1>
            <p className="hero__subtitle">
              Tradición carnicera costarricense hecha oficio: selección, corte y
              despacho artesanal para la mesa de tu familia.
            </p>
            <a href={slide.enlace} className="btn btn--terracotta">
              Compre Aquí
            </a>
          </div>
        </div>
      ))}

      <div className="hero__dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.titulo}
            className={`hero__dot ${i === activo ? 'hero__dot--activo' : ''}`}
            onClick={() => setActivo(i)}
            aria-label={`Ver: ${slide.titulo}`}
          />
        ))}
      </div>

      <div className="hero__badge sello" style={{ color: 'var(--paper)' }}>
        <div>
          <div className="hero__badge-top">CALIDAD</div>
          <div className="hero__badge-main">GARANTIZADA</div>
        </div>
      </div>
    </section>
  )
}
