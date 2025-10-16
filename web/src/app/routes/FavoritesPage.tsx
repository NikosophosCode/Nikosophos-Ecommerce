import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useFavoriteProducts } from '@/features/favorites/hooks'
import { FavoriteItem } from '@/features/favorites/ui'
import { useFavoritesStore } from '@/app/store/favoritesStore'

export function FavoritesPage() {
  const { products, isLoading, isEmpty } = useFavoriteProducts()
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar todos los favoritos?')) {
      clearFavorites()
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-2 md:px-4 py-4">
        <Header />
        
        <div className="max-w-4xl mx-auto mt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Mis Favoritos</h1>
              {!isEmpty && (
                <p className="text-sm text-slate-400 mt-1">
                  {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </p>
              )}
            </div>
            
            {!isEmpty && !isLoading && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition text-sm font-medium"
              >
                Vaciar favoritos
              </button>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-xl p-4 h-28 animate-pulse shimmer" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {isEmpty && !isLoading && (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
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
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">No tienes favoritos</h2>
                  <p className="text-slate-400 mb-6">
                    Empieza a guardar tus productos favoritos para encontrarlos fácilmente
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Explorar productos
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Products list */}
          {!isEmpty && !isLoading && (
            <div className="space-y-4">
              {products.map((product) => (
                <FavoriteItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
