import { Link, useLocation } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'

export function CategoryNav() {
  const { data: categories, isLoading, isError } = useCategories()
  const location = useLocation()

  if (isLoading) {
    return (
      <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shimmer h-9 w-24 rounded-lg" />
        ))}
      </nav>
    )
  }

  if (isError || !categories) {
    return null
  }

  const isActiveCategory = (categoryId: number) => {
    const match = location.pathname.match(/\/category\/(\d+)/)
    return match && parseInt(match[1]) === categoryId
  }

  const isHome = location.pathname === '/'

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" aria-label="Categorías de productos">
      <Link
        to="/"
        className={`
          px-4 py-2 rounded-lg whitespace-nowrap transition-all
          ${isHome 
            ? 'bg-blue-500 rounded-lg text-white shadow-md shadow-blue-500/50' 
            : 'bg-white/5 hover:bg-white/10 border border-white/10'
          }
        `}
      >
        Todas
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className={`
            px-4 py-2 rounded-lg whitespace-nowrap transition-all
            ${isActiveCategory(category.id)
              ? 'bg-blue-500 rounded-lg text-white shadow-md shadow-blue-500/50'
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }
          `}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
