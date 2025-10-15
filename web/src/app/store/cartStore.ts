import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/lib/types'

type CartStore = {
  items: Record<number, CartItem>
  addItem: (productId: number, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: (prices: Record<number, number>) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},

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

      clearCart: () => set({ items: {} }),

      getTotalItems: () => {
        return Object.values(get().items).reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: (prices) => {
        return Object.values(get().items).reduce((sum, item) => {
          const price = prices[item.productId] || 0
          return sum + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
