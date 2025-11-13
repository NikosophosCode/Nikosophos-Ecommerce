# 🛍️ PlatziStore - Modern E-commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?style=flat&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06b6d4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

Una aplicación de comercio electrónico moderna, construida con las últimas tecnologías web y las mejores prácticas de desarrollo.

[Demo en Vivo](#) | [Documentación](#) | [Reportar Bug](https://github.com/NikosophosCode/Nikosophos-Ecommerce/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Inicio Rápido](#-inicio-rápido)
- [Arquitectura](#-arquitectura)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Optimizaciones](#-optimizaciones)
- [Deployment](#-deployment)
- [Desarrollo](#️-desarrollo)
- [Testing](#-testing)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎯 Core Features

- ✅ **Catálogo de Productos**: Grid responsive con búsqueda en tiempo real
- ✅ **Carrito de Compras**: Sistema completo con persistencia multi-usuario
- ✅ **Sistema de Favoritos**: Gestión de productos favoritos por usuario
- ✅ **Autenticación**: Login/Register con validación y gestión de sesiones
- ✅ **Perfil de Usuario**: Edición de datos y avatar personalizable
- ✅ **Categorías**: Navegación y filtrado por categorías dinámicas
- ✅ **Formulario de Contacto**: Integración con Web3Forms
- ✅ **Búsqueda Global**: Búsqueda instantánea con debouncing

### 🚀 Características Técnicas

- **Code Splitting**: Lazy loading de rutas para carga optimizada
- **State Management**: Zustand con persistencia en localStorage
- **Data Fetching**: TanStack Query con caché inteligente
- **Form Validation**: React Hook Form + Zod schemas
- **Responsive Design**: Mobile-first con Tailwind CSS v4
- **Type Safety**: TypeScript estricto en toda la aplicación
- **Accessibility**: Componentes ARIA-compliant con Headless UI
- **SEO Optimizado**: Sitemap, robots.txt y meta tags
- **Production Ready**: Optimizaciones de build y seguridad

---

## 🛠️ Stack Tecnológico

### Frontend Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [React](https://react.dev/) | 19.1 | Biblioteca UI con features modernas |
| [Vite](https://vite.dev/) | 7.1 | Build tool ultra-rápido |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type safety y mejor DX |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS framework |

### State & Data

| Librería | Propósito |
|----------|-----------|
| [Zustand](https://github.com/pmndrs/zustand) | Estado global ligero y performante |
| [TanStack Query](https://tanstack.com/query) | Server state management y caché |
| [React Router](https://reactrouter.com/) | Client-side routing |

### UI & Forms

| Librería | Propósito |
|----------|-----------|
| [Headless UI](https://headlessui.com/) | Componentes accesibles sin estilos |
| [React Hook Form](https://react-hook-form.com/) | Gestión de formularios performante |
| [Zod](https://zod.dev/) | Validación de schemas TypeScript-first |
| [Sonner](https://sonner.emilkowal.ski/) | Notificaciones toast elegantes |

### Developer Tools

| Tool | Propósito |
|------|-----------|
| [ESLint](https://eslint.org/) | Linting y code quality |
| [TypeScript ESLint](https://typescript-eslint.io/) | TypeScript linting |
| Vercel | Deployment y hosting |

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js >= 18.x
- npm >= 9.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NikosophosCode/Nikosophos-Ecommerce.git

# Navegar al directorio del proyecto
cd Nikosophos-Ecommerce/web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5174`

### Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build de producción
npm run build

# Preview del build de producción
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

---

## 🏗 Arquitectura

### Estructura del Proyecto

```
web/
├── public/
│   ├── robots.txt           # SEO: reglas para crawlers
│   └── sitemap.xml          # SEO: mapa del sitio
├── src/
│   ├── app/
│   │   ├── routes/          # 📄 Páginas de la aplicación
│   │   │   ├── HomePage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── FavoritesPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── CategoryPage.tsx
│   │   ├── store/           # 🗃️ Estado global (Zustand)
│   │   │   ├── authStore.ts         # Autenticación y usuario
│   │   │   ├── cartStore.ts         # Carrito multi-usuario
│   │   │   ├── favoritesStore.ts    # Favoritos por usuario
│   │   │   └── useAuthSync.ts       # Sincronización de stores
│   │   └── providers/       # 🔌 Context providers
│   ├── components/          # 🧩 Componentes compartidos
│   │   ├── Header.tsx       # Header con navegación
│   │   ├── Footer.tsx       # Footer de la app
│   │   ├── MainNav.tsx      # Navegación principal (desktop)
│   │   ├── MobileNav.tsx    # Navegación móvil
│   │   └── UserMenu.tsx     # Menú de usuario autenticado
│   ├── features/            # 🎯 Módulos por dominio (Feature-Sliced)
│   │   ├── products/
│   │   │   ├── api/         # Servicios de API
│   │   │   │   └── products.api.ts
│   │   │   ├── hooks/       # Custom hooks
│   │   │   │   └── useProducts.ts
│   │   │   └── ui/          # Componentes UI
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductGrid.tsx
│   │   │       ├── ProductSkeleton.tsx
│   │   │       └── ProductDialog.tsx
│   │   ├── cart/
│   │   │   └── ui/
│   │   │       ├── CartItem.tsx
│   │   │       └── CouponInput.tsx
│   │   ├── favorites/
│   │   │   ├── hooks/
│   │   │   │   └── useFavoriteProducts.ts
│   │   │   └── ui/
│   │   │       └── FavoriteItem.tsx
│   │   ├── categories/
│   │   │   ├── hooks/
│   │   │   │   └── useCategories.ts
│   │   │   └── ui/
│   │   │       └── CategoryNav.tsx
│   │   ├── profile/
│   │   │   └── ui/
│   │   │       ├── AuthModal.tsx
│   │   │       ├── LoginForm.tsx
│   │   │       ├── RegisterForm.tsx
│   │   │       └── EditProfileForm.tsx
│   │   └── contact/
│   │       ├── api/
│   │       │   ├── contact.api.ts
│   │       │   └── contact.schemas.ts
│   │       └── ui/
│   │           └── ContactForm.tsx
│   ├── lib/                 # 🔧 Utilidades y helpers
│   │   ├── types.ts         # TypeScript types globales
│   │   ├── constants.ts     # Constantes de la app
│   │   └── utils.ts         # Funciones helper
│   ├── App.tsx              # Router principal con Suspense
│   ├── main.tsx             # Entry point + TanStack Query setup
│   └── index.css            # Estilos globales con Tailwind
├── eslint.config.js         # Configuración ESLint
├── tsconfig.json            # TypeScript config base
├── tsconfig.app.json        # TypeScript config para app
├── tsconfig.node.json       # TypeScript config para Vite
├── vite.config.ts           # Configuración de Vite
├── vercel.json              # Configuración de deployment
└── package.json
```

### Patrones de Diseño

#### Feature-Sliced Design
Cada feature es autocontenida con su propia lógica de negocio, UI y servicios:

```
features/
└── feature-name/
    ├── api/       # Servicios y llamadas a API
    ├── hooks/     # Custom hooks de React
    ├── ui/        # Componentes de presentación
    └── index.ts   # Exportaciones públicas
```

#### Separation of Concerns

- **UI Components** (`ui/`): Componentes puros de presentación
- **Business Logic** (`hooks/`): Lógica de negocio reutilizable
- **Data Layer** (`api/`): Servicios de datos y transformaciones
- **Global State** (`store/`): Estado compartido entre features

---

## 💡 Funcionalidades Principales

### 🔐 Sistema de Autenticación

**Implementación completa con:**
- Registro de usuarios con validación
- Login con credenciales
- Persistencia de sesión
- Sincronización de datos por usuario
- Mock de base de datos en localStorage
- Avatares personalizables con DiceBear API

**Stores Relacionados:**
```typescript
// authStore.ts
- login(email, password)
- register(email, password, name)
- logout()
- updateProfile(data)
```

### 🛒 Carrito Multi-Usuario

**Sistema avanzado con:**
- Persistencia separada por usuario
- Migración de carrito guest → usuario
- Control de cantidades
- Sistema de cupones
- Cálculo de totales en tiempo real

**Features:**
```typescript
// cartStore.ts
- addItem(productId, quantity)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- applyCoupon(code)
- migrateGuestData(userId)
```

### ❤️ Sistema de Favoritos

**Gestión de productos favoritos:**
- Toggle rápido de favoritos
- Persistencia por usuario
- Sincronización con autenticación
- Migración desde modo invitado

### 🔍 Búsqueda en Tiempo Real

**Búsqueda optimizada con:**
- Debouncing para reducir llamadas
- Búsqueda en título y descripción
- Feedback visual instantáneo
- Reset rápido de búsqueda

### 📱 Navegación por Categorías

**Sistema dinámico de categorías:**
- Fetching de categorías desde API
- Navegación con React Router
- Filtrado de productos por categoría
- URLs amigables con slugs

### 📧 Formulario de Contacto

**Integración con Web3Forms:**
- Validación con Zod schemas
- React Hook Form para gestión
- Envío asíncrono a Web3Forms API
- Feedback de éxito/error con toast
- Protección anti-spam

---

## ⚡ Optimizaciones

### Build Optimizations

**Code Splitting:**
```typescript
// Lazy loading de rutas
const HomePage = lazy(() => import('./app/routes/HomePage'))
const CartPage = lazy(() => import('./app/routes/CartPage'))
// ... más rutas
```

**Manual Chunks en Vite:**
```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'query-vendor': ['@tanstack/react-query'],
  'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
  'ui-vendor': ['@headlessui/react', 'sonner'],
}
```

### Runtime Optimizations

- **React Query**: Caché inteligente de peticiones HTTP
- **Zustand Persist**: Middleware de persistencia optimizado
- **Debouncing**: En búsqueda para reducir renders
- **Memo/Callback**: En componentes críticos de rendimiento

### Network Optimizations

- **HTTP/2**: Soporte completo en Vercel
- **Asset Caching**: Headers de cache inmutable para assets
- **Prefetching**: Preparado para prefetch de rutas

---

## 🌐 Deployment

### Vercel (Recomendado)

El proyecto está optimizado para Vercel con configuración lista:

```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Deploy con Vercel CLI:**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd web
vercel --prod
```

**Deploy con GitHub:**
1. Push a tu repositorio
2. Conecta con Vercel
3. Deploy automático en cada push

### Variables de Entorno

```bash
# .env.local
VITE_WEB3FORMS_KEY=tu_clave_aqui
```

### Headers de Seguridad

Configurados en `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 🛠️ Desarrollo

### Path Aliases

Usa `@` para imports absolutos:

```typescript
import { Product } from '@/lib/types'
import { useProducts } from '@/features/products/hooks/useProducts'
import { Header } from '@/components/Header'
```

### Type Safety

Tipos TypeScript estrictos en `lib/types.ts`:

```typescript
export type Product = {
  id: number
  title: string
  description?: string
  price: number
  category?: Category
  images?: string[]
}

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}
```

### API Integration

**Platzi Fake Store API:**
- Base URL: `https://api.escuelajs.co/api/v1`
- Endpoints: `/products`, `/categories`, `/users`

**TanStack Query Setup:**

```typescript
// main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000,   // 10 minutos
      retry: 1,
    },
  },
})
```

### Stores con Zustand

**Ejemplo de uso:**

```typescript
// Leer estado
const items = useCartStore(state => state.items)

// Usar acciones
const addToCart = useCartStore(state => state.addItem)
addToCart(productId, quantity)

// El estado se persiste automáticamente en localStorage
```

---

## 🧪 Testing

### Quality Gates

| Check | Status | Comando |
|-------|--------|---------|
| Build | ✅ PASS | `npm run build` |
| Type Check | ✅ PASS | `tsc -b` |
| Linting | ✅ PASS | `npm run lint` |
| Unit Tests | ⏳ Pendiente | - |
| E2E Tests | ⏳ Pendiente | - |

### Linting

ESLint configurado con:
- Reglas recomendadas de TypeScript
- React Hooks rules
- React Refresh plugin

---

## 📚 Documentación Adicional

- [Plan de Deploy a Vercel](docs/deployment/PLAN_DEPLOY_VERCEL.md)
- [Checklist de Deploy](docs/deployment/CHECKLIST_DEPLOY.md)
- [Comandos Rápidos](docs/deployment/COMANDOS_RAPIDOS.md)
- [Historial de Migración](docs/migration/MIGRACION_A_REACT_VITE.md)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**NikosophosCode**

- GitHub: [@NikosophosCode](https://github.com/NikosophosCode)
- Proyecto: [Nikosophos-Ecommerce](https://github.com/NikosophosCode/Nikosophos-Ecommerce)

---

## 🙏 Agradecimientos

- [Platzi Fake Store API](https://fakeapi.platzi.com/) - API de productos
- [Web3Forms](https://web3forms.com/) - Servicio de formularios
- [DiceBear](https://dicebear.com/) - Avatares generados
- [Heroicons](https://heroicons.com/) - Iconos SVG
- Comunidad de React y Vite

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Made with ❤️ and ☕ by NikosophosCode

</div>
