import { formatoColones } from '../data/productos'
import './CartDrawer.css'

const WHATSAPP_NUMBER = '50683443461'

export default function CartDrawer({ abierto, items, onClose, onQuitar, onCambiarCantidad }) {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const construirMensajeWhatsapp = () => {
    if (items.length === 0) return ''
    const lineas = items.map(
      (item) =>
        `• ${item.nombre} (${item.presentacion}) x${item.cantidad} — ${formatoColones(
          item.precio * item.cantidad
        )}`
    )
    return `Hola San Bosco, quiero hacer el siguiente pedido:\n\n${lineas.join(
      '\n'
    )}\n\nTotal: ${formatoColones(total)}`
  }

  const enlaceWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    construirMensajeWhatsapp()
  )}`

  return (
    <>
      <div
        className={`cart-overlay ${abierto ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${abierto ? 'cart-drawer--abierto' : ''}`}>
        <div className="cart-drawer__head">
          <h3>Tu Pedido</h3>
          <button onClick={onClose} aria-label="Cerrar carrito" className="cart-drawer__cerrar">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__vacio">Tu carrito está vacío.</p>
        ) : (
          <div className="cart-drawer__lista">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__info">
                  <p className="cart-item__nombre">{item.nombre}</p>
                  <p className="cart-item__presentacion">{item.presentacion}</p>
                </div>
                <div className="cart-item__cantidad">
                  <button onClick={() => onCambiarCantidad(item.id, -1)}>−</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
                </div>
                <div className="cart-item__precio">
                  {formatoColones(item.precio * item.cantidad)}
                </div>
                <button
                  className="cart-item__quitar"
                  onClick={() => onQuitar(item.id)}
                  aria-label={`Quitar ${item.nombre}`}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Total</span>
            <span>{formatoColones(total)}</span>
          </div>
          <a
            className={`btn btn--terracotta cart-drawer__checkout ${
              items.length === 0 ? 'cart-drawer__checkout--deshabilitado' : ''
            }`}
            href={items.length === 0 ? undefined : enlaceWhatsapp}
            target="_blank"
            rel="noreferrer"
            aria-disabled={items.length === 0}
            onClick={(e) => {
              if (items.length === 0) e.preventDefault()
            }}
          >
            Finalizar pedido por WhatsApp
          </a>
          <button
            className={`btn btn--outline-oscuro cart-drawer__imprimir ${
              items.length === 0 ? 'cart-drawer__checkout--deshabilitado' : ''
            }`}
            onClick={() => window.print()}
            disabled={items.length === 0}
          >
            🧾 Imprimir Recibo
          </button>
        </div>
      </aside>
    </>
  )
}

