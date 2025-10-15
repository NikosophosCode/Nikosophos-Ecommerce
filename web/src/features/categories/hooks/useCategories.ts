import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@/features/products/api/products.api'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 minutos - las categorías no cambian frecuentemente
    gcTime: 1000 * 60 * 30, // 30 minutos en caché
  })
}
