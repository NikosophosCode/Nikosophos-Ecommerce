import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/lib/types'

export type CartItemWithProduct = CartItem & {
  product: Product
}

type CartStore = {
  items: Record<number, CartItem>
  couponCode: string | null
  addItem: (productId: number, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  getTotalCount: () => number
  // Método para obtener datos sin usuario (guest)
  getGuestData: () => { items: Record<number, CartItem>; couponCode: string | null }
  // Método para cargar datos de usuario
  loadUserData: (userId: string) => void
  // Método para migrar datos de guest a usuario
  migrateGuestData: (userId: string) => void
}

// Función helper para obtener la key de almacenamiento según el usuario
const getStorageKey = (userId?: string) => {
  return userId ? `cart-storage-${userId}` : 'cart-storage-guest'
}

// Función para obtener datos del store de un usuario específico
const getUserCartData = (userId: string) => {
  try {
    const stored = localStorage.getItem(getStorageKey(userId))
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.state || { items: {}, couponCode: null }
    }
  } catch (error) {
    console.error('Error loading user cart data:', error)
  }
  return { items: {}, couponCode: null }
}

// Función para guardar datos de un usuario
const saveUserCartData = (userId: string, data: { items: Record<number, CartItem>; couponCode: string | null }) => {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify({ state: data }))
  } catch (error) {
    console.error('Error saving user cart data:', error)
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},
      couponCode: null,

      addItem: (productId, quantity = 1) => {
        set((state) => {
          const existing = state.items[productId]
          return {
            items: {
              ...state.items,
              [productId]: {
                productId,
                quantity: existing ? existing.quantity + quantity : quantity,
              },
            },
          }
        })
      },

      removeItem: (productId) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [productId]: _, ...rest } = state.items
          return { items: rest }
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: {
            ...state.items,
            [productId]: { productId, quantity },
          },
        }))
      },

      clearCart: () => set({ items: {}, couponCode: null }),

      applyCoupon: (code) => set({ couponCode: code }),

      removeCoupon: () => set({ couponCode: null }),

      getTotalCount: () => {
        const { items } = get()
        return Object.values(items).reduce((sum, item) => sum + item.quantity, 0)
      },

      getGuestData: () => {
        const { items, couponCode } = get()
        return { items, couponCode }
      },

      loadUserData: (userId: string) => {
        const userData = getUserCartData(userId)
        set(userData)
      },

      migrateGuestData: (userId: string) => {
        const { items, couponCode } = get()
        const userData = getUserCartData(userId)
        
        // Combinar datos: priorizar guest para conflictos
        const mergedItems = { ...userData.items }
        Object.entries(items).forEach(([productId, item]) => {
          const id = Number(productId)
          if (mergedItems[id]) {
            // Si ya existe, sumar cantidades
            mergedItems[id].quantity += item.quantity
          } else {
            mergedItems[id] = item
          }
        })

        const mergedData = {
          items: mergedItems,
          couponCode: couponCode || userData.couponCode,
        }

        // Guardar y aplicar
        saveUserCartData(userId, mergedData)
        set(mergedData)
      },
    }),
    {
      name: 'cart-storage-guest', // Siempre usar guest por defecto
    }
  )
)
