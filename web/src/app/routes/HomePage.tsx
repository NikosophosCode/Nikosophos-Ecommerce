import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/features/products/ui/ProductGrid'
import { ProductDialog } from '@/features/products/ui/ProductDialog'
import { Header } from '@/components/Header'
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
        
        {/* Navegación de categorías separada */}
        <div className="glass rounded-2xl p-4 mb-6">
          <CategoryNav />
        </div>
        
        <main>
          <ProductGrid
            params={searchQuery ? { title: searchQuery } : {}}
            onProductClick={setSelectedProduct}
          />
        </main>

        <ProductDialog
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  )
}
