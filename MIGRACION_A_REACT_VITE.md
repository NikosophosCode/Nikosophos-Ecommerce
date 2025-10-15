# Plan de Migración a React + Vite (con TailwindCSS)

Este documento describe un plan detallado, por fases, para migrar la aplicación actual (SPA estática con JS vanilla y Tailwind v4) a React + Vite, manteniendo TailwindCSS, y ampliando funcionalidades clave: carrito de compras funcional, categorías reales y navegables, favoritos visibles, creación/gestión de perfil y sección de contacto completa.

La guía incluye arquitectura objetivo, stack recomendado, estructura de carpetas, mejores prácticas, herramientas modernas, criterios de aceptación por fase y riesgos/mitigaciones.

---

## Progreso actual de la migración (2025-10-14)

Estado general: se completó el scaffolding base en `web/` con React + Vite + TypeScript y Tailwind v4, y se implementó una Home mínima que lista productos desde la API usando TanStack Query.

- Hecho
  - Proyecto React + Vite creado en `web/` con TypeScript.
  - Tailwind v4 configurado con `@tailwindcss/vite` en `vite.config.ts`.
  - Estilos base migrados: gradient, `glass`, `shimmer`, utilidades comunes en `web/src/index.css`.
  - `main.tsx`: envuelto con `QueryClientProvider` (TanStack Query).
  - `App.tsx`: Home con grid de productos, tarjetas, skeletons, fallback de imágenes y manejo de error básico.
  - `package.json` de `web/` unificado y dependencias instaladas (React 19, Vite 7, Tailwind v4, TanStack Query).
  - Verificación local: `npm run dev` (en `web/`) y `npm run build` (Build PASS).

- Pendiente inmediato
  - Separar componentes (Header, ProductCard/Grid, Dialog) en `features/products/ui`.
  - Routing con React Router y estructura de páginas (Home, Categorías, Favoritos, Carrito, Perfil, Contacto).
  - Estado global con Zustand + `persist` para carrito y favoritos.
  - Toasts (sonner o react-hot-toast) y overlay accesible (Radix/Headless UI).

- Nota de ejecución
  - Ejecutar el dev server desde `web/`:
    - PowerShell: `cd web; npm run dev`
  - Evitar `npm run dev` en la raíz del proyecto clásico para no invocar el CLI de Tailwind de la app antigua por accidente.

Quality gates (web/)
- Build: PASS (vite build)
- Typecheck: PASS (tsc -b dentro de `npm run build`)
- Lint: No ejecutado aún (pendiente configuración/ejecución)
- Tests: No aplican todavía

Resumen por fases
- Fase 1 — Scaffolding y fundamentos: COMPLETADA (React+TS, Tailwind v4, Query provider). Router y Zustand se abordarán en Fases 3–4.
- Fase 2 — Home con paridad funcional: EN PROGRESO (Grid, tarjetas, skeletons, fetch hechos; pendientes Header/Filters/Search/Orden/Overlay/Toasts).
- Resto de fases: sin cambios (ver plan).

---

## 1) Resumen del estado actual

- Stack: HTML + Tailwind v4 (CLI) + JavaScript vanilla.
- Funcionalidades:
  - Catálogo desde Platzi Store API (`api.escuelajs.co`).
  - Búsqueda en vivo, filtros “todo/nuevo”, orden por precio.
  - Favoritos (en memoria), carrito (en memoria).
  - Overlay de detalle de producto, skeletons, toasts.
- Estructura simple (un archivo JS principal `src/index.js`).

Limitaciones: sin enrutamiento, sin persistencia, sin pruebas, sin autenticación, sin tipado, escalabilidad limitada para nuevas features.

---

## 2) Objetivo de la migración

- Migrar a React + Vite (TypeScript) manteniendo TailwindCSS.
- Introducir routing, estado global testable/persistente y capa de datos robusta.
- Preparar base para crecimiento: módulos, pruebas, CI/CD, performance, a11y.

Éxito = misma UX inicial (búsqueda, filtros, overlay, toasts) + nuevas secciones (categorías, favoritos, carrito, perfil, contacto) con código mantenible y escalable.

---

## 3) Stack recomendado (moderno y minimalista)

