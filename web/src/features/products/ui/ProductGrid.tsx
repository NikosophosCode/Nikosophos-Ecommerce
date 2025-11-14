import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'
import { Pagination } from './Pagination'
import { useProducts } from '../hooks/useProducts'
import { usePagination } from '../hooks/usePagination'
import type { ProductsParams } from '../api/products.api'

type ProductGridProps = {
  params?: ProductsParams
  onProductClick?: (product: Product) => void
  itemsPerPage?: number
}

const ITEMS_PER_PAGE = 8

export function ProductGrid({ 
  params = {}, 
  onProductClick,
  itemsPerPage = ITEMS_PER_PAGE 
}: ProductGridProps) {
  const { data, isLoading, isError } = useProducts(params)

  // Paginación en el cliente (no afecta búsqueda)
  const pagination = usePagination({
    totalItems: data?.length || 0,
    itemsPerPage,
    initialPage: 1,
  })

  // Productos paginados
  const paginatedProducts = useMemo(() => {
    if (!data) return []
    return data.slice(pagination.startIndex, pagination.endIndex)
  }, [data, pagination.startIndex, pagination.endIndex])

  // Reset pagination cuando cambian los parámetros de búsqueda
  useEffect(() => {
    pagination.reset()
  }, [params.title, params.categoryId])

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        <ProductSkeleton />
      </section>
    )
  }

  if (isError || !data) {
    return (
      <motion.div 
        className="text-center text-slate-300 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        No se pudieron cargar los productos.
      </motion.div>
    )
  }

  if (data.length === 0) {
    return (
      <motion.div 
        className="text-center text-slate-300 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        No se encontraron productos.
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Grid de productos */}
      <motion.section 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {paginatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick?.(product)}
            />
          </motion.div>
        ))}
      </motion.section>

      {/* Paginación */}
      {data.length > itemsPerPage && (
        <div className="px-2 sm:px-0">
          <Pagination pagination={pagination} className="mt-12" />
        </div>
      )}

      {/* Info de resultados */}
      <motion.div
        className="text-center text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Mostrando {pagination.startIndex + 1} - {pagination.endIndex} de{' '}
        {data.length} productos
      </motion.div>
    </div>
  )
}
