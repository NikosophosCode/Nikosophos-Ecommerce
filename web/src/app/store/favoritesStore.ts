import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoritesStore = {
  favorites: Set<number>
  addFavorite: (productId: number) => void
  removeFavorite: (productId: number) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
  // Métodos para sincronización con usuario
  getGuestData: () => Set<number>
  loadUserData: (userId: string) => void
  migrateGuestData: (userId: string) => void
}

// Función helper para obtener la key de almacenamiento según el usuario
const getStorageKey = (userId?: string) => {
  return userId ? `favorites-storage-${userId}` : 'favorites-storage-guest'
}

// Función para obtener datos del store de un usuario específico
const getUserFavoritesData = (userId: string): Set<number> => {
  try {
    const stored = localStorage.getItem(getStorageKey(userId))
    if (stored) {
      const parsed = JSON.parse(stored)
      return new Set(parsed.state?.favorites || [])
    }
  } catch (error) {
    console.error('Error loading user favorites data:', error)
  }
  return new Set()
}

// Función para guardar datos de un usuario
const saveUserFavoritesData = (userId: string, favorites: Set<number>) => {
  try {
    const data = {
      state: {
        favorites: Array.from(favorites),
      },
    }
    localStorage.setItem(getStorageKey(userId), JSON.stringify(data))
  } catch (error) {
    console.error('Error saving user favorites data:', error)
  }
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Set<number>(),

      addFavorite: (productId) => {
        set((state) => {
          const newFavorites = new Set(state.favorites)
          newFavorites.add(productId)
          return { favorites: newFavorites }
        })
      },

      removeFavorite: (productId) => {
        set((state) => {
          const newFavorites = new Set(state.favorites)
          newFavorites.delete(productId)
          return { favorites: newFavorites }
        })
      },

      toggleFavorite: (productId) => {
        const isFav = get().isFavorite(productId)
        if (isFav) {
          get().removeFavorite(productId)
        } else {
          get().addFavorite(productId)
        }
      },

      isFavorite: (productId) => {
        return get().favorites.has(productId)
      },

      clearFavorites: () => set({ favorites: new Set() }),

      getGuestData: () => {
        return new Set(get().favorites)
      },

      loadUserData: (userId: string) => {
        const userFavorites = getUserFavoritesData(userId)
        set({ favorites: userFavorites })
      },

      migrateGuestData: (userId: string) => {
        const guestFavorites = get().favorites
        const userFavorites = getUserFavoritesData(userId)
        
        // Combinar: unir ambos sets
        const mergedFavorites = new Set([...userFavorites, ...guestFavorites])

        // Guardar y aplicar
        saveUserFavoritesData(userId, mergedFavorites)
        set({ favorites: mergedFavorites })
      },
    }),
    {
      name: 'favorites-storage-guest', // Siempre usar guest por defecto
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              favorites: new Set(state.favorites || []),
            },
          }
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