- Build: Vite
- UI: React 18+ con TypeScript
- Estilos: Tailwind CSS v4 con `@tailwindcss/vite` (o CLI como alternativa)
- Routing: React Router (data routers)
- Datos: TanStack Query (fetching, cache, prefetch) + fetch nativo
- Estado app (cart/favs/ui): Zustand + `persist`
- Formularios: React Hook Form + Zod (validación schema-first)
- Componentes accesibles: Radix UI Primitives (Dialog, Dropdown) o Headless UI
- Toasts: sonner o react-hot-toast
- Utilidades: class-variance-authority (CVA) opcional para variantes de componentes
- Tests: Vitest + Testing Library (unit/integration) + Playwright (E2E)
- Calidad: ESLint + Prettier + TypeScript strict, Husky + lint-staged
- PWA/Meta: `vite-plugin-pwa` (opcional), `react-helmet-async` para metas
- Persistencia/Autenticación (opcional en Fase Perfil): Supabase (Auth + DB) o Auth0 + API ligera (Cloudflare Workers/Vercel Functions)

Notas Tailwind v4:
- En v4 basta con `@import "tailwindcss";` en tu CSS fuente. Con Vite se recomienda `@tailwindcss/vite` para DX; si no, puedes seguir usando el CLI.

---

## 4) Arquitectura objetivo (alto nivel)

- Presentación (React + Tailwind): componentes desacoplados y reusables.
- Estado local/UI con hooks, global de dominio con Zustand (cart/favs/profile).
- Capa de datos: servicios `api/*` y hooks `useQuery`/`useMutation` para caché.
- Routing declarativo: Home, Categorías, Favoritos, Carrito, Perfil, Contacto.
- Accesibilidad: uso de componentes con ARIA correcta (Dialog, focus management).

---

## 5) Estructura de carpetas propuesta

```
/ (repo)
├─ web/                     # Nueva app React (convivir con app actual durante migración)
│  ├─ index.html
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ routes/        # React Router files
│  │  │  ├─ providers/     # QueryClientProvider, ThemeProvider, etc.
│  │  │  └─ store/         # Zustand stores (cart, favs, user)
│  │  ├─ components/       # UI building blocks (Card, Dialog, Toast, Header, ...)
│  │  ├─ features/         # Dominios: products, cart, categories, profile, contact
│  │  │  ├─ products/
│  │  │  │  ├─ api/        # fetchers + schemas
│  │  │  │  ├─ hooks/      # useProducts, useProduct(id), prefetchers
│  │  │  │  └─ ui/         # ProductCard, ProductGrid, ProductDialog
│  │  │  ├─ cart/
│  │  │  ├─ favorites/
│  │  │  ├─ categories/
│  │  │  ├─ profile/
│  │  │  └─ contact/
│  │  ├─ lib/               # utils, formatters, constants
│  │  ├─ styles/
│  │  │  └─ tailwind.css
│  │  ├─ main.tsx
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ package.json
│  └─ README.md
└─ (proyecto original)
```

---

## 6) Plan por fases (con criterios de aceptación)

### Fase 0 — Preparación del repositorio
- Crear rama: `feat/migracion-react-vite`.
- Añadir este documento y acordar el alcance.
- Decidir directorio `web/` para React, manteniendo la app actual operativa.

Criterios de aceptación
- Rama creada, plan aprobado. No se rompe la app actual.

---

### Fase 1 — Scaffolding y fundamentos
- Inicializar Vite con React + TypeScript dentro de `web/`.
- Instalar Tailwind v4 y `@tailwindcss/vite`. Crear `src/styles/tailwind.css` con `@import "tailwindcss";`.
- Configurar ESLint + Prettier + TypeScript strict.
- Base providers: `QueryClientProvider`, `Zustand` stores (cart/favs vacíos), `RouterProvider`.

Estado: COMPLETADA.

Criterios de aceptación
- `npm run dev` levanta React con Tailwind aplicado. (verificado en `web/`)
- Typecheck PASS (via `npm run build`). Lint pendiente configurar/ejecutar.

---

### Fase 2 — Portar Home (listado) con paridad funcional
- Componentizar: Header, Filters, SearchBar, ProductCard, ProductGrid, Toasts, Footer, ProductDialog (Dialog accesible via Radix/Headless UI).
- Replicar estilos: glass, shimmer, utilidades.
- Capa de datos productos (lista y detalle): hooks con TanStack Query.
- Re-implementar búsqueda/orden/skeletons/overlay como en app actual.

Estado: EN PROGRESO.

Completado
- ProductGrid y ProductCard básicos.
- Skeletons de carga y estilos `glass`/`shimmer`.
- Fetch de productos con TanStack Query y manejo de error inicial.

Pendiente
- Header + SearchBar + filtros y orden.
- Overlay accesible (Dialog) y toasts.

