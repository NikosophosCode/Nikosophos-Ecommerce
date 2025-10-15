import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'

export function FavoritesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto px-2 md:px-4 py-4">
        <Header />
        
        <h1 className="text-3xl font-bold mb-6">Favoritos</h1>
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-slate-300 mb-4">Esta página estará disponible próximamente</p>
          <Link to="/" className="text-blue-400 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
