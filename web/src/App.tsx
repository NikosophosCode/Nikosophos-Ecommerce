import { useQuery } from '@tanstack/react-query'

type Category = {
  id: number
  name: string
  slug?: string
}
type Product = {
  id: number
  title: string
  description?: string
  price: number
  category?: Category
  images?: string[]
}

const API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=44'
const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=Sin+Imagen'
const CURRENCY = 'USD'
const LOCALE = 'es-ES'

function pickSafeImage(images: unknown): string {
  if (!Array.isArray(images)) return PLACEHOLDER_IMG
  const nonImgur = images.find(u => typeof u === 'string' && /^https?:\/\//i.test(u) && !/imgur\.com/i.test(u))
  if (nonImgur) return nonImgur as string
  const any = images.find(u => typeof u === 'string' && /^https?:\/\//i.test(u))
  return (any as string) || PLACEHOLDER_IMG
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(Number(n) || 0)
}

function ProductCard({ p }: { p: Product }) {
  const imgUrl = pickSafeImage(p.images)
  return (
    <article className="group rounded-2xl overflow-hidden glass ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:ring-white/20">
      <div className="relative">
        <figure className="aspect-[4/3] overflow-hidden">
          <img src={imgUrl} alt={p?.title ?? 'Producto'} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" onError={(e)=>{(e.currentTarget as HTMLImageElement).src=PLACEHOLDER_IMG}} />
        </figure>
        <span className="absolute left-2 top-2 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-xs">{p?.category?.name ?? 'general'}</span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-balance line-clamp-2 min-h-[2.5rem]">{p?.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-semibold">{fmtCurrency(p?.price || 0)}</span>
        </div>
      </div>
    </article>
  )
}

function ProductsGrid() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products', { offset: 0, limit: 44 }],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const json = await res.json()
      return Array.isArray(json) ? json : []
    },
    staleTime: 1000 * 60,
  })

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <article key={i} className="group rounded-2xl overflow-hidden glass ring-1 ring-white/10">
            <div className="aspect-[4/3] shimmer" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 shimmer rounded" />
              <div className="h-4 w-1/3 shimmer rounded" />
              <div className="h-9 w-full shimmer rounded-lg" />
            </div>
          </article>
        ))}
      </section>
    )
  }
  if (isError || !data) {
    return <div className="text-center text-slate-300 py-10">No se pudieron cargar los productos.</div>
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
      {data.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </section>
  )
}

export default function App() {
  return (
    <div className="p-4">
      <header className="glass sticky top-0 z-40 rounded-2xl p-3 mb-4">
        <h1 className="text-xl font-semibold tracking-tight">Nikosophos Store • React</h1>
        <p className="text-sm text-slate-300">Migración a React + Vite + Tailwind v4</p>
      </header>
      <ProductsGrid />
    </div>
  )
}
