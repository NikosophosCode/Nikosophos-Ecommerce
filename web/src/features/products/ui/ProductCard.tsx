import type { Product } from '@/lib/types'
import { pickSafeImage, formatCurrency } from '@/lib/utils'
import { PLACEHOLDER_IMG } from '@/lib/constants'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { toast } from 'sonner'

type ProductCardProps = {
  product: Product
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const imgUrl = pickSafeImage(product.images)
  const addToCart = useCartStore((state) => state.addItem)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product.id, 1)
    toast.success('Añadido al carrito')
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(product.id)
    toast.success(isFavorite ? 'Quitado de favoritos' : 'Añadido a favoritos')
  }

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
        
        {/* Botón de favoritos */}
        <button
          onClick={handleToggleFavorite}
          className="absolute right-2 top-2 p-2 rounded-full bg-black/30 backdrop-blur hover:bg-black/50 transition opacity-0 group-hover:opacity-100"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-balance line-clamp-2 min-h-[2.5rem]">
          {product?.title}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">
            {formatCurrency(product?.price || 0)}
          </span>
          
          {/* Botón de añadir al carrito */}
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition"
            aria-label="Añadir al carrito"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
