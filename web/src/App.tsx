import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthSync } from './app/store/useAuthSync'

// Lazy loading de rutas para code splitting
const HomePage = lazy(() => import('./app/routes/HomePage').then(m => ({ default: m.HomePage })))
const FavoritesPage = lazy(() => import('./app/routes/FavoritesPage').then(m => ({ default: m.FavoritesPage })))
const CartPage = lazy(() => import('./app/routes/CartPage').then(m => ({ default: m.CartPage })))
const ProfilePage = lazy(() => import('./app/routes/ProfilePage').then(m => ({ default: m.ProfilePage })))
const ContactPage = lazy(() => import('./app/routes/ContactPage').then(m => ({ default: m.ContactPage })))
const CategoryPage = lazy(() => import('./app/routes/CategoryPage').then(m => ({ default: m.CategoryPage })))

// Componente de loading para Suspense
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400">Cargando...</p>
      </div>
    </div>
  )
}

export default function App() {
  // Sincronizar stores con autenticación
  useAuthSync()

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

