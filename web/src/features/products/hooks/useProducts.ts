import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { fetchProducts, fetchProduct, type ProductsParams } from '../api/products.api'
import type { Product } from '@/lib/types'

export function useProducts(params: ProductsParams = {}, options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60, // 1 minute
    ...options,
  })
}

export function useProduct(id: number, options?: Omit<UseQueryOptions<Product>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
    ...options,
  })
}