Criterios de aceptación (sin cambios)
- Home muestra productos, búsqueda y orden funcionan.
- Overlay accesible (Escape, foco, click outside) y toasts operativos.

---

### Fase 3 — Estado global: Carrito y Favoritos (persistentes)
- Crear `cartStore` y `favoritesStore` con Zustand + `persist` (localStorage).
- Badges en Header sincronizados con stores.
- Añadir/Quitar/Modificar cantidades en carrito; toggle favoritos en card y dialog.
- Formateo moneda con Intl (configurable).

Criterios de aceptación
- Estado persiste entre recargas.
- Acciones desde grid y overlay actualizan UI y badges.

---

### Fase 4 — Routing: categorías reales y navegación
- React Router con rutas: `/`, `/category/:slug`, `/favorites`, `/cart`, `/profile`, `/contact`.
- Obtener categorías reales de la API y renderizar menú/lista navegable.
- Implementar `/category/:slug` con filtros por slug y URL source of truth.
- Preservar query de búsqueda en URL (search params) para deep links.

Criterios de aceptación
- Navegación por categorías cambia resultados y URL.
- Refresco mantiene estado de la vista (query/sort/categoría).

---

### Fase 5 — Página de Favoritos
- Vista `/favorites` que lista productos marcados.
- Permitir quitar desde la lista y añadir al carrito.

Criterios de aceptación
- Sin favoritos: estado vacío agradable.
- Acciones actualizan stores y UI de forma consistente.

---

### Fase 6 — Carrito funcional
- Vista `/cart` con tabla de items, control de cantidad, subtotal y total.
- Botón “Vaciar carrito” y “Continuar compra” (stub de checkout).
- Derivados memorizados (selectores) para rendimiento.

Criterios de aceptación
- Cambios de cantidad recalculan totales en tiempo real.
- Persistencia y consistencia entre páginas.

---

### Fase 7 — Perfil: autenticación y gestión básica
- Elegir solución:
  - Opción A (rápida): Supabase Auth + DB (perfil, favoritos y carrito por usuario).
  - Opción B: Auth0 + API propia (Workers/Functions) + DB.
- Flujo: registro, login, logout. Página `/profile` para editar nombre, avatar y preferencias.
- Sincronizar favorites/cart entre “guest” y “logged-in”.

Criterios de aceptación
- Auth segura (tokens en `sessionStorage`/`httpOnly` según implementación del backend).
- Perfil editable y persistido. Rehidratación de stores al iniciar sesión.

---

### Fase 8 — Contacto: formulario completo
- Página `/contact` con React Hook Form + Zod.
- Validaciones: email, asunto, mensaje (largo mínimo), consentimiento.
- Integración:
  - Opción sin backend: Formspree/Web3Forms/Resend (API key) o Netlify Forms.
  - Opción con backend: endpoint serverless en Vercel/Workers.
- Mensajes de éxito/error con toasts y `aria-live`.

Criterios de aceptación
- Validaciones en cliente + manejo de error de red.
- Entrega verificada (o logs verificados en función serverless).

---

### Fase 9 — Rendimiento, accesibilidad y UX avanzada
- Code splitting y lazy routes (React.lazy/Suspense). Prefetch de datos con TanStack Query al hacer hover.
- Virtualización del grid si crece (TanStack Virtual).
- Imágenes: `loading="lazy"`, `decoding="async"`, tamaños responsivos.
- Lighthouse/aXe: objetivo 90+ en Performance, A11y, Best Practices.
- PWA opcional (offline básico de assets y caché de peticiones GET).

Criterios de aceptación
- Reporte Lighthouse > 90 en desktop y móvil.
- Mediciones antes/después documentadas.

---

### Fase 10 — Calidad, tests y CI/CD
- Unit/Integration: Vitest + Testing Library (componentes clave, stores y utils).
- E2E: Playwright (flujos: búsqueda, favorito, carrito, checkout stub, login).
- GitHub Actions: lint + typecheck + test + build en PRs, previsualizaciones (Vercel/Netlify).
- Convenciones: Conventional Commits, PR checklist.

Criterios de aceptación
- CI en verde, cobertura mínima acordada (p.ej., 70%).
- Previews automáticas por PR.

---

## 7) Roadmap de ampliación de funcionalidades (resumen)

