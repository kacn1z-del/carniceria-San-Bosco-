// Manejo del contenido editable del sitio (Historia, Visión, Misión,
// Principios) desde el Panel Admin. Igual que el inventario, se guarda en
// localStorage del navegador — ver README para la limitación de esto.

const CLAVE_CONTENIDO = 'sanbosco_contenido_v1'

export const CONTENIDO_SEMILLA = {
  historia: {
    lead: 'Un legado que empezó en 1980',
    parrafo1:
      'La historia de Carnicería San Bosco comenzó en 1980 en Acosta, donde nació como un negocio familiar dedicado por completo al oficio carnicero. Desde entonces, generación tras generación, la casa ha mantenido la misma vocación: seleccionar con cuidado cada corte y ofrecer un trato cercano a quienes llegan buscando calidad.',
    parrafo2:
      '[Contenido de ejemplo — completar con la historia y datos propios de San Bosco] Hoy continuamos ese legado combinando la experiencia acumulada por décadas con procesos frescos y responsables, para llevar a tu mesa carne de res, cerdo y pollo en su punto justo.',
    imagen:
      'https://images.unsplash.com/photo-1584048603508-4b31894439a9?auto=format&fit=crop&w=900&q=80',
  },
  vision: {
    texto:
      '[Contenido de ejemplo] Ser la carnicería de referencia en calidad y servicio dentro de nuestra comunidad, honrando el oficio carnicero costarricense.',
  },
  mision: {
    texto:
      '[Contenido de ejemplo] Ofrecer a cada familia cortes frescos y de alta calidad, con un servicio cercano que refleje generaciones de experiencia.',
  },
  principios: [
    {
      icono: '🤝',
      titulo: 'Servicio al Cliente',
      texto: 'Trato amable y oportuno, superando siempre las expectativas de quien nos visita.',
    },
    {
      icono: '🏅',
      titulo: 'Calidad',
      texto: 'Selección rigurosa de cada corte, con estándares que se cumplen sin excepción.',
    },
    {
      icono: '🔪',
      titulo: 'Tradición',
      texto: 'Un oficio heredado de generación en generación, sin perder su esencia artesanal.',
    },
    {
      icono: '✅',
      titulo: 'Confianza',
      texto: 'Transparencia en cada producto, desde la selección hasta el despacho.',
    },
  ],
}

export function cargarContenido() {
  try {
    const guardado = localStorage.getItem(CLAVE_CONTENIDO)
    if (guardado) return { ...CONTENIDO_SEMILLA, ...JSON.parse(guardado) }
  } catch (e) {
    console.error('No se pudo leer el contenido guardado:', e)
  }
  return CONTENIDO_SEMILLA
}

export function guardarContenido(contenido) {
  try {
    localStorage.setItem(CLAVE_CONTENIDO, JSON.stringify(contenido))
    return true
  } catch (e) {
    console.error('No se pudo guardar el contenido:', e)
    return false
  }
}

export function restaurarContenidoDeFabrica() {
  guardarContenido(CONTENIDO_SEMILLA)
  return CONTENIDO_SEMILLA
}
