import { useState } from 'react'
import { ProductGrid } from '@/features/products/ui/ProductGrid'
import { ProductDialog } from '@/features/products/ui/ProductDialog'
import { Header } from '@/components/Header'
import type { Product } from '@/lib/types'

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="min-h-screen p-4">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
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
