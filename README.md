# Carnicería San Bosco — Sitio Web

Sitio hecho con **React 19 + Vite**, con la identidad de marca de San Bosco
(negro #1D1D1C, terracota #CA4F16, tipografías Bebas Neue + Nunito).

## Antes de publicar, reemplazar:

1. **Número de WhatsApp** — buscar `50600000000` en:
   - `src/components/Header.jsx`
   - `src/components/Contacto.jsx`
   - `src/components/CartDrawer.jsx`

2. **Productos y precios reales** — editar `src/data/productos.js`.

3. **Fotos** — los recuadros con borde punteado ("Foto del local", "Foto")
   son marcadores de posición. Colocar imágenes reales en `public/` y
   referenciarlas en los componentes (`Hero.jsx`, `Historia.jsx`,
   `Productos.jsx`).

4. **Textos de ejemplo** — buscar `[Contenido de ejemplo` en:
   - `Historia.jsx`
   - `VisionMision.jsx`
   - `Ubicaciones.jsx`
   - `Contacto.jsx`

5. **Datos de contacto** — teléfono y correo en `Contacto.jsx` y horarios en
   `Ubicaciones.jsx`.

## Publicar

1. Subir esta carpeta a un repositorio de GitHub.
2. Conectar el repositorio en Vercel — detecta Vite automáticamente
   (build command: `vite build`, output: `dist`).
3. Cada `git commit` a la rama principal dispara un nuevo deploy.
