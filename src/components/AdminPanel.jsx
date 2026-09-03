import { useState } from 'react'
import { categorias, formatoColones } from '../data/productos'
import { guardarProductos, nuevoIdProducto, restaurarProductosDeFabrica } from '../utils/inventario'
import { restaurarContenidoDeFabrica } from '../utils/contenido'
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

export default function AdminPanel({
  productos,
  onGuardarProductos,
  contenido,
  onGuardarContenido,
  onVolver,
}) {
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

  // ---------- Productos ----------

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

  // ---------- Contenido del sitio ----------

  const actualizarHistoria = (campo, valor) => {
    onGuardarContenido({ ...contenido, historia: { ...contenido.historia, [campo]: valor } })
  }

  const actualizarImagenHistoria = async (archivo) => {
    if (!archivo) return
    if (archivo.size > 700 * 1024) {
      setError('La imagen es muy pesada. Usa una foto de menos de 700 KB.')
      return
    }
    const base64 = await convertirArchivoABase64(archivo)
    actualizarHistoria('imagen', base64)
    setError('')
  }

  const actualizarVision = (texto) => {
    onGuardarContenido({ ...contenido, vision: { texto } })
  }

  const actualizarMision = (texto) => {
    onGuardarContenido({ ...contenido, mision: { texto } })
  }

  const actualizarPrincipio = (indice, campo, valor) => {
    const principios = contenido.principios.map((p, i) =>
      i === indice ? { ...p, [campo]: valor } : p
    )
    onGuardarContenido({ ...contenido, principios })
  }

  const restaurarContenidoFabrica = () => {
    if (!confirm('Esto borra los textos que hayas editado y vuelve a los de ejemplo. ¿Continuar?'))
      return
    const original = restaurarContenidoDeFabrica()
    onGuardarContenido(original)
    mostrarMensaje('Contenido restaurado.')
  }

  if (!autenticado) {
    return (
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={validarPin}>
          <h2>Panel Admin</h2>
          <p>Ingresa el PIN para administrar el sitio.</p>
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
        <h2>Panel Admin</h2>
        <div className="admin__bar-acciones">
          <button className="btn btn--dark" onClick={onVolver}>
            Ver sitio
          </button>
        </div>
      </div>

      {mensaje && <div className="admin__mensaje">{mensaje}</div>}
      {error && <div className="admin__mensaje admin__mensaje--error">{error}</div>}

      {/* ---------- Inventario ---------- */}
      <section className="admin__seccion">
        <div className="admin__seccion-head">
          <h3>Inventario de Productos</h3>
          <button className="btn btn--outline-oscuro" onClick={restaurarDeFabrica}>
            Restaurar productos de fábrica
          </button>
        </div>

        <div className="admin__lista">
          {productos.map((p) => (
            <div className="admin-item" key={p.id}>
              <div className="admin-item__foto">
                {p.imagen ? <img src={p.imagen} alt={p.nombre} /> : <span>Sin foto</span>}
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
          <h4>Agregar producto</h4>
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
      </section>

      {/* ---------- Contenido del sitio ---------- */}
      <section className="admin__seccion">
        <div className="admin__seccion-head">
          <h3>Contenido del Sitio</h3>
          <button className="btn btn--outline-oscuro" onClick={restaurarContenidoFabrica}>
            Restaurar textos de fábrica
          </button>
        </div>

        <div className="admin-contenido">
          <h4>Nuestra Historia</h4>
          <label className="admin-contenido__campo">
            Frase destacada
            <input
              type="text"
              value={contenido.historia.lead}
              onChange={(e) => actualizarHistoria('lead', e.target.value)}
            />
          </label>
          <label className="admin-contenido__campo">
            Primer párrafo
            <textarea
              rows={4}
              value={contenido.historia.parrafo1}
              onChange={(e) => actualizarHistoria('parrafo1', e.target.value)}
            />
          </label>
          <label className="admin-contenido__campo">
            Segundo párrafo
            <textarea
              rows={4}
              value={contenido.historia.parrafo2}
              onChange={(e) => actualizarHistoria('parrafo2', e.target.value)}
            />
          </label>
          <div className="admin-contenido__foto">
            <div className="admin-item__foto admin-item__foto--historia">
              {contenido.historia.imagen ? (
                <img src={contenido.historia.imagen} alt="Historia" />
              ) : (
                <span>Sin foto</span>
              )}
              <label className="admin-item__subir">
                Cambiar foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => actualizarImagenHistoria(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
          </div>

          <h4>Visión</h4>
          <label className="admin-contenido__campo">
            Texto de Visión
            <textarea
              rows={3}
              value={contenido.vision.texto}
              onChange={(e) => actualizarVision(e.target.value)}
            />
          </label>

          <h4>Misión</h4>
          <label className="admin-contenido__campo">
            Texto de Misión
            <textarea
              rows={3}
              value={contenido.mision.texto}
              onChange={(e) => actualizarMision(e.target.value)}
            />
          </label>

          <h4>Principios</h4>
          <div className="admin-principios">
            {contenido.principios.map((p, i) => (
              <div className="admin-principio" key={i}>
                <label>
                  Ícono (emoji)
                  <input
                    type="text"
                    value={p.icono}
                    onChange={(e) => actualizarPrincipio(i, 'icono', e.target.value)}
                    maxLength={2}
                  />
                </label>
                <label>
                  Título
                  <input
                    type="text"
                    value={p.titulo}
                    onChange={(e) => actualizarPrincipio(i, 'titulo', e.target.value)}
                  />
                </label>
                <label>
                  Texto
                  <textarea
                    rows={3}
                    value={p.texto}
                    onChange={(e) => actualizarPrincipio(i, 'texto', e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
