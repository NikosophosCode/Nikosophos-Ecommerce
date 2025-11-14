import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/features/products/ui/ProductGrid'
import { ProductSlider } from '@/features/products/ui/ProductSlider'
import { ProductDialog } from '@/features/products/ui/ProductDialog'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryNav } from '@/features/categories'
import type { Product } from '@/lib/types'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Obtener query de la URL
  const searchQuery = searchParams.get('q') || ''

  // Actualizar query en la URL
  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-2 md:px-4 py-4">
        <Header onSearch={handleSearch} searchQuery={searchQuery} />
        
        <main className="space-y-8">
          {/* Slider de productos destacados - Solo se muestra si no hay búsqueda */}
          {!searchQuery && (
            <section className="mb-8">
              <ProductSlider
                params={{ limit: 10 }}
                onProductClick={setSelectedProduct}
              />
            </section>
          )}

          {/* Navegación de categorías - Debajo del slider */}
          <div className="glass rounded-2xl p-4">
            <CategoryNav />
          </div>

          {/* Grid de todos los productos con paginación */}
          <section>
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Resultados de búsqueda para: <span className="text-purple-400">"{searchQuery}"</span>
                </h2>
              </div>
            )}
            
            <ProductGrid
              params={searchQuery ? { title: searchQuery } : {}}
              onProductClick={setSelectedProduct}
            />
          </section>
        </main>

        <ProductDialog
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>

      <Footer />
    </div>
  )
}
