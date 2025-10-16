import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './app/routes/HomePage'
import { FavoritesPage } from './app/routes/FavoritesPage'
import { CartPage } from './app/routes/CartPage'
import { ProfilePage } from './app/routes/ProfilePage'
import { ContactPage } from './app/routes/ContactPage'
import { CategoryPage } from './app/routes/CategoryPage'
import { useAuthSync } from './app/store/useAuthSync'

export default function App() {
  // Sincronizar stores con autenticación
  useAuthSync()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

