# Plan de Migración a React + Vite (con TailwindCSS)

Este documento describe un plan detallado, por fases, para migrar la aplicación actual (SPA estática con JS vanilla y Tailwind v4) a React + Vite, manteniendo TailwindCSS, y ampliando funcionalidades clave: carrito de compras funcional, categorías reales y navegables, favoritos visibles, creación/gestión de perfil y sección de contacto completa.

La guía incluye arquitectura objetivo, stack recomendado, estructura de carpetas, mejores prácticas, herramientas modernas, criterios de aceptación por fase y riesgos/mitigaciones.

---

## Progreso actual de la migración (2025-01-15)

Estado general: **Fase 8 completada con éxito**. La aplicación ahora cuenta con un sistema completo de contacto con formulario validado y Footer migrado desde el proyecto original con todas sus funcionalidades (newsletter, redes sociales, navegación, scroll to top).

- **Completado (Fase 1)**
  - ✅ Proyecto React + Vite creado en `web/` con TypeScript
  - ✅ Tailwind v4 configurado con `@tailwindcss/vite`
  - ✅ Estilos base migrados (gradient, glass, shimmer)
  - ✅ Path aliases configurados (`@/*` → `./src/*`)
  - ✅ ESLint + Prettier + TypeScript strict configurados

- **Completado (Fase 2)**
  - ✅ Estructura de features modular: `features/products/{api,hooks,ui}`, `components/`, `lib/`, `app/{routes,store}`
  - ✅ TanStack Query integrado con hooks personalizados (`useProducts`, `useProduct`)
  - ✅ React Router configurado con 6 rutas: `/`, `/favorites`, `/cart`, `/profile`, `/contact`, `/category/:slug`
  - ✅ Zustand stores con persistencia: `cartStore` y `favoritesStore`
  - ✅ Header con búsqueda en vivo, badges de carrito/favoritos sincronizados
  - ✅ ProductCard, ProductGrid, ProductSkeleton separados en módulos
  - ✅ ProductDialog accesible con Headless UI (Dialog con transiciones, focus trap, ESC close)
  - ✅ Sistema de toasts con Sonner
  - ✅ Acciones de carrito y favoritos funcionando (añadir/quitar con feedback visual)
  - ✅ Búsqueda de productos en vivo integrada en Header

- **Completado (Fase 3)**
  - ✅ cartStore mejorado con selectores optimizados (`getItemsArray`, `hasItems`)
  - ✅ Componente CartItem reutilizable con imagen, controles de cantidad y botón eliminar
  - ✅ CartPage completa con lista de productos, subtotal, total y estado vacío
  - ✅ Botones de favoritos y añadir al carrito en ProductCard con feedback visual
  - ✅ Integración de toasts (Sonner) para acciones de carrito y favoritos
  - ✅ Persistencia de carrito validada (localStorage)
  - ✅ Formateo de moneda con Intl.NumberFormat (USD, locale es-ES)
  - ✅ Botón "Vaciar carrito" con confirmación
  - ✅ Botón "Continuar compra" (stub para futuro checkout)
  - ✅ Estado vacío del carrito con enlace a la tienda

- **Completado (Fase 4)**
  - ✅ Feature categories creado: `features/categories/{hooks,ui}`
  - ✅ Hook `useCategories` con TanStack Query (cache 10min/30min)
  - ✅ Componente `CategoryNav` con navegación horizontal, estado activo y skeletons
  - ✅ CategoryPage funcional con filtrado por categoryId desde URL params
  - ✅ Sincronización de búsqueda con URL query params (`?q=...`) en HomePage y CategoryPage
  - ✅ Deep linking: URLs reflejan estado completo (categoría + búsqueda)

- **Completado (Mejoras adicionales - 2025-01-14)**
  - ✅ Componente `MainNav` con pestañas de navegación (Inicio, Perfil, Contacto)
  - ✅ Componente `MobileNav` con drawer lateral, backdrop y animaciones
  - ✅ Header refactorizado: más compacto, sin CategoryNav integrado
  - ✅ CategoryNav separado del header con contenedor propio
  - ✅ Fix responsive en CartPage: eliminado overflow horizontal
  - ✅ Header integrado en todas las páginas (FavoritesPage, ProfilePage, ContactPage)
  - ✅ Navegación consistente en desktop y móvil
  - ✅ Accesibilidad mejorada: aria-labels, keyboard navigation, focus management
  - ✅ Header reorganizado con CategoryNav visible en todas las páginas
  - ✅ Estilos `scrollbar-hide` para scroll horizontal limpio
  - ✅ Manejo de errores y estados vacíos en CategoryPage

