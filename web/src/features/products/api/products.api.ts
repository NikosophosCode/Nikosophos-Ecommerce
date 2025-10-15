import { API_BASE_URL, PRODUCTS_PER_PAGE } from '@/lib/constants'
import type { Product, Category } from '@/lib/types'

export type ProductsParams = {
  offset?: number
  limit?: number
  title?: string
  categoryId?: number
  price_min?: number
  price_max?: number
}

export async function fetchProducts(params: ProductsParams = {}): Promise<Product[]> {
  const { offset = 0, limit = PRODUCTS_PER_PAGE, title, categoryId } = params
  
  const url = new URL(`${API_BASE_URL}/products`)
  url.searchParams.set('offset', offset.toString())
  url.searchParams.set('limit', limit.toString())
  
  if (title) {
    url.searchParams.set('title', title)
  }
  
  if (categoryId) {
    url.searchParams.set('categoryId', categoryId.toString())
  }
  
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  
  const json = await res.json()
  return Array.isArray(json) ? json : []
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  const json = await res.json()
  return Array.isArray(json) ? json : []
}
