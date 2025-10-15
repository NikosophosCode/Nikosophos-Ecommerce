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
    <div className="glass rounded-xl p-4 flex gap-4 items-center hover:ring-1 hover:ring-white/10 transition">
      {/* Image */}
      <figure className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={imgUrl}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG
          }}
        />
      </figure>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
        {product.category && (
          <p className="text-xs text-slate-400 mt-1">{product.category.name}</p>
        )}
        <p className="text-sm font-semibold mt-1">{formatCurrency(product.price)}</p>
      </div>

      {/* Quantity controls */}
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

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <p className="text-sm font-semibold">{formatCurrency(subtotal)}</p>
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition"
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
  )
}
