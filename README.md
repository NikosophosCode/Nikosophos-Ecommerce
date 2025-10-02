# Nikosophos Store

Aplicación web estática (sin framework) que muestra un catálogo de productos consumidos desde la API pública de Platzi Store (`api.escuelajs.co`). Usa Tailwind CSS v4 (CLI) y JavaScript vanilla para: filtrado, ordenamiento, favoritos, carrito (en memoria), búsqueda en vivo, overlays de producto y toasts.

## Tabla de Contenidos
- [Demo Local](#demo-local)
- [Características](#características)
- [Arquitectura y Flujo](#arquitectura-y-flujo)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Dependencias](#dependencias)
- [Scripts NPM](#scripts-npm)
- [HTML / Accesibilidad](#html--accesibilidad)
- [CSS / Tailwind](#css--tailwind)
- [JavaScript (Estado y Módulos Lógicos)](#javascript-estado-y-módulos-lógicos)
- [Manejo de Datos / API](#manejo-de-datos--api)
- [Gestión de UI Dinámica](#gestión-de-ui-dinámica)
- [Rendimiento](#rendimiento)
- [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)
- [Posibles Mejoras Futuras](#posibles-mejoras-futuras)
- [Guía de Contribución](#guía-de-contribución)
- [Licencia](#licencia)

## Demo Local
```bash
git clone <repo-url>
cd practica
npm install
npm run dev
# Abre index.html con Live Server o un server estático
```
El CSS compilado se genera en `src/styles.css` (ignorado por Git, ver [.gitignore](.gitignore)).

## Características
- Catálogo dinámico con datos remotos (fetch).
- Búsqueda en vivo (input desktop + mobile).
- Filtros por categoría (placeholder lógico, actualmente “all” / “nuevo”).
- Ordenamiento por precio (asc / desc).
- Carrito (conteo en badge, estado en memoria).
- Favoritos (persistidos en la sesión mientras dure la recarga).
- Overlay de detalle de producto (fetch puntual si no está en cache inicial).
- Skeleton loading (mejora percepción de velocidad).
- Toasts ligeros para feedback.
- Modo responsive + estilos “glass” + animaciones suaves.
- Accesibilidad básica: roles, aria-label, focus management en overlay, escape close.

## Arquitectura y Flujo
1. Al cargar el documento (`DOMContentLoaded`) se invoca `init()` en [`src/index.js`](src/index.js).
2. `init()`:
   - Renderiza skeletons (`renderSkeletons`).
   - Enlaza eventos de cabecera y footer (`wireHeader`, `wireFooter`).
   - Hace fetch de productos (`fetchData`).
   - Actualiza `state.products`, aplica filtros (`applyFilters`) y renderiza (`render`).
3. Las interacciones del grid delegan en un solo listener (`onGridClick`):
   - Botón “Añadir al carrito” → incrementa `Map cart`.
   - Botón “Favorito” → toggle en `Set favs`.
   - Click fuera de botón sobre tarjeta → abre overlay (`openProductOverlay`).
4. Overlay permite añadir al carrito / favorito y cierra con click backdrop o Escape.

## Estructura de Carpetas
```
.
├── index.html
├── package.json
├── .gitignore
├── .vscode/
│   └── settings.json
├── assets/
│   ├── icons/        # (vacío o para futuros íconos)
│   └── img/          # (reservado para imágenes locales)
└── src/
    ├── tailwind.css  # Fuente Tailwind + capas personalizadas
    ├── styles.css    # (generado) salida del build
    └── index.js      # Lógica principal
```

## Dependencias
Declaradas en [package.json](package.json):
- `tailwindcss` y `@tailwindcss/cli` (v4.*).  
No se usan frameworks JS: enfoque minimalista.

## Scripts NPM
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Compila Tailwind en watch: lee `src/tailwind.css` → genera `src/styles.css`. |
| `npm run build` | Compila y minifica Tailwind para producción. |

## HTML / Accesibilidad
Archivo principal: [index.html](index.html)
- Semántica: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<template>`.
- Overlay: `role="dialog"`, `aria-modal="true"`, focus retorna al previo al cerrar.
- Botones con `aria-label` en íconos (menu, favoritos, carrito, social).
- Mejora posible: ciclo de foco (focus trap) dentro del overlay.

## CSS / Tailwind
Fuente: [src/tailwind.css](src/tailwind.css)
- Import global: `@import "tailwindcss";`
- Capas personalizadas `@layer base` y `@layer utilities`.
- Variables CSS para glass: `--glass-bg`, `--glass-brd`.
- Utilidades personalizadas:
  - `.glass` (backdrop blur + transparencia)
  - `.shimmer` + `@keyframes shimmer`
  - `.text-balance` (usa `text-wrap: balance`)
  - `.tap-highlight-none` (mejor UX móvil)

Generado: `src/styles.css` (no se versiona para evitar ruido de build).

## JavaScript (Estado y Módulos Lógicos)
Archivo: [src/index.js](src/index.js)

Estado central:
```js
const state = {
  products: [],
  filtered: [],
  cart: new Map(),
  favs: new Set(),
  query: '',
  category: 'all',
  sort: 'default'
};
```

Funciones clave (todas en el mismo módulo):
- [`fetchData`](src/index.js): obtiene listado inicial (manejo de error con toast).
- [`pickSafeImage`](src/index.js): evita imágenes rotas / dominios no confiables.
- [`renderSkeletons`](src/index.js): placeholders mientras se hace fetch.
- [`card`](src/index.js): genera HTML de cada producto (template string).
- [`openProductOverlay`](src/index.js): carga y muestra detalle (with a11y improvements).
- [`applyFilters`](src/index.js): aplica búsqueda, categoría, ordenamiento.
- [`render`](src/index.js): pinta grid según `state.filtered`.
- [`updateBadges`](src/index.js): actualiza contadores de carrito y favoritos.
- [`wireHeader`](src/index.js), [`wireFooter`](src/index.js): listeners y UI wiring.
- [`toast`](src/index.js): feedback temporal.

Formato moneda: `Intl.NumberFormat` (configurable vía `LOCALE` y `CURRENCY`).

## Manejo de Datos / API
- Endpoint listado: `GET https://api.escuelajs.co/api/v1/products?offset=0&limit=44`
- Detalle puntual: `GET https://api.escuelajs.co/api/v1/products/:id`
- No hay persistencia local (ni localStorage) por decisión de simplicidad (puede añadirse).

## Gestión de UI Dinámica
Patrones usados:
- Delegación de eventos en el grid (`onGridClick`) reduce listeners.
- Reemplazo completo de tarjetas al togglear favorito (simplicidad sobre diff).
- Overlay clonado desde `<template>` para mantener HTML limpio.
- Badges se ocultan añadiendo clase `hidden` si el conteo es 0 (menor ruido visual).

## Rendimiento
Optimización ligera:
- Skeletons mejoran percepción (no bloquea).
- `requestAnimationFrame` usado al abrir overlay / menú para transiciones.
- Imágenes con `loading="lazy"`.
- Re-render controlado (solo cuando cambian filtros).
- Plantillas string sin frameworks (menor overhead inicial).

Potenciales mejoras:
- Virtualización si aumenta el volumen de productos.
- Cache de responses (Map) para llamadas de detalle.
- Persistir favoritos/carrito en `localStorage`.

## Buenas Prácticas Implementadas
- Código autodescriptivo con nombres cortos pero claros (`applyFilters`, `updateBadges`).
- Manejo de errores en fetch con fallback UI (`toast` de error).
- Separación visual / lógica (Tailwind + JS modular dentro de un solo archivo).
- Accesibilidad mínima (aria-labels, manejo de foco parcial).
- Evita inline styles salvo fallback en transiciones.
- Evita side-effects globales innecesarios (todo arranca en `DOMContentLoaded`).

## Posibles Mejoras Futuras
Categoría | Idea
--------- | ----
Persistencia | Guardar favoritos y carrito en `localStorage`.
Rendimiento | Pre-carga condicional de imágenes en viewport (IntersectionObserver).
Accesibilidad | Focus trap completo en overlay, aria-live para toasts.
Arquitectura | Separar estado y vista en módulos (store.js / ui.js).
Testing | Añadir pruebas con Vitest / Jest para helpers (`pickSafeImage`, form validation).
UX | Paginación o “infinite scroll”.
i18n | Sistema de traducciones (es/en) abstraído.
SEO | Etiquetas meta extendidas, JSON-LD para productos.
Seguridad | Sanitizar entradas de usuario (búsqueda) aunque riesgo actual es bajo.
CI/CD | Workflow GitHub Actions (lint + build).
Design System | Documentar utilidades y tokens (glass, spacing, color roles).

## Guía de Contribución
1. Haz fork y crea rama: `feat/nueva-funcionalidad`.
2. Instala dependencias y corre `npm run dev`.
3. Asegura consistencia visual (usa utilidades Tailwind existentes).
4. No commitees `src/styles.css`.
5. Abre PR con descripción clara (qué, por qué, cómo).

## Licencia
MIT (ajustar si es necesario).

---

Hecho con Tailwind CSS y JavaScript Vanilla.