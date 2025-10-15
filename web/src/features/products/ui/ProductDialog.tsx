import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import type { Product } from '@/lib/types'
import { pickSafeImage, formatCurrency } from '@/lib/utils'
import { PLACEHOLDER_IMG } from '@/lib/constants'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { toast } from 'sonner'

type ProductDialogProps = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDialog({ product, isOpen, onClose }: ProductDialogProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)

  if (!product) return null

  const imgUrl = pickSafeImage(product.images)
  const favorite = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart(product.id, 1)
    toast.success('Producto añadido al carrito')
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    toast.success(favorite ? 'Eliminado de favoritos' : 'Añadido a favoritos')
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl glass ring-1 ring-white/10 rounded-2xl p-6 transform transition-all">
                <div className="flex items-start justify-between mb-4">
                  <DialogTitle className="text-2xl font-semibold">
                    {product.title}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                    aria-label="Cerrar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <figure className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG
                      }}
                    />
                  </figure>

                  <div className="space-y-4">
                    {product.category && (
                      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm">
                        {product.category.name}
                      </span>
                    )}

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {product.description || 'Sin descripción disponible'}
                    </p>

                    <div className="text-3xl font-bold">
                      {formatCurrency(product.price)}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Añadir al carrito
                      </button>

                      <button
                        onClick={handleToggleFavorite}
                        className={`p-3 rounded-lg transition ${
                          favorite
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                        aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                      >
                        <svg
                          className="w-5 h-5"
                          fill={favorite ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
