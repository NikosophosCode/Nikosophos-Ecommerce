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
