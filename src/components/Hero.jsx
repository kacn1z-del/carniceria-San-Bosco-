import { useEffect, useState } from 'react'
import { IMAGENES_CATEGORIA } from '../data/productos'
import './Hero.css'

// Contenido de ejemplo — reemplazar con fotos reales de cortes/local.
const SLIDES = [
  { titulo: 'CORTES DE RES', categoria: 'Res', imagen: IMAGENES_CATEGORIA.Res },
  { titulo: 'CORTES DE CERDO', categoria: 'Cerdo', imagen: IMAGENES_CATEGORIA.Cerdo },
  { titulo: 'CORTES DE POLLO', categoria: 'Pollo', imagen: IMAGENES_CATEGORIA.Pollo },
]

export default function Hero({ onSelectCategoria }) {
  const [activo, setActivo] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActivo((v) => (v + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const irAProductos = (categoria) => {
    onSelectCategoria(categoria)
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="hero">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.titulo}
          className={`hero__slide ${i === activo ? 'hero__slide--activo' : ''}`}
          style={{ backgroundImage: `url(${slide.imagen})` }}
          aria-hidden={i !== activo}
        >
          <div className="hero__overlay" aria-hidden="true" />
          <div className="wrap hero__content">
            <p className="eyebrow">Acosta, San José · Desde 1980</p>
            <h1 className="hero__title">{slide.titulo}</h1>
            <p className="hero__subtitle">
              Tradición carnicera costarricense hecha oficio: selección, corte y
              despacho artesanal para la mesa de tu familia.
            </p>
            <button
              className="btn btn--terracotta"
              onClick={() => irAProductos(slide.categoria)}
            >
              Compre Aquí
            </button>
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
