// Contenido de ejemplo — reemplazar con productos, precios y fotos reales.
export const categorias = ['Todos', 'Res', 'Cerdo', 'Pollo', 'Embutidos']

export const productos = [
  {
    id: 1,
    nombre: 'Lomo Ancho de Res',
    categoria: 'Res',
    presentacion: '1 Kg',
    precio: 12500,
    corte: 'Premium',
    imagen: null,
  },
  {
    id: 2,
    nombre: 'New York Steak',
    categoria: 'Res',
    presentacion: '800 g',
    precio: 11800,
    corte: 'Premium',
    imagen: null,
  },
  {
    id: 3,
    nombre: 'Costilla de Cerdo',
    categoria: 'Cerdo',
    presentacion: '1 Kg',
    precio: 4200,
    corte: 'Clásico',
    imagen: null,
  },
  {
    id: 4,
    nombre: 'Chuleta Ahumada',
    categoria: 'Cerdo',
    presentacion: '1 Kg',
    precio: 4800,
    corte: 'Clásico',
    imagen: null,
  },
  {
    id: 5,
    nombre: 'Pechuga de Pollo',
    categoria: 'Pollo',
    presentacion: '1 Kg',
    precio: 3100,
    corte: 'Clásico',
    imagen: null,
  },
  {
    id: 6,
    nombre: 'Alitas de Pollo',
    categoria: 'Pollo',
    presentacion: '1 Kg',
    precio: 2800,
    corte: 'Clásico',
    imagen: null,
  },
  {
    id: 7,
    nombre: 'Chorizo de la Casa',
    categoria: 'Embutidos',
    presentacion: '500 g',
    precio: 3200,
    corte: 'Receta propia',
    imagen: null,
  },
  {
    id: 8,
    nombre: 'Chicharrón Ahumado',
    categoria: 'Embutidos',
    presentacion: '500 g',
    precio: 3500,
    corte: 'Receta propia',
    imagen: null,
  },
]

export const formatoColones = (valor) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(valor)
