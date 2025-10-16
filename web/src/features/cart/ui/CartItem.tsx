import type { Product } from '@/lib/types'
import { formatCurrency, pickSafeImage } from '@/lib/utils'
import { PLACEHOLDER_IMG } from '@/lib/constants'
import { useCartStore } from '@/app/store/cartStore'

type CartItemProps = {
  product: Product
  quantity: number
}

export function CartItem({ product, quantity }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const imgUrl = pickSafeImage(product.images)
  const subtotal = product.price * quantity

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
    }
  }

  const handleRemove = () => {
    removeItem(product.id)
  }

  return (
    <div className="glass rounded-xl p-3 sm:p-4 hover:ring-1 hover:ring-white/10 transition">
      <div className="flex gap-3 sm:gap-4">
        {/* Image */}
        <figure className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img                                                                                                    
            src={imgUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG
            }}
          />
        </figure>

        {/* Content - Flexible en móvil, compacto en desktop */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-sm line-clamp-2 sm:line-clamp-1">{product.title}</h3>
            {product.category && (
              <p className="text-xs text-slate-400 mt-0.5">{product.category.name}</p>
            )}
          </div>
          <div className="flex items-end justify-between mt-2 sm:hidden">
            <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
            <p className="text-sm font-semibold text-blue-400">{formatCurrency(subtotal)}</p>
          </div>
        </div>

        {/* Desktop: Precio unitario */}
        <div className="hidden sm:block text-sm font-semibold self-start min-w-[70px] text-right">
          {formatCurrency(product.price)}
        </div>

        {/* Quantity controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
            aria-label="Disminuir cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center font-medium text-sm">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Desktop: Subtotal */}
        <div className="hidden sm:block text-right min-w-[80px] self-start">
          <p className="text-sm font-semibold">{formatCurrency(subtotal)}</p>
        </div>

        {/* Remove button - Desktop */}
        <button
          onClick={handleRemove}
          className="hidden sm:block p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition self-start"
          aria-label="Eliminar del carrito"
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

      {/* Mobile: Quantity controls y botón eliminar */}
      <div className="flex items-center justify-between mt-3 sm:hidden pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
            aria-label="Disminuir cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center font-medium text-sm">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleRemove}
          className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition flex items-center gap-2"
          aria-label="Eliminar del carrito"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="text-xs font-medium">Eliminar</span>
        </button>
      </div>
    </div>
  )
}
