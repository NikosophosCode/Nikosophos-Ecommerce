import { PLACEHOLDER_IMG, CURRENCY, LOCALE } from './constants'

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
