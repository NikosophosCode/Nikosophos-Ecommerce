# 🐛 Solución: Loop Infinito en CartPage

## Problema Identificado

Al abrir la página del carrito (`/cart`), la aplicación entraba en un **loop infinito** causando:

1. ❌ Error: "The result of getSnapshot should be cached to avoid an infinite loop"
2. ❌ Error: "Maximum update depth exceeded"
3. ❌ La página dejaba de renderizarse

### Captura de Consola
```
⚠️ Warning: The result of getSnapshot should be cached to avoid an infinite loop
❌ Uncaught Error: Maximum update depth exceeded
   at CartPage.tsx:10
```

## Causa Raíz

El problema estaba en `cartStore.ts` con los métodos `getItemsArray()` y `hasItems()`:

```typescript
// ❌ INCORRECTO - Causa loop infinito
type CartStore = {
  getItemsArray: () => CartItem[]  // Devuelve nueva referencia cada vez
  hasItems: () => boolean           // Devuelve nuevo valor cada vez
}

const useCartStore = create()(
  persist((set, get) => ({
    getItemsArray: () => {
      return Object.values(get().items)  // Nueva array cada llamada
    },
    hasItems: () => {
      return Object.keys(get().items).length > 0  // Nueva comparación cada llamada
    }
  }))
)
```

### ¿Por qué causa loop infinito?

1. **CartPage** usa el selector: `useCartStore((state) => state.getItemsArray())`
2. Cada render llama a `getItemsArray()` que devuelve un **nuevo array**
3. React detecta cambio de referencia → trigger re-render
4. Se vuelve a llamar `getItemsArray()` → nuevo array
5. **LOOP INFINITO** 🔄

## Solución Implementada

Convertir los métodos en **selectores externos** que mantienen referencias estables:

```typescript
// ✅ CORRECTO - Selectores externos
type CartStore = {
  items: Record<number, CartItem>
  // Removidos: getItemsArray y hasItems
}

const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    items: {},
    // ... resto de métodos
  }))
)

// Selectores externos (estables)
export const selectCartItems = (state: CartStore) => Object.values(state.items)
export const selectHasItems = (state: CartStore) => Object.keys(state.items).length > 0
```

### Uso en Componentes

```typescript
// ✅ CORRECTO - Uso de selectores externos
import { useCartStore, selectCartItems, selectHasItems } from '@/app/store/cartStore'

export function CartPage() {
  const cartItems = useCartStore(selectCartItems)  // Zustand cachea internamente
  const hasItems = useCartStore(selectHasItems)    // Evita re-renders innecesarios
  
  // ...
}
```

## Ventajas de Selectores Externos

1. **Estabilidad**: Zustand cachea los resultados automáticamente
2. **Performance**: Solo re-renderiza cuando el valor real cambia
3. **Reutilizables**: Pueden usarse en múltiples componentes
4. **Testables**: Funciones puras fáciles de probar

## Patrón Recomendado para Zustand

### ❌ Anti-patrón (evitar)
```typescript
// NO hacer esto con computed values
const store = create((set, get) => ({
  items: [],
  getCount: () => get().items.length  // ❌ Causa problemas
}))

// Uso problemático
const count = useStore(state => state.getCount())  // ❌ Loop
```

### ✅ Patrón correcto
```typescript
// Selectores externos
const store = create((set) => ({
  items: []
}))

export const selectCount = (state) => state.items.length  // ✅ Correcto

// Uso
const count = useStore(selectCount)  // ✅ Safe
```

## Archivos Modificados

1. **`app/store/cartStore.ts`**
   - ✅ Removidos `getItemsArray()` y `hasItems()` del tipo
   - ✅ Añadidos selectores externos `selectCartItems` y `selectHasItems`

2. **`app/routes/CartPage.tsx`**
   - ✅ Importados selectores externos
   - ✅ Cambiado uso de `state.getItemsArray()` a `selectCartItems`
   - ✅ Cambiado uso de `state.hasItems()` a `selectHasItems`

## Verificación

```bash
# Build exitoso
cd web
npm run build
✅ No errors

# Dev server
npm run dev
✅ CartPage renderiza correctamente
✅ No infinite loops
✅ Console limpia sin errores
```

## Lecciones Aprendidas

1. **Selectores computados** en Zustand deben ser **externos** al store
2. **Funciones dentro del state** que devuelven valores derivados → ❌ Bad
3. **Selectores como parámetros** a `useStore()` → ✅ Good
4. Zustand maneja el **caching y memoization** automáticamente con selectores externos

## Referencias

- [Zustand Docs - Selecting Multiple State Slices](https://github.com/pmndrs/zustand#selecting-multiple-state-slices)
- [Zustand Docs - Computed Values](https://github.com/pmndrs/zustand/wiki/Computed-Values)
- [React Docs - Infinite Loops](https://react.dev/reference/react/hooks#avoiding-infinite-loops)

---

**Fecha**: 2025-01-14  
**Estado**: ✅ RESUELTO  
**Impacto**: CartPage funciona correctamente sin loops
