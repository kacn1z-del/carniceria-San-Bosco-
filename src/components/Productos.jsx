import { useState } from 'react'
import { categorias, productos, formatoColones } from '../data/productos'
import './Productos.css'

export default function Productos({ onAddToCart }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  const visibles =
    categoriaActiva === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva)

  return (
    <section id="productos" className="productos">
      <div className="wrap">
        <div className="productos__head">
          <div>
            <p className="eyebrow">Nuestros mejores cortes</p>
            <h2>Productos Destacados</h2>
          </div>
          <div className="productos__filtros">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`productos__filtro ${
                  categoriaActiva === cat ? 'productos__filtro--activo' : ''
                }`}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="productos__grid">
          {visibles.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <div className="producto-card__media" aria-hidden="true">
                <span className="producto-card__destacado">Destacado</span>
                <span>Foto</span>
                <div className="producto-card__sello sello">{producto.corte}</div>
              </div>
              <div className="producto-card__body">
                <p className="producto-card__cat">{producto.categoria}</p>
                <h3 className="producto-card__nombre">{producto.nombre}</h3>
                <p className="producto-card__presentacion">{producto.presentacion}</p>
                <div className="producto-card__footer">
                  <span className="producto-card__precio">
                    {formatoColones(producto.precio)}
                  </span>
                  <button
                    className="btn btn--dark producto-card__btn"
                    onClick={() => onAddToCart(producto)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="productos__nota">
          * Precios y productos de ejemplo — se actualizarán con el catálogo real de
          San Bosco.
        </p>
      </div>
    </section>
  )
}
