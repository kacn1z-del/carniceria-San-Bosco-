// Manejo del inventario editable desde el Panel Admin.
// Se guarda en localStorage del navegador — no hay backend ni base de
// datos, así que los cambios solo se ven en el mismo navegador/dispositivo
// donde se hicieron. Ver README para más detalle sobre esta limitación.

import { PRODUCTOS_SEMILLA } from '../data/productos'

const CLAVE_PRODUCTOS = 'sanbosco_productos_v1'

export function cargarProductos() {
  try {
    const guardado = localStorage.getItem(CLAVE_PRODUCTOS)
    if (guardado) return JSON.parse(guardado)
  } catch (e) {
    console.error('No se pudo leer el inventario guardado:', e)
  }
  return PRODUCTOS_SEMILLA
}

export function guardarProductos(productos) {
  try {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
    return true
  } catch (e) {
    console.error('No se pudo guardar el inventario:', e)
    return false
  }
}

export function restaurarProductosDeFabrica() {
  guardarProductos(PRODUCTOS_SEMILLA)
  return PRODUCTOS_SEMILLA
}

export function nuevoIdProducto(productos) {
  const maxId = productos.reduce((max, p) => Math.max(max, p.id), 0)
  return maxId + 1
}
