import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ProductGrid } from '@/features/products/ui/ProductGrid'
import { ProductDialog } from '@/features/products/ui/ProductDialog'
import { Header } from '@/components/Header'
import { useCategories } from '@/features/categories'
import type { Product } from '@/lib/types'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const { data: categories } = useCategories()
  
  // Convertir slug a categoryId (el slug en la URL es el ID)
  const categoryId = slug ? parseInt(slug) : undefined
  
  // Obtener nombre de la categoría
  const category = categories?.find(c => c.id === categoryId)
  
  // Query params para búsqueda
  const searchQuery = searchParams.get('q') || ''
  
  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }

  if (!categoryId) {
    return (
      <div className="min-h-screen p-4">
        <Header onSearch={handleSearch} searchQuery={searchQuery} />
        <div className="container mx-auto">
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-slate-300 mb-4">Categoría no encontrada</p>
            <Link to="/" className="text-blue-400 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {category?.name || 'Categoría'}
          </h1>
          <p className="text-slate-400">
            Explora todos los productos en esta categoría
          </p>
        </div>

        <ProductGrid
          params={{
            categoryId,
            ...(searchQuery && { title: searchQuery })
          }}
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
