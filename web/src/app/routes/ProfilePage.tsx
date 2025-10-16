import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/app/store/authStore'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { EditProfileForm } from '@/features/profile'
import { useState } from 'react'

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const cartCount = useCartStore((state) => state.getTotalCount())
  const favoritesCount = useFavoritesStore((state) => state.favorites.size)
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout()
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-2 md:px-4 py-4">
          <Header />
          
          <div className="max-w-2xl mx-auto mt-8">
            <div className="glass rounded-2xl p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Perfil de usuario</h1>
              <p className="text-slate-300 mb-6">
                Debes iniciar sesión para ver tu perfil
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-2 md:px-4 py-4">
        <Header />
        
        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="glass rounded-2xl p-6 text-center md:col-span-1">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
                    }}
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-sm text-slate-400 mb-4">{user.email}</p>
              <p className="text-xs text-slate-500">
                Miembro desde {new Date(user.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="md:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-400">{cartCount}</p>
                    <p className="text-sm text-slate-400 mt-1">Productos en carrito</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-purple-400">{favoritesCount}</p>
                    <p className="text-sm text-slate-400 mt-1">Favoritos</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Editar perfil</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Editar
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div>
                    <EditProfileForm />
                    <button
                      onClick={() => setIsEditing(false)}
                      className="mt-4 w-full bg-slate-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-400">Nombre</p>
                      <p className="text-white font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Email</p>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Acciones</h3>
                <div className="space-y-3">
                  <Link
                    to="/cart"
                    className="block w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 py-2 px-4 rounded-lg font-semibold hover:bg-blue-500/30 transition-all text-center"
                  >
                    Ver mi carrito
                  </Link>
                  <Link
                    to="/favorites"
                    className="block w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 py-2 px-4 rounded-lg font-semibold hover:bg-purple-500/30 transition-all text-center"
                  >
                    Ver mis favoritos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

