// Datos "de fábrica" — se usan solo la primera vez que alguien abre el
// sitio en un navegador nuevo. Después de eso, el inventario real vive en
// el navegador (ver src/utils/inventario.js) y se administra desde el
// Panel Admin (/#admin).

export const IMAGENES_CATEGORIA = {
  Res: 'https://images.unsplash.com/photo-1690983322025-aab4f95a0269?auto=format&fit=crop&w=800&q=80',
  Cerdo: 'https://images.unsplash.com/photo-1602491950780-1c5411ecfdf6?auto=format&fit=crop&w=800&q=80',
  Pollo: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
  Embutidos: 'https://images.unsplash.com/photo-1624772413714-7e1ea3fbfeaf?auto=format&fit=crop&w=800&q=80',
}

export const categorias = ['Todos', 'Res', 'Cerdo', 'Pollo', 'Embutidos']

export const PRODUCTOS_SEMILLA = [
  {
    id: 1,
    nombre: 'Lomo Ancho de Res',
    categoria: 'Res',
    presentacion: '1 Kg',
    precio: 12500,
    corte: 'Premium',
    imagen: IMAGENES_CATEGORIA.Res,
  },
  {
    id: 2,
    nombre: 'New York Steak',
    categoria: 'Res',
    presentacion: '800 g',
    precio: 11800,
    corte: 'Premium',
    imagen: IMAGENES_CATEGORIA.Res,
  },
  {
    id: 3,
    nombre: 'Costilla de Cerdo',
    categoria: 'Cerdo',
    presentacion: '1 Kg',
    precio: 4200,
    corte: 'Clásico',
    imagen: IMAGENES_CATEGORIA.Cerdo,
  },
  {
    id: 4,
    nombre: 'Chuleta Ahumada',
    categoria: 'Cerdo',
    presentacion: '1 Kg',
    precio: 4800,
    corte: 'Clásico',
    imagen: IMAGENES_CATEGORIA.Cerdo,
  },
  {
    id: 5,
    nombre: 'Pechuga de Pollo',
    categoria: 'Pollo',
    presentacion: '1 Kg',
    precio: 3100,
    corte: 'Clásico',
    imagen: IMAGENES_CATEGORIA.Pollo,
  },
  {
    id: 6,
    nombre: 'Alitas de Pollo',
    categoria: 'Pollo',
    presentacion: '1 Kg',
    precio: 2800,
    corte: 'Clásico',
    imagen: IMAGENES_CATEGORIA.Pollo,
  },
  {
    id: 7,
    nombre: 'Chorizo de la Casa',
    categoria: 'Embutidos',
    presentacion: '500 g',
    precio: 3200,
    corte: 'Receta propia',
    imagen: IMAGENES_CATEGORIA.Embutidos,
  },
  {
    id: 8,
    nombre: 'Chicharrón Ahumado',
    categoria: 'Embutidos',
    presentacion: '500 g',
    precio: 3500,
    corte: 'Receta propia',
    imagen: IMAGENES_CATEGORIA.Embutidos,
  },
]

export const formatoColones = (valor) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(valor)

