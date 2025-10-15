import type { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'
import { useProducts } from '../hooks/useProducts'
import type { ProductsParams } from '../api/products.api'

type ProductGridProps = {
  params?: ProductsParams
  onProductClick?: (product: Product) => void
}

export function ProductGrid({ params = {}, onProductClick }: ProductGridProps) {
  const { data, isLoading, isError } = useProducts(params)

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        <ProductSkeleton />
      </section>
    )
  }

  if (isError || !data) {
    return (
      <div className="text-center text-slate-300 py-10">
        No se pudieron cargar los productos.
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-slate-300 py-10">
        No se encontraron productos.
      </div>
    )
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick?.(product)}
        />
      ))}
    </section>
  )
}
