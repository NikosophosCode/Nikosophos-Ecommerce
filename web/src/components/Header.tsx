import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { useAuthStore } from '@/app/store/authStore'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { UserMenu } from './UserMenu'
import { AuthModal } from '@/features/profile'

type HeaderProps = {
  onSearch?: (query: string) => void
  searchQuery?: string
}

export function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const items = useCartStore((state) => state.items)
  const totalItems = Object.values(items).reduce((sum, item) => sum + item.quantity, 0)
  const favoritesCount = useFavoritesStore((state) => state.favorites.size)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleOpenLogin = () => {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  const handleOpenRegister = () => {
    setAuthMode('register')
    setShowAuthModal(true)
  }

  return (
    <header className="sticky top-0 z-40 px-0 py-4 mb-4">
      {/* Primera fila: Logo y menú móvil con iconos */}
      <div className="flex items-center justify-between gap-4 px-4 mb-3 md:mb-0">
        {/* Logo y menú móvil */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">
              Nikosophos Store
            </h1>
          </Link>
        </div>

        {/* Navegación principal (desktop) - oculta en móvil */}
        <div className="hidden md:block">
          <MainNav />
        </div>

        {/* Iconos favoritos y carrito (siempre visibles) + búsqueda en desktop */}
        <div className="flex items-center gap-3">
          {/* Búsqueda solo en desktop */}
          <div className="hidden md:block relative md:max-w-72">
            <input
              type="search"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Iconos de favoritos y carrito (visibles en todas las pantallas) */}
          <div className="flex items-center gap-2">
            {/* Auth buttons o User menu */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenLogin}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={handleOpenRegister}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
                >
                  Registrarse
                </button>
                {/* Icono de usuario en móvil cuando no está autenticado */}
                <button
                  onClick={handleOpenLogin}
                  className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
                  aria-label="Iniciar sesión"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            )}

            <Link
              to="/favorites"
              className="relative p-2 rounded-lg hover:bg-white/10 transition"
              aria-label={`Favoritos (${favoritesCount})`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-white/10 transition"
              aria-label={`Carrito (${totalItems})`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Segunda fila: Buscador en móvil (debajo del título) */}
      <div className="md:hidden px-4">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition text-base"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </header>
  )
}
