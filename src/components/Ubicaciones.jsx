import './Ubicaciones.css'

const LOCACIONES = [
  {
    nombre: 'San Bosco Centro',
    direccion: 'Centro de Acosta, San José',
    horario: 'Lun – Sáb: 6:00 a.m. – 5:00 p.m.',
  },
  {
    nombre: 'San Bosco Sucursal',
    direccion: '[Dirección de ejemplo — completar]',
    horario: 'Lun – Dom: 7:00 a.m. – 6:00 p.m.',
  },
]

export default function Ubicaciones() {
  return (
    <section id="ubicaciones" className="ubicaciones">
      <div className="wrap">
        <p className="eyebrow">Visítanos</p>
        <h2 className="ubicaciones__title">Ubicaciones</h2>

        <div className="ubicaciones__grid">
          {LOCACIONES.map((loc) => (
            <div className="ubicacion-card" key={loc.nombre}>
              <div className="ubicacion-card__mapa" aria-hidden="true">
                📍
              </div>
              <div>
                <h3 className="ubicacion-card__nombre">{loc.nombre}</h3>
                <p>{loc.direccion}</p>
                <p className="ubicacion-card__horario">{loc.horario}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
