import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/features/products/ui/ProductGrid'
import { ProductDialog } from '@/features/products/ui/ProductDialog'
import { Header } from '@/components/Header'
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
    <div className="min-h-screen p-4">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="container mx-auto">
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
  )
}
