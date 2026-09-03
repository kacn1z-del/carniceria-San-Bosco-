# Carnicería San Bosco — Sitio Web

Sitio hecho con **React 19 + Vite**, con la identidad de marca de San Bosco
(negro #1D1D1C, terracota #CA4F16, tipografías Bebas Neue + Nunito).

## Antes de publicar, reemplazar:

1. **Número de WhatsApp** — ya configurado: +506 8344-3461.

2. **Facebook** — ya enlazado en Footer y Contacto.

3. **Productos y precios reales** — se administran desde el **Panel Admin**
   (ver abajo), no hace falta editar código para eso.

4. **Fotos** — actualmente se usan fotos genéricas de banco libre (Unsplash)
   en Hero e Historia. Se pueden reemplazar por fotos reales desde el Panel
   Admin (productos) o editando `IMAGENES_CATEGORIA` en
   `src/data/productos.js` (Hero) y `Historia.jsx`.

5. **Textos de ejemplo** — buscar `[Contenido de ejemplo` en:
   - `Historia.jsx`
   - `VisionMision.jsx`
   - `Ubicaciones.jsx`

6. **Datos de contacto restantes** — horarios en `Contacto.jsx` y
   `Ubicaciones.jsx`.

## Panel Admin (inventario)

Entra a `tusitio.com/#admin` (o toca "Panel Admin" al final del sitio) y
usa el PIN temporal:

```
sanbosco1980
```

**Cambia este PIN antes de compartir el acceso** — está escrito en
`src/components/AdminPanel.jsx` (constante `PIN_ADMIN`).

Desde ahí puedes:
- Editar nombre, categoría, presentación, precio y etiqueta de cada producto
- Cambiar la foto de un producto (sube una imagen desde el celular)
- Agregar productos nuevos
- Eliminar productos
- Restaurar el inventario de ejemplo si algo sale mal

### ⚠️ Limitación importante — sin base de datos

Este sitio **no tiene servidor ni base de datos**: es un sitio estático
(React + Vite) desplegado en Vercel. Por eso el Panel Admin guarda los
cambios en el **almacenamiento del navegador (localStorage)**, lo cual
significa:

- Los cambios que hagas desde el Panel Admin **solo se ven en el mismo
  navegador y dispositivo** donde los hiciste — un cliente que visite el
  sitio desde su celular NO verá los productos que agregaste desde el tuyo.
- Si se borra el historial/caché del navegador, se pierden los cambios.
- No hay manera de que dos personas administren el inventario "en vivo"
  desde dispositivos distintos.

**Esto sirve bien para:** probar cómo se vería el catálogo, ajustar precios
rápido desde el mismo teléfono/computadora que usas siempre, o hacer
pruebas antes de decidir el catálogo final.

**Si más adelante necesitas** que el inventario se actualice para todos los
visitantes desde cualquier dispositivo (lo normal para un negocio real),
hace falta agregar una base de datos real (por ejemplo Firebase o
Supabase) — es un cambio más grande que puedo ayudarte a hacer cuando
quieras dar ese paso.

## Recibo de compra

En el carrito hay un botón "🧾 Imprimir Recibo" que abre el diálogo de
impresión del navegador/celular con un recibo formateado (nombre del
negocio, fecha, productos, cantidades y total). Funciona con cualquier
impresora conectada al teléfono o computadora, o para guardar como PDF.

## Publicar

1. Subir esta carpeta a un repositorio de GitHub.
2. Conectar el repositorio en Vercel — detecta Vite automáticamente
   (build command: `vite build`, output: `dist`).
3. Cada `git commit` a la rama principal dispara un nuevo deploy.
