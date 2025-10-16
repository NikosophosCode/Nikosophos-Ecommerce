import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/app/store/authStore'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'

/**
 * Hook que sincroniza los stores de cart y favorites con el usuario autenticado.
 * - Al hacer login: migra datos de guest a usuario
 * - Al hacer logout: limpia los stores y vuelve a guest
 */
export function useAuthSync() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const migrateCartData = useCartStore((state) => state.migrateGuestData)
  const loadCartData = useCartStore((state) => state.loadUserData)
  const migrateFavoritesData = useFavoritesStore((state) => state.migrateGuestData)
  const loadFavoritesData = useFavoritesStore((state) => state.loadUserData)
  
  // Mantener referencia del userId anterior para detectar cambios
  const prevUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    const currentUserId = user?.id || null
    const prevUserId = prevUserIdRef.current

    // Usuario acaba de hacer login (de null a userId)
    if (currentUserId && !prevUserId && isAuthenticated) {
      console.log('🔄 Migrando datos de guest a usuario:', currentUserId)
      migrateCartData(currentUserId)
      migrateFavoritesData(currentUserId)
    }
    
    // Usuario acaba de hacer logout (de userId a null)
    else if (!currentUserId && prevUserId) {
      console.log('🔄 Limpiando datos de usuario, volviendo a guest')
      // Los stores ya están configurados para usar guest por defecto
      // No necesitamos hacer nada especial, solo recargar la página o resetear
      loadCartData('guest')
      loadFavoritesData('guest')
    }
    
    // Usuario cambió (caso de cambio de cuenta, aunque no es común)
    else if (currentUserId && prevUserId && currentUserId !== prevUserId) {
      console.log('🔄 Cambiando de usuario:', prevUserId, '→', currentUserId)
      loadCartData(currentUserId)
      loadFavoritesData(currentUserId)
    }

    // Actualizar referencia
    prevUserIdRef.current = currentUserId
  }, [user?.id, isAuthenticated, migrateCartData, migrateFavoritesData, loadCartData, loadFavoritesData])
}
