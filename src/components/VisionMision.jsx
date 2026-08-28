import './VisionMision.css'

const PRINCIPIOS = [
  {
    icono: '🤝',
    titulo: 'Servicio al Cliente',
    texto: 'Trato amable y oportuno, superando siempre las expectativas de quien nos visita.',
  },
  {
    icono: '🏅',
    titulo: 'Calidad',
    texto: 'Selección rigurosa de cada corte, con estándares que se cumplen sin excepción.',
  },
  {
    icono: '🔪',
    titulo: 'Tradición',
    texto: 'Un oficio heredado de generación en generación, sin perder su esencia artesanal.',
  },
  {
    icono: '✅',
    titulo: 'Confianza',
    texto: 'Transparencia en cada producto, desde la selección hasta el despacho.',
  },
]

export default function VisionMision() {
  return (
    <section id="vision" className="vision">
      <div className="wrap">
        <div className="vision__cards">
          <div className="vision__card">
            <div className="vision__icono" aria-hidden="true">
              🎯
            </div>
            <p className="eyebrow">Visión</p>
            <p className="vision__texto">
              [Contenido de ejemplo] Ser la carnicería de referencia en calidad y
              servicio dentro de nuestra comunidad, honrando el oficio carnicero
              costarricense.
            </p>
          </div>
          <div className="vision__card">
            <div className="vision__icono" aria-hidden="true">
              🧭
            </div>
            <p className="eyebrow">Misión</p>
            <p className="vision__texto">
              [Contenido de ejemplo] Ofrecer a cada familia cortes frescos y de alta
              calidad, con un servicio cercano que refleje generaciones de
              experiencia.
            </p>
          </div>
        </div>

        <div className="vision__principios">
          <h2 className="vision__principios-title">
            Principios <span>San Bosco</span>
          </h2>
          <div className="vision__principios-grid">
            {PRINCIPIOS.map((p) => (
              <div className="principio" key={p.titulo}>
                <div className="principio__icono" aria-hidden="true">
                  {p.icono}
                </div>
                <h3 className="principio__titulo">{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
