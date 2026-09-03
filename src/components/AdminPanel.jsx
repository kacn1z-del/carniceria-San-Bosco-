import { useState } from 'react'
import { categorias, formatoColones } from '../data/productos'
import { guardarProductos, nuevoIdProducto, restaurarProductosDeFabrica } from '../utils/inventario'
import './AdminPanel.css'

// PIN temporal — cámbialo antes de compartir el acceso del panel.
const PIN_ADMIN = 'sanbosco1980'

const CATEGORIAS_PRODUCTO = categorias.filter((c) => c !== 'Todos')

const PRODUCTO_VACIO = {
  nombre: '',
  categoria: CATEGORIAS_PRODUCTO[0],
  presentacion: '',
  precio: '',
  corte: 'Clásico',
  imagen: '',
}

function convertirArchivoABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = reject
    lector.readAsDataURL(archivo)
  })
}

export default function AdminPanel({ productos, onGuardarProductos, onVolver }) {
  const [autenticado, setAutenticado] = useState(false)
  const [pinIngresado, setPinIngresado] = useState('')
  const [error, setError] = useState('')
  const [nuevo, setNuevo] = useState(PRODUCTO_VACIO)
  const [mensaje, setMensaje] = useState('')

  const validarPin = (e) => {
    e.preventDefault()
    if (pinIngresado === PIN_ADMIN) {
      setAutenticado(true)
      setError('')
    } else {
      setError('PIN incorrecto.')
    }
  }

  const mostrarMensaje = (texto) => {
    setMensaje(texto)
    setTimeout(() => setMensaje(''), 2500)
  }

  const actualizarCampo = (id, campo, valor) => {
    const actualizados = productos.map((p) =>
      p.id === id ? { ...p, [campo]: campo === 'precio' ? Number(valor) || 0 : valor } : p
    )
    onGuardarProductos(actualizados)
  }

  const actualizarImagen = async (id, archivo) => {
    if (!archivo) return
    if (archivo.size > 700 * 1024) {
      setError('La imagen es muy pesada. Usa una foto de menos de 700 KB.')
      return
    }
    const base64 = await convertirArchivoABase64(archivo)
    actualizarCampo(id, 'imagen', base64)
    setError('')
  }

  const eliminarProducto = (id) => {
    if (!confirm('¿Eliminar este producto del inventario?')) return
    onGuardarProductos(productos.filter((p) => p.id !== id))
    mostrarMensaje('Producto eliminado.')
  }

  const agregarProducto = (e) => {
    e.preventDefault()
    if (!nuevo.nombre || !nuevo.precio) {
      setError('Nombre y precio son obligatorios.')
      return
    }
    const producto = {
      ...nuevo,
      id: nuevoIdProducto(productos),
      precio: Number(nuevo.precio) || 0,
      imagen: nuevo.imagen || '',
    }
    onGuardarProductos([...productos, producto])
    setNuevo(PRODUCTO_VACIO)
    setError('')
    mostrarMensaje('Producto agregado.')
  }

  const imagenNuevoProducto = async (archivo) => {
    if (!archivo) return
    if (archivo.size > 700 * 1024) {
      setError('La imagen es muy pesada. Usa una foto de menos de 700 KB.')
      return
    }
    const base64 = await convertirArchivoABase64(archivo)
    setNuevo((n) => ({ ...n, imagen: base64 }))
    setError('')
  }

  const restaurarDeFabrica = () => {
    if (!confirm('Esto borra tus cambios y vuelve a los productos de ejemplo. ¿Continuar?'))
      return
    const original = restaurarProductosDeFabrica()
    onGuardarProductos(original)
    mostrarMensaje('Inventario restaurado.')
  }

  if (!autenticado) {
    return (
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={validarPin}>
          <h2>Panel Admin</h2>
          <p>Ingresa el PIN para administrar el inventario.</p>
          <input
            type="password"
            value={pinIngresado}
            onChange={(e) => setPinIngresado(e.target.value)}
            placeholder="PIN"
            autoFocus
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="btn btn--terracotta">
            Entrar
          </button>
          <button type="button" className="admin-login__volver" onClick={onVolver}>
            ← Volver al sitio
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin__bar">
        <h2>Panel Admin — Inventario</h2>
        <div className="admin__bar-acciones">
          <button className="btn btn--outline-oscuro" onClick={restaurarDeFabrica}>
            Restaurar de fábrica
          </button>
          <button className="btn btn--dark" onClick={onVolver}>
            Ver sitio
          </button>
        </div>
      </div>

      {mensaje && <div className="admin__mensaje">{mensaje}</div>}
      {error && <div className="admin__mensaje admin__mensaje--error">{error}</div>}

      <div className="admin__lista">
        {productos.map((p) => (
          <div className="admin-item" key={p.id}>
            <div className="admin-item__foto">
              {p.imagen ? (
                <img src={p.imagen} alt={p.nombre} />
              ) : (
                <span>Sin foto</span>
              )}
              <label className="admin-item__subir">
                Cambiar foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => actualizarImagen(p.id, e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <div className="admin-item__campos">
              <label>
                Nombre
                <input
                  type="text"
                  value={p.nombre}
                  onChange={(e) => actualizarCampo(p.id, 'nombre', e.target.value)}
                />
              </label>
              <label>
                Categoría
                <select
                  value={p.categoria}
                  onChange={(e) => actualizarCampo(p.id, 'categoria', e.target.value)}
                >
                  {CATEGORIAS_PRODUCTO.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Presentación
                <input
                  type="text"
                  value={p.presentacion}
                  onChange={(e) => actualizarCampo(p.id, 'presentacion', e.target.value)}
                  placeholder="1 Kg"
                />
              </label>
              <label>
                Precio (₡)
                <input
                  type="number"
                  value={p.precio}
                  onChange={(e) => actualizarCampo(p.id, 'precio', e.target.value)}
                />
              </label>
              <label>
                Etiqueta de corte
                <input
                  type="text"
                  value={p.corte}
                  onChange={(e) => actualizarCampo(p.id, 'corte', e.target.value)}
                  placeholder="Premium"
                />
              </label>
              <span className="admin-item__preview">{formatoColones(p.precio)}</span>
            </div>

            <button className="admin-item__borrar" onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <form className="admin-nuevo" onSubmit={agregarProducto}>
        <h3>Agregar producto</h3>
        <div className="admin-nuevo__grid">
          <label>
            Nombre
            <input
              type="text"
              value={nuevo.nombre}
              onChange={(e) => setNuevo((n) => ({ ...n, nombre: e.target.value }))}
              placeholder="Ej: Filete de Res"
            />
          </label>
          <label>
            Categoría
            <select
              value={nuevo.categoria}
              onChange={(e) => setNuevo((n) => ({ ...n, categoria: e.target.value }))}
            >
              {CATEGORIAS_PRODUCTO.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Presentación
            <input
              type="text"
              value={nuevo.presentacion}
              onChange={(e) => setNuevo((n) => ({ ...n, presentacion: e.target.value }))}
              placeholder="1 Kg"
            />
          </label>
          <label>
            Precio (₡)
            <input
              type="number"
              value={nuevo.precio}
              onChange={(e) => setNuevo((n) => ({ ...n, precio: e.target.value }))}
            />
          </label>
          <label>
            Etiqueta de corte
            <input
              type="text"
              value={nuevo.corte}
              onChange={(e) => setNuevo((n) => ({ ...n, corte: e.target.value }))}
            />
          </label>
          <label>
            Foto
            <input
              type="file"
              accept="image/*"
              onChange={(e) => imagenNuevoProducto(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit" className="btn btn--terracotta">
          Agregar Producto
        </button>
      </form>
    </div>
  )
}