Funcionalidad | Fase | Puntos clave | Aceptación
--- | --- | --- | ---
Carrito (completo) | 3 y 6 | Zustand persist, cantidades, totales, vaciar | Totales correctos, persistencia estable
Categorías reales | 4 | `/categories` + slug navegable | URL refleja estado, deep link OK
Favoritos visibles | 5 | Vista dedicada, acciones | Persistencia + acciones consistentes
Perfil (auth) | 7 | Supabase/Auth0 + sincronización | Login/logout, perfil editable
Contacto completo | 8 | RHF + Zod + envío | Validación + entrega verificada

---

## 8) Contratos y tipos (TypeScript sugerido)

- Product: id, title, description, price, category: { id, name, slug }, images: string[]
- Category: id, name, slug
- CartItem: productId, qty
- UserProfile: id, name, email, avatarUrl

Errores comunes y manejo
- Red: timeouts/5xx → retry/backoff (TanStack Query), toasts de error.
- Imágenes rotas → `pickSafeImage` + fallback.
- Auth expirada → redirección a login y rehidratación segura.

---

## 9) Detalles de implementación por módulos

- Products
  - `useProductsList(params)` con `queryKey` estable (offset/limit/q/sort/category).
  - `useProduct(id)` para detalle + `prefetchQuery` en hover/focus.
  - Componente `ProductDialog` con Radix Dialog (a11y, focus trap, escape close).
- Cart
  - Store con `items: Record<productId, qty>`, selectores `totalCount`, `totalPrice`.
  - Sincronización a perfil (si logueado) vía mutation en background.
- Favorites
  - Store `Set<number>` persistido. Vistas derivadas por `useProducts` + set.
- Categories
  - `useCategories()` + rutas `/category/:slug`. Búsqueda en URL como `?q=...&sort=...`.
- Profile
  - Auth provider (Supabase/Auth0). Guarded routes. Página de edición con RHF + Zod.
- Contact
  - RHF + Zod, envío por fetch a endpoint o servicio third-party, `aria-live` y toasts.

---

## 10) Herramientas y utilidades recomendadas

- `@tailwindcss/vite` para DX sin proceso de build extra.
- `zod` + `@hookform/resolvers`
- `zustand` + `zustand/middleware` (persist, devtools en dev)
- `@tanstack/react-query`
- `radix-ui/react-dialog` (o `@headlessui/react`)
- `sonner` o `react-hot-toast`
- `vite-plugin-pwa` (opcional)
- `@testing-library/react`, `vitest`, `playwright`
- `eslint` (airbnb/base o standard + react + ts), `prettier`

---

## 11) Guía de ejecución (alta nivel)

- Desarrollo (PowerShell):
  - Trabajar en `web/` mientras se mantiene la app actual en paralelo.
  - Ejecutar siempre los comandos desde `web/`:
    - `cd web; npm run dev`
  - Para build de producción en la app React:
    - `cd web; npm run build`
- Producción:
  - `npm run build` en `web/` produce `dist/`. Deploy en Vercel/Netlify/GitHub Pages.

Nota: Cuando la nueva app alcance paridad, mover raíz del repo si se desea, y archivar la app antigua.

---

## 12) Riesgos y mitigaciones

- Desalineación visual: encapsular estilos y portar utilidades (glass, shimmer) 1:1 primero.
- Cambios de API externos: tipar respuestas con Zod para fail-fast y adaptar mappers.
- Estado duplicado durante migración: aislar stores en app nueva y usar rutas separadas.
- Auth compleja: iniciar con flujo guest y añadir auth en Fase 7.

---

## 13) Métricas y calidad

- Quality gates por fase: Lint PASS, Typecheck PASS, Tests PASS, Build PASS.
- Lighthouse objetivo > 90 (P9). Reportes guardados en `docs/reports/`.
- Cobertura mínima 70% (flexible por módulo).

---

## 14) Cronograma sugerido (orientativo)

- F0–F1: 1–2 días
- F2: 2–4 días
- F3–F4: 2–3 días
- F5–F6: 2–3 días
- F7–F8: 3–6 días (depende de auth/back)
- F9–F10: 3–5 días

---

## 15) Siguientes pasos inmediatos

1. Crear estructura de features y UI: `features/products/{api,hooks,ui}` y separar `ProductCard`, `ProductGrid`, `ProductDialog`.
2. Integrar React Router con rutas: `/`, `/category/:slug`, `/favorites`, `/cart`, `/profile`, `/contact` (Fase 4).
3. Añadir Zustand + `persist` para carrito y favoritos; badges en Header (Fase 3).
4. Implementar Header con SearchBar y filtros/orden sincronizados con URL (query params).
5. Añadir toasts (sonner o react-hot-toast) y overlay accesible con Radix/Headless UI.

---

Actualizado: 2025-10-14
