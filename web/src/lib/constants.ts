export const API_BASE_URL = 'https://api.escuelajs.co/api/v1'
export const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=Sin+Imagen'
export const CURRENCY = 'USD'
export const LOCALE = 'es-ES'
export const PRODUCTS_PER_PAGE = 44

// Tax configuration
export const TAX_RATE = 0.16 // 16% IVA (Mexico)
export const SHIPPING_THRESHOLD = 50 // Free shipping over $50

// Available coupons
export type Coupon = {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  description: string
  minPurchase?: number
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% de descuento',
  },
  {
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    description: '20% de descuento',
    minPurchase: 100,
  },
  {
    code: 'FIRST5',
    type: 'fixed',
    value: 5,
    description: '$5 de descuento',
  },
]
