import type { Product } from '@/lib/types'
import { formatCurrency, pickSafeImage } from '@/lib/utils'
import { PLACEHOLDER_IMG } from '@/lib/constants'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { toast } from 'sonner'

type FavoriteItemProps = {
  product: Product
}

export function FavoriteItem({ product }: FavoriteItemProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  const imgUrl = pickSafeImage(product.images)

  const handleAddToCart = () => {
    addToCart(product.id, 1)
    toast.success('Añadido al carrito')
  }

  const handleRemoveFavorite = () => {
    removeFavorite(product.id)
    toast.success('Quitado de favoritos')
  }

  return (
    <div className="glass rounded-xl p-3 sm:p-4 hover:ring-1 hover:ring-white/10 transition">
      <div className="flex gap-3 sm:gap-4">
        {/* Image */}
        <figure className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={imgUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG
            }}
          />
        </figure>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-sm sm:text-base line-clamp-2">{product.title}</h3>
            {product.category && (
              <p className="text-xs text-slate-400 mt-1">{product.category.name}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 gap-2">
            <p className="text-base sm:text-lg font-semibold text-blue-400">
              {formatCurrency(product.price)}
            </p>
            
            {/* Mobile actions */}
            <div className="flex gap-2 sm:hidden">
              <button
                onClick={handleAddToCart}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition text-xs font-medium"
                aria-label="Añadir al carrito"
              >
                Añadir
              </button>
              <button
                onClick={handleRemoveFavorite}
                className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition"
                aria-label="Quitar de favoritos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition flex items-center gap-2 whitespace-nowrap"
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
            <span className="text-sm font-medium">Añadir al carrito</span>
          </button>
          
          <button
            onClick={handleRemoveFavorite}
            className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition"
            aria-label="Quitar de favoritos"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
