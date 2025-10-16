import { useQueries } from '@tanstack/react-query'
import { fetchProduct } from '@/features/products/api/products.api'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import type { Product } from '@/lib/types'

/**
 * Hook que obtiene todos los productos marcados como favoritos.
 * Usa useQueries para hacer fetch en paralelo de cada producto.
 * 
 * @returns Array de productos favoritos con estado de loading
 */
export function useFavoriteProducts() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const favoriteIds = Array.from(favorites)

  const queries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ['product', id],
      queryFn: () => fetchProduct(id),
      staleTime: 1000 * 60 * 5, // 5 minutos
    })),
  })

  const isLoading = queries.some((q) => q.isLoading)
  const isError = queries.some((q) => q.isError)
  const products = queries
    .map((q) => q.data)
    .filter((p): p is Product => p !== undefined)

  return {
    products,
    isLoading,
    isError,
    isEmpty: favoriteIds.length === 0,
    count: favoriteIds.length,
  }
}
