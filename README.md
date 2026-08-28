# Carnicería San Bosco — Sitio Web

Sitio hecho con **React 19 + Vite**, con la identidad de marca de San Bosco
(negro #1D1D1C, terracota #CA4F16, tipografías Bebas Neue + Nunito).

## Antes de publicar, reemplazar:

1. **Número de WhatsApp** — ya configurado: +506 6302-4507.

2. **Facebook** — ya enlazado en Footer y Contacto.

3. **Productos y precios reales** — editar `src/data/productos.js`.

4. **Fotos** — actualmente se usan fotos genéricas de banco libre (Unsplash)
   en Hero, Historia y las tarjetas de producto. Reemplazar por fotos reales
   del local y los cortes en cuanto estén disponibles: las URLs están en
   `IMAGENES_CATEGORIA` (`src/data/productos.js`) y en `Historia.jsx`.

5. **Textos de ejemplo** — buscar `[Contenido de ejemplo` en:
   - `Historia.jsx`
   - `VisionMision.jsx`
   - `Ubicaciones.jsx`
   - `Contacto.jsx`

6. **Datos de contacto restantes** — correo y horarios en `Contacto.jsx` y
   `Ubicaciones.jsx`.

## Publicar

1. Subir esta carpeta a un repositorio de GitHub.
2. Conectar el repositorio en Vercel — detecta Vite automáticamente
   (build command: `vite build`, output: `dist`).
3. Cada `git commit` a la rama principal dispara un nuevo deploy.
