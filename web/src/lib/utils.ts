import { PLACEHOLDER_IMG, CURRENCY, LOCALE, AVAILABLE_COUPONS, TAX_RATE, SHIPPING_THRESHOLD, type Coupon } from './constants'

export function pickSafeImage(images: unknown): string {
  if (!Array.isArray(images)) return PLACEHOLDER_IMG
  
  // Prefer non-imgur images
  const nonImgur = images.find(
    u => typeof u === 'string' && /^https?:\/\//i.test(u) && !/imgur\.com/i.test(u)
  )
  if (nonImgur) return nonImgur as string
  
  // Fallback to any valid URL
  const any = images.find(u => typeof u === 'string' && /^https?:\/\//i.test(u))
  return (any as string) || PLACEHOLDER_IMG
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Cart calculation utilities
export function validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = AVAILABLE_COUPONS.find(c => c.code.toLowerCase() === code.toLowerCase())
  
  if (!coupon) {
    return { valid: false, error: 'Cupón no válido' }
  }
  
  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return { 
      valid: false, 
      error: `Compra mínima de ${formatCurrency(coupon.minPurchase)} requerida` 
    }
  }
  
  return { valid: true, coupon }
}

export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0
  
  if (coupon.type === 'percentage') {
    return subtotal * (coupon.value / 100)
  }
  
  return coupon.value
}

export function calculateTax(subtotal: number, discount: number): number {
  return (subtotal - discount) * TAX_RATE
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : 10
}

export function calculateTotal(subtotal: number, discount: number, tax: number, shipping: number): number {
  return Math.max(0, subtotal - discount + tax + shipping)
}
