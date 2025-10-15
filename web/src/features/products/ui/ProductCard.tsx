import type { Product } from '@/lib/types'
import { pickSafeImage, formatCurrency } from '@/lib/utils'
import { PLACEHOLDER_IMG } from '@/lib/constants'

type ProductCardProps = {
  product: Product
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const imgUrl = pickSafeImage(product.images)

  return (
    <article
      className="group rounded-2xl overflow-hidden glass ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:ring-white/20 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="relative">
        <figure className="aspect-[4/3] overflow-hidden">
          <img
            src={imgUrl}
            alt={product?.title ?? 'Producto'}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG
            }}
          />
        </figure>
        {product.category && (
          <span className="absolute left-2 top-2 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-xs">
            {product.category.name}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-balance line-clamp-2 min-h-[2.5rem]">
          {product?.title}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-semibold">
            {formatCurrency(product?.price || 0)}
          </span>
        </div>
      </div>
    </article>
  )
}