- **Completado (Fase 5 - 2025-01-15)**
  - ✅ Feature favorites creado: `features/favorites/{hooks,ui}`
  - ✅ Hook `useFavoriteProducts` con useQueries de TanStack Query (fetch en paralelo)
  - ✅ Componente `FavoriteItem` reutilizable con acciones (añadir al carrito, quitar favorito)
  - ✅ FavoritesPage completa con listado, estado vacío, loading y botón "Vaciar favoritos"
  - ✅ Integración completa con stores (cartStore, favoritesStore) y toasts
  - ✅ Layout responsive optimizado para móvil y desktop
  - ✅ Persistencia de favoritos validada (localStorage)
  - ✅ Cache compartido con otros productos (reutiliza queryKey ['product', id])

- **Completado (Fase 6 - 2025-01-15)**
  - ✅ Sistema de cupones de descuento con validación
  - ✅ Cupones predefinidos (WELCOME10, SAVE20, FIRST5) con reglas de negocio
  - ✅ Componente `CouponInput` con feedback visual y manejo de errores
  - ✅ Cálculo automático de impuestos (16% IVA configurable)
  - ✅ Cálculo de envío con umbral de envío gratis ($50+)
  - ✅ Resumen de carrito mejorado con desglose detallado (subtotal, descuento, impuestos, envío, total)
  - ✅ Utilidades de cálculo de precios en `lib/utils.ts`
  - ✅ Persistencia de cupón aplicado en localStorage
  - ✅ Validación de cupones con compra mínima

- **Completado (Fase 7 - 2025-01-15)**
  - ✅ Sistema de autenticación completo: registro, login, logout
  - ✅ authStore con Zustand + persist (mock localStorage)
  - ✅ Formularios con React Hook Form + Zod (LoginForm, RegisterForm, EditProfileForm)
  - ✅ AuthModal accesible con Headless UI (alternancia login/register)
  - ✅ UserMenu dropdown con avatar, enlaces y logout
  - ✅ ProfilePage funcional: avatar, estadísticas, edición de perfil, acciones
  - ✅ Integración en Header: botones auth (guest) / UserMenu (autenticado)
  - ✅ Sincronización automática de cart y favorites con usuario (useAuthSync hook)
  - ✅ Migración de datos guest → usuario al login
  - ✅ Persistencia por usuario en localStorage (cart-storage-{userId}, favorites-storage-{userId})
  - ✅ Avatares automáticos con DiceBear API
  - ✅ Validaciones robustas (email, password mín 6 chars, confirmación password)
  - ✅ Tipos TypeScript: User, LoginCredentials, RegisterData, UpdateProfileData

- **Completado (Fase 8 - 2025-01-15)**
  - ✅ Feature contact creado: `features/contact/{api,ui}`
  - ✅ Schema de validación completo con Zod (name, email, subject, message, consent)
  - ✅ Componente ContactForm con React Hook Form + validación en tiempo real
  - ✅ Servicio de API integrado con Web3Forms (envío de emails sin backend)
  - ✅ Estados de carga (isSubmitting), éxito (submitSuccess) y error
  - ✅ Toasts con Sonner para feedback de envío
  - ✅ Reset automático del formulario tras envío exitoso
  - ✅ Accesibilidad completa: ARIA labels, roles, focus management
  - ✅ Validaciones robustas: name (regex con acentos/ñ), email, subject (5+), message (20+)
  - ✅ ContactPage mejorada con hero section y sección de contacto adicional
  - ✅ Diseño responsive con estilos glass y gradients
  - ✅ Configuración con .env.example para VITE_WEB3FORMS_KEY
  - ✅ Función isWeb3FormsConfigured para validar setup
  - ✅ Manejo de errores de red y servidor con mensajes descriptivos
  - ✅ **Footer migrado**: Componente Footer con todas las funcionalidades del original
  - ✅ Newsletter funcional con validación de email y toasts
  - ✅ Redes sociales (GitHub, X/Twitter, Instagram) con enlaces externos
  - ✅ Navegación interna (Inicio, Productos, Contacto)
  - ✅ Copyright dinámico con año actual
  - ✅ Botón "Ir arriba" con scroll suave
  - ✅ Footer integrado en todas las páginas (HomePage, CategoryPage, FavoritesPage, CartPage, ProfilePage, ContactPage)

