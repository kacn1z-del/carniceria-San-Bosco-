import './Historia.css'

export default function Historia({ contenido }) {
  return (
    <section id="historia" className="historia">
      <div className="wrap">
        <div className="historia__icon" aria-hidden="true">
          🥩
        </div>
        <h2 className="historia__titulo">
          Nuestra <span>Historia</span>
        </h2>

        <div className="historia__grid">
          <div className="historia__text">
            <p className="historia__lead">{contenido.lead}</p>
            <p>{contenido.parrafo1}</p>
            <p>{contenido.parrafo2}</p>
          </div>

          <div className="historia__media">
            <img
              src={contenido.imagen}
              alt="Mostrador de carnicería"
              className="historia__img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
