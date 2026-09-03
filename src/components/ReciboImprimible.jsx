import { formatoColones } from '../data/productos'
import './ReciboImprimible.css'

export default function ReciboImprimible({ items, total }) {
  const fecha = new Date().toLocaleString('es-CR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  return (
    <div className="recibo-imprimible">
      <div className="recibo__header">
        <h2>CARNICERÍA SAN BOSCO</h2>
        <p>Acosta, San José, Costa Rica</p>
        <p>Tel: 2410-0133 · WhatsApp: +506 8344-3461</p>
      </div>

      <div className="recibo__linea" />

      <p className="recibo__fecha">{fecha}</p>

      <div className="recibo__linea" />

      <table className="recibo__tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                {item.nombre}
                <br />
                <small>{item.presentacion}</small>
              </td>
              <td>{item.cantidad}</td>
              <td>{formatoColones(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="recibo__linea" />

      <div className="recibo__total">
        <span>TOTAL</span>
        <span>{formatoColones(total)}</span>
      </div>

      <div className="recibo__linea" />

      <p className="recibo__gracias">¡Gracias por su compra!</p>
    </div>
  )
}
