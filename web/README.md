# Nikosophos Store - React + Vite

Migración completa de la aplicación a React con Vite, TypeScript y Tailwind v4.

## 🎯 Estado Actual - Fase 2 Completada

✅ **Arquitectura modular implementada**
- Features organizadas por dominio (`products`, próximamente `cart`, `favorites`, etc.)
- Separación clara de responsabilidades (api, hooks, ui)
- Stores globales con Zustand + persistencia
- Routing con React Router

✅ **Funcionalidades disponibles**
- ✨ Listado de productos con búsqueda en vivo
- 🛒 Carrito de compras persistente (añadir productos)
- ❤️ Sistema de favoritos persistente
- 🔍 Búsqueda en tiempo real
- 📱 UI responsive con Tailwind v4
- 🎨 Componentes accesibles (Headless UI)
- 🔔 Sistema de notificaciones (Sonner)
- 🚀 Navegación por rutas

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 📁 Estructura del Proyecto

```
web/
├── src/
│   ├── app/
│   │   ├── routes/          # Páginas de la aplicación
│   │   │   ├── HomePage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── FavoritesPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── CategoryPage.tsx
│   │   └── store/           # Estado global (Zustand)
│   │       ├── cartStore.ts
│   │       └── favoritesStore.ts
│   ├── components/          # Componentes compartidos
│   │   └── Header.tsx
│   ├── features/            # Módulos por dominio
│   │   └── products/
│   │       ├── api/         # Servicios de API
│   │       │   └── products.api.ts
│   │       ├── hooks/       # Custom hooks
│   │       │   └── useProducts.ts
│   │       └── ui/          # Componentes UI
│   │           ├── ProductCard.tsx
│   │           ├── ProductGrid.tsx
│   │           ├── ProductSkeleton.tsx
│   │           └── ProductDialog.tsx
│   ├── lib/                 # Utilidades y constantes
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── App.tsx              # Router principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🛠 Stack Tecnológico

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Routing**: React Router
- **Estado Global**: Zustand con middleware de persistencia
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: Headless UI
- **Notificaciones**: Sonner
- **API**: Platzi Fake Store API

## 🔧 Configuración

### Path Aliases
Se configuró el alias `@` para imports absolutos:

```typescript
import { Product } from '@/lib/types'
import { useProducts } from '@/features/products/hooks/useProducts'
```

### Stores Persistentes
Los stores de carrito y favoritos usan `localStorage` automáticamente:

```typescript
// Se persiste automáticamente
const addToCart = useCartStore(state => state.addItem)
addToCart(productId, quantity)

// Se restaura al recargar la página
const favorites = useFavoritesStore(state => state.favorites)
```

## 🌐 Rutas Disponibles

- `/` - Home (listado de productos)
- `/cart` - Carrito de compras
- `/favorites` - Productos favoritos
- `/category/:slug` - Productos por categoría
- `/profile` - Perfil de usuario
- `/contact` - Formulario de contacto

## 📝 Próximas Fases

### Fase 3 - Carrito Funcional Completo
- [ ] Vista detallada del carrito con tabla
- [ ] Control de cantidades
- [ ] Cálculo de totales
- [ ] Botón "Vaciar carrito"

### Fase 4 - Categorías Navegables
- [ ] Obtener categorías reales de la API
- [ ] Menú de categorías en Header
- [ ] Filtrado por categoría
- [ ] URL params para deep linking

### Fase 5 - Página de Favoritos
- [ ] Listado completo de favoritos
- [ ] Acciones (quitar, añadir al carrito)
- [ ] Estado vacío

### Fases 6-10
Ver `../MIGRACION_A_REACT_VITE.md` para el plan completo.

## 🎨 Componentes Destacados

### ProductDialog
Dialog accesible con Headless UI que muestra:
- Imagen del producto
- Descripción completa
- Precio
- Botones para añadir al carrito y favoritos
- Transiciones suaves
- Focus trap y cierre con ESC

### Header
Header sticky con:
- Logo y navegación
- Barra de búsqueda en vivo
- Badges de carrito y favoritos (con contador)
- Responsive (mobile-first)

### ProductGrid
Grid responsive de productos con:
- Skeletons mientras carga
- Estados de error
- Lazy loading de imágenes
- Hover effects

## 📊 Quality Gates

- ✅ Build: PASS
- ✅ Typecheck: PASS
- ⏳ Lint: Pendiente
- ⏳ Tests: Pendiente

## 🐛 Troubleshooting

### Puerto en uso
Si el puerto 5173 está ocupado, Vite automáticamente usa el siguiente disponible (5174, 5175, etc.)

### Errores de path alias
Asegúrate de que `tsconfig.app.json` tenga configurado:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
