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
    }),
    {
      name: 'cart-storage',
    }
  )
)
