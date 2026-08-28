import './Historia.css'

export default function Historia() {
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
            <p className="historia__lead">Un legado que empezó en 1980</p>
            <p>
              La historia de Carnicería San Bosco comenzó en 1980 en Acosta, donde
              nació como un negocio familiar dedicado por completo al oficio
              carnicero. Desde entonces, generación tras generación, la casa ha
              mantenido la misma vocación: seleccionar con cuidado cada corte y
              ofrecer un trato cercano a quienes llegan buscando calidad.
            </p>
            <p>
              [Contenido de ejemplo — completar con la historia y datos propios de
              San Bosco] Hoy continuamos ese legado combinando la experiencia
              acumulada por décadas con procesos frescos y responsables, para
              llevar a tu mesa carne de res, cerdo y pollo en su punto justo.
            </p>
          </div>

          <div className="historia__media">
            <img
              src="https://images.unsplash.com/photo-1584048603508-4b31894439a9?auto=format&fit=crop&w=900&q=80"
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