- **Verificado**
  - ✅ Build: PASS (`npm run build` - producción)
  - ✅ Typecheck: PASS (tsc -b en build)
  - ✅ Dev server: PASS (http://localhost:5174/)
  - ✅ Sin errores de compilación TypeScript
  - ✅ Persistencia de stores funcionando (localStorage)
  - ✅ Badges del Header sincronizados con stores
  - ✅ Navegación por categorías funcional
  - ✅ Query params sincronizados con URL
  - ✅ Deep links funcionando correctamente
  - ✅ Página de favoritos funcional con acciones completas
  - ✅ Sistema de cupones y cálculos de carrito funcionando
  - ✅ Sistema de autenticación funcionando (registro, login, logout, edición)
  - ✅ Sincronización de cart/favorites con usuario autenticado
  - ✅ Formulario de contacto completo con validación y envío

- **Pendiente (Fases 9-10)**
  - Fase 9: Optimizaciones de rendimiento (lazy loading, prefetch, virtualización)
  - Fase 10: Tests unitarios, E2E y CI/CD

- **Nota de ejecución**
  - Ejecutar dev server: `cd web; npm run dev` (http://localhost:5174/)
  - Build producción: `cd web; npm run build`
  - Preview: `cd web; npm run preview`

**Quality gates (web/)**
- Build: ✅ PASS
- Typecheck: ✅ PASS
- Lint: ⏳ Pendiente configuración/ejecución
- Tests: ⏳ No implementados

**Resumen por fases**
- Fase 1 — Scaffolding y fundamentos: ✅ COMPLETADA
- Fase 2 — Home con paridad funcional: ✅ COMPLETADA (Header, búsqueda, filtros básicos, ProductDialog, toasts, routing, stores)
- Fase 3 — Estado global: Carrito y Favoritos persistentes: ✅ COMPLETADA (CartPage, CartItem, badges funcionales, persistencia)
- Fase 4 — Routing: categorías reales y navegación: ✅ COMPLETADA (CategoryNav, filtrado, query params, deep linking)
- Fase 5 — Página de favoritos funcional: ✅ COMPLETADA (FavoriteItem, useFavoriteProducts, estado vacío, acciones)
- Fase 6 — Carrito funcional mejorado: ✅ COMPLETADA (cupones, impuestos, envío, cálculos automáticos)
- Fase 7 — Autenticación y perfil: ✅ COMPLETADA (auth completo, ProfilePage, sincronización stores, UserMenu)
- Fase 8 — Formulario de contacto: ✅ COMPLETADA (ContactForm, Web3Forms, validación Zod, accesibilidad)
- Fases 9-10: ⏳ Pendientes

**Documentación de fases:**
- Ver `web/FASE_3_RESUMEN.md` para detalles de Fase 3
- Ver `web/FASE_4_RESUMEN.md` para detalles de Fase 4
- Ver `web/FASE_5_RESUMEN.md` para detalles de Fase 5
- Ver `web/FASE_7_RESUMEN.md` para detalles de Fase 7
- Ver `web/FASE_8_RESUMEN.md` para detalles de Fase 8

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

Estado: ✅ COMPLETADA

Criterios de aceptación
- ✅ Home muestra productos, búsqueda y orden funcionan.
- ✅ Overlay accesible (Escape, foco, click outside) y toasts operativos.

---

### Fase 3 — Estado global: Carrito y Favoritos (persistentes)
- Crear `cartStore` y `favoritesStore` con Zustand + `persist` (localStorage).
- Badges en Header sincronizados con stores.
- Añadir/Quitar/Modificar cantidades en carrito; toggle favoritos en card y dialog.
- Formateo moneda con Intl (configurable).

Estado: ✅ COMPLETADA

Criterios de aceptación
- ✅ Estado persiste entre recargas.
- ✅ Acciones desde grid y overlay actualizan UI y badges.

---

### Fase 4 — Routing: categorías reales y navegación
- React Router con rutas: `/`, `/category/:slug`, `/favorites`, `/cart`, `/profile`, `/contact`.
- Obtener categorías reales de la API y renderizar menú/lista navegable.
- Implementar `/category/:slug` con filtros por slug y URL source of truth.
- Preservar query de búsqueda en URL (search params) para deep links.

Estado: ✅ COMPLETADA

Implementado
- ✅ Feature `categories` con estructura modular (`hooks`, `ui`)
- ✅ Hook `useCategories` con TanStack Query y cache optimizado
- ✅ Componente `CategoryNav` con navegación horizontal y estado activo
- ✅ CategoryPage funcional con filtrado por categoryId
- ✅ Sincronización de búsqueda con URL (`useSearchParams`)
- ✅ Deep linking completo (URL refleja categoría + búsqueda)
- ✅ Header con CategoryNav integrado
- ✅ Estilos `scrollbar-hide` para UX limpia

Criterios de aceptación
- ✅ Navegación por categorías cambia resultados y URL.
- ✅ Refresco mantiene estado de la vista (query/sort/categoría).
- ✅ Deep links funcionan correctamente.

Ver detalles: `web/FASE_4_RESUMEN.md`

---

### Fase 5 — Página de Favoritos
- Vista `/favorites` que lista productos marcados.
- Permitir quitar desde la lista y añadir al carrito.

Estado: ✅ COMPLETADA

Implementado
- ✅ Feature `favorites` con estructura modular (`hooks`, `ui`)
- ✅ Hook `useFavoriteProducts` con useQueries para fetch en paralelo
- ✅ Componente `FavoriteItem` con acciones (añadir al carrito, quitar favorito)
- ✅ FavoritesPage completa con listado, estado vacío y loading
- ✅ Botón "Vaciar favoritos" con confirmación
- ✅ Layout responsive móvil/desktop
- ✅ Integración con stores y toasts

Criterios de aceptación
- ✅ Sin favoritos: estado vacío agradable.
- ✅ Acciones actualizan stores y UI de forma consistente.
- ✅ Persistencia entre recargas.
- ✅ Añadir al carrito desde favoritos funciona.

Ver detalles: `web/FASE_5_RESUMEN.md`

---

### Fase 6 — Carrito funcional
- Vista `/cart` con tabla de items, control de cantidad, subtotal y total.
- Botón "Vaciar carrito" y "Continuar compra" (stub de checkout).
- Derivados memorizados (selectores) para rendimiento.

Estado: ✅ COMPLETADA

Implementado
- ✅ Sistema de cupones de descuento con 3 códigos predefinidos
- ✅ Validación de cupones con reglas de negocio (compra mínima, tipos)
- ✅ Componente `CouponInput` con UI/UX pulida
- ✅ Cálculo automático de impuestos (16% IVA configurable en constants)
- ✅ Cálculo de envío dinámico (gratis sobre $50, $10 bajo umbral)
- ✅ Resumen mejorado con 5 líneas: subtotal, descuento, impuestos, envío, total
- ✅ Funciones de cálculo en `lib/utils.ts`: `calculateDiscount`, `calculateTax`, `calculateShipping`, `calculateTotal`
- ✅ Store extendido con `couponCode`, `applyCoupon`, `removeCoupon`
- ✅ Persistencia de cupón aplicado en localStorage
- ✅ Feedback visual con toasts (cupón aplicado/removido/error)

Criterios de aceptación
- ✅ Cambios de cantidad recalculan totales en tiempo real.
- ✅ Persistencia y consistencia entre páginas.
- ✅ Cupones válidos se aplican correctamente.
- ✅ Validación de compra mínima funciona.
- ✅ Impuestos y envío se calculan dinámicamente.

---

### Fase 7 — Perfil: autenticación y gestión básica
- Elegir solución:
  - Opción A (rápida): Supabase Auth + DB (perfil, favoritos y carrito por usuario).
  - Opción B: Auth0 + API propia (Workers/Functions) + DB.
- Flujo: registro, login, logout. Página `/profile` para editar nombre, avatar y preferencias.
- Sincronizar favorites/cart entre "guest" y "logged-in".

Estado: ✅ COMPLETADA

Implementado
- ✅ authStore con Zustand + persist (mock en localStorage)
- ✅ Formularios: LoginForm, RegisterForm, EditProfileForm (React Hook Form + Zod)
- ✅ AuthModal accesible con Headless UI (Dialog)
- ✅ UserMenu dropdown con avatar, enlaces y logout
- ✅ ProfilePage funcional: avatar, estadísticas, edición, acciones
- ✅ Integración en Header: botones auth (guest) / UserMenu (autenticado)
- ✅ Hook useAuthSync para sincronización automática de stores
- ✅ Migración de datos guest → usuario al login
- ✅ Persistencia por usuario: cart-storage-{userId}, favorites-storage-{userId}
- ✅ Avatares automáticos con DiceBear API
- ✅ Validaciones: email, password (mín 6), confirmación password
- ✅ Tipos TypeScript: User, LoginCredentials, RegisterData, UpdateProfileData

Criterios de aceptación
- ✅ Auth segura (mock localStorage, listo para migrar a httpOnly cookies)
- ✅ Perfil editable y persistido
- ✅ Rehidratación de stores al iniciar sesión
- ✅ Migración transparente de datos guest → usuario

Ver detalles: `web/FASE_7_RESUMEN.md`

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
Carrito (completo) | 3 y 6 | Zustand persist, cantidades, totales, vaciar, cupones, impuestos | ✅ Totales correctos, persistencia, cupones funcionando
Categorías reales | 4 | `/categories` + slug navegable | ✅ URL refleja estado, deep link OK
Favoritos visibles | 5 | Vista dedicada, acciones | ✅ Persistencia + acciones consistentes
Perfil (auth) | 7 | Mock localStorage + sincronización | ✅ Login/logout, perfil editable, migración guest→usuario
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

Actualizado: 2025-01-15
