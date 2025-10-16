export type Category = {
  id: number
  name: string
  slug?: string
}

export type Product = {
  id: number
  title: string
  description?: string
  price: number
  category?: Category
  images?: string[]
}

export type CartItem = {
  productId: number
  quantity: number
}

// Auth & User types
export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export type UpdateProfileData = {
  name?: string
  avatar?: string
}
