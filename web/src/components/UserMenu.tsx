import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/app/store/authStore'
import { toast } from 'sonner'

export function UserMenu() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
  }

  if (!user) return null

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 transition">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
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
        <span className="hidden md:inline text-sm font-medium">{user.name}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right glass rounded-xl p-1 focus:outline-none border border-white/10">
          <div className="px-3 py-2 border-b border-white/10">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>

          <MenuItem>
            {({ focus }) => (
              <Link
                to="/profile"
                className={`${
                  focus ? 'bg-white/10' : ''
                } group flex w-full items-center rounded-lg px-3 py-2 text-sm text-white transition`}
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <Link
                to="/favorites"
                className={`${
                  focus ? 'bg-white/10' : ''
                } group flex w-full items-center rounded-lg px-3 py-2 text-sm text-white transition`}
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favoritos
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <Link
                to="/cart"
                className={`${
                  focus ? 'bg-white/10' : ''
                } group flex w-full items-center rounded-lg px-3 py-2 text-sm text-white transition`}
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Mi Carrito
              </Link>
            )}
          </MenuItem>

          <div className="border-t border-white/10 my-1" />

          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleLogout}
                className={`${
                  focus ? 'bg-red-500/20 text-red-400' : 'text-white'
                } group flex w-full items-center rounded-lg px-3 py-2 text-sm transition`}
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
