import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Historia from './components/Historia.jsx'
import Productos from './components/Productos.jsx'
import VisionMision from './components/VisionMision.jsx'
import Ubicaciones from './components/Ubicaciones.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import ReciboImprimible from './components/ReciboImprimible.jsx'
import { cargarProductos, guardarProductos } from './utils/inventario'
import { cargarContenido, guardarContenido } from './utils/contenido'

export default function App() {
  const [productos, setProductos] = useState([])
  const [contenido, setContenido] = useState(null)
  const [cart, setCart] = useState([])
  const [cartAbierto, setCartAbierto] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [vista, setVista] = useState(
    window.location.hash === '#admin' ? 'admin' : 'sitio'
  )

  useEffect(() => {
    setProductos(cargarProductos())
    setContenido(cargarContenido())

    const alCambiarHash = () => {
      setVista(window.location.hash === '#admin' ? 'admin' : 'sitio')
    }
    window.addEventListener('hashchange', alCambiarHash)
    return () => window.removeEventListener('hashchange', alCambiarHash)
  }, [])

  const actualizarInventario = (nuevosProductos) => {
    setProductos(nuevosProductos)
    guardarProductos(nuevosProductos)
  }

  const actualizarContenido = (nuevoContenido) => {
    setContenido(nuevoContenido)
    guardarContenido(nuevoContenido)
  }

  const irAlSitio = () => {
    window.location.hash = ''
    setVista('sitio')
  }

  const irAlAdmin = () => {
    window.location.hash = 'admin'
    setVista('admin')
  }

  const agregarAlCarrito = (producto) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    setCartAbierto(true)
  }

  const quitarDelCarrito = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cambiarCantidad = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  if (!contenido) return null

  if (vista === 'admin') {
    return (
      <AdminPanel
        productos={productos}
        onGuardarProductos={actualizarInventario}
        contenido={contenido}
        onGuardarContenido={actualizarContenido}
        onVolver={irAlSitio}
      />
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartAbierto(true)} />
      <main>
        <Hero onSelectCategoria={setCategoriaActiva} />
        <Historia contenido={contenido.historia} />
        <Productos
          productos={productos}
          onAddToCart={agregarAlCarrito}
          categoriaActiva={categoriaActiva}
          onCambiarCategoria={setCategoriaActiva}
        />
        <VisionMision
          vision={contenido.vision}
          mision={contenido.mision}
          principios={contenido.principios}
        />
        <Ubicaciones />
        <Contacto />
      </main>
      <Footer onAdminClick={irAlAdmin} />
      <CartDrawer
        abierto={cartAbierto}
        items={cart}
        onClose={() => setCartAbierto(false)}
        onQuitar={quitarDelCarrito}
        onCambiarCantidad={cambiarCantidad}
      />
      <ReciboImprimible items={cart} total={cartTotal} />
    </>
  )
}
