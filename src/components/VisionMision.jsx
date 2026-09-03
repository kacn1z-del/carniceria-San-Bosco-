import './VisionMision.css'

export default function VisionMision({ vision, mision, principios }) {
  return (
    <section id="vision" className="vision">
      <div className="wrap">
        <div className="vision__cards">
          <div className="vision__card">
            <div className="vision__icono" aria-hidden="true">
              🎯
            </div>
            <p className="eyebrow">Visión</p>
            <p className="vision__texto">{vision.texto}</p>
          </div>
          <div className="vision__card">
            <div className="vision__icono" aria-hidden="true">
              🧭
            </div>
            <p className="eyebrow">Misión</p>
            <p className="vision__texto">{mision.texto}</p>
          </div>
        </div>

        <div className="vision__principios">
          <h2 className="vision__principios-title">
            Principios <span>San Bosco</span>
          </h2>
          <div className="vision__principios-grid">
            {principios.map((p) => (
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
