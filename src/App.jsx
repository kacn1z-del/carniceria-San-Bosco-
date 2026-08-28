import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Historia from './components/Historia.jsx'
import Productos from './components/Productos.jsx'
import VisionMision from './components/VisionMision.jsx'
import Ubicaciones from './components/Ubicaciones.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartAbierto, setCartAbierto] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

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

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartAbierto(true)} />
      <main>
        <Hero onSelectCategoria={setCategoriaActiva} />
        <Historia />
        <Productos
          onAddToCart={agregarAlCarrito}
          categoriaActiva={categoriaActiva}
          onCambiarCategoria={setCategoriaActiva}
        />
        <VisionMision />
        <Ubicaciones />
        <Contacto />
      </main>
      <Footer />
      <CartDrawer
        abierto={cartAbierto}
        items={cart}
        onClose={() => setCartAbierto(false)}
        onQuitar={quitarDelCarrito}
        onCambiarCantidad={cambiarCantidad}
      />
    </>
  )
}
