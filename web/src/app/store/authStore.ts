import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string) => Promise<User>
  logout: () => void
  updateProfile: (data: { name?: string; avatar?: string }) => Promise<void>
}

// Mock de base de datos local (localStorage)
const USERS_KEY = 'app_users'

function getUsers(): Record<string, { email: string; password: string; user: User }> {
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveUsers(users: Record<string, { email: string; password: string; user: User }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        const users = getUsers()
        const userRecord = users[email.toLowerCase()]

        if (!userRecord || userRecord.password !== password) {
          throw new Error('Credenciales inválidas')
        }

        set({ user: userRecord.user, isAuthenticated: true })
        return userRecord.user
      },

      register: async (email: string, password: string, name: string) => {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        const users = getUsers()
        const emailLower = email.toLowerCase()

        if (users[emailLower]) {
          throw new Error('El email ya está registrado')
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          email: emailLower,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${emailLower}`,
          createdAt: new Date().toISOString(),
        }

        users[emailLower] = {
          email: emailLower,
          password,
          user: newUser,
        }

        saveUsers(users)
        set({ user: newUser, isAuthenticated: true })
        return newUser
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: async (data: { name?: string; avatar?: string }) => {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        const { user } = get()
        if (!user) {
          throw new Error('No hay usuario autenticado')
        }

        const updatedUser: User = {
          ...user,
          ...(data.name && { name: data.name }),
          ...(data.avatar && { avatar: data.avatar }),
        }

        // Actualizar en "base de datos"
        const users = getUsers()
        const userRecord = users[user.email]
        if (userRecord) {
          userRecord.user = updatedUser
          saveUsers(users)
        }

        set({ user: updatedUser })
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
