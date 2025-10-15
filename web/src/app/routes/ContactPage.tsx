import { Link } from 'react-router-dom'

export function ContactPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-slate-300 mb-4">Esta página estará disponible próximamente</p>
          <Link to="/" className="text-blue-400 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
