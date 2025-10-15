import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoritesStore = {
  favorites: Set<number>
  addFavorite: (productId: number) => void
  removeFavorite: (productId: number) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
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
    }),
    {
      name: 'favorites-storage',
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
