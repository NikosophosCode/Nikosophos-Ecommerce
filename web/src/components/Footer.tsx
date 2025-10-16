import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

/**
 * Componente Footer de la aplicación
 * 
 * Features:
 * - Información de marca
 * - Enlaces de navegación
 * - Redes sociales
 * - Formulario de newsletter con validación
 * - Copyright dinámico
 * - Scroll to top
 * - Diseño responsive con estilos glass
 */
export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()
    
    // Validación de email
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      toast.error('Email inválido', {
        description: 'Por favor, ingresa un email válido',
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío (en producción, aquí iría la llamada a API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('¡Gracias por suscribirte!', {
        description: 'Recibirás nuestras novedades en tu correo',
      })
      
      setEmail('') // Limpiar formulario
    } catch {
      toast.error('Error al suscribirse', {
        description: 'Por favor, intenta de nuevo más tarde',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigationLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/', label: 'Productos' },
    { to: '/contact', label: 'Contacto' },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/NikosophosCode',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.475 2 2 6.59 2 12.253c0 4.53 2.865 8.367 6.838 9.724.5.097.683-.223.683-.497 0-.245-.01-1.062-.015-1.927-2.782.619-3.37-1.214-3.37-1.214-.455-1.185-1.11-1.5-1.11-1.5-.908-.643.07-.63.07-.63 1.003.072 1.53 1.06 1.53 1.06.893 1.57 2.343 1.117 2.913.854.092-.662.35-1.117.636-1.374-2.222-.26-4.556-1.142-4.556-5.085 0-1.123.39-2.04 1.03-2.76-.104-.26-.447-1.304.098-2.718 0 0 .84-.274 2.75 1.05A9.33 9.33 0 0 1 12 7.47c.85.004 1.705.115 2.504.337 1.91-1.324 2.748-1.05 2.748-1.05.547 1.414.204 2.458.1 2.718.64.721 1.028 1.637 1.028 2.76 0 3.953-2.338 4.822-4.566 5.077.36.32.68.948.68 1.913 0 1.38-.013 2.492-.013 2.831 0 .276.18.6.69.496C19.139 20.616 22 16.78 22 12.253 22 6.589 17.523 2 12 2Z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.146 2H21l-6.5 7.431L22 22h-6.828l-4.77-6.211L4.8 22H2l7.077-8.09L2 2h6.914l4.32 5.77L18.146 2Zm-2.39 18h2.2L8.34 4H6.03l9.726 16Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  return (
    <footer className="mx-auto px-4 sm:px-6 lg:px-8 pb-3 mt-12">
      <section className="glass rounded-2xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="font-semibold tracking-tight text-lg">Nikosophos Store</h2>
            <p className="mt-1 text-sm text-slate-300 text-balance">
              Productos únicos para gente única.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-md mb-2">Secciones</h3>
            <ul className="flex justify-center gap-4">
              {navigationLinks.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="block px-1 py-0.5 rounded hover:bg-white/5 transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <nav aria-label="Redes sociales" className="flex justify-center items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                {social.icon}
              </a>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="sm:col-span-3 lg:col-span-1">
            <h3 className="font-semibold text-sm mb-2">Suscríbete a nuestro newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <label className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email..."
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-white/5 ring-1 ring-white/10 focus:ring-2 focus:ring-sky-400/60 px-4 py-2.5 placeholder:text-slate-400 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Email para newsletter"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[2.5rem] px-3 rounded-xl bg-sky-500/90 hover:bg-sky-500 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Suscribirse al newsletter"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  'Enviar'
                )}
              </button>
            </form>
            <p className="mt-1 text-xs text-slate-400">
              Al suscribirte aceptas nuestra política de privacidad.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="col-span-full mt-3 pt-3 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {currentYear} Nikosophos Store. Todos los derechos reservados.</span>
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg hover:bg-white/5 transition text-sm"
              aria-label="Ir arriba"
            >
              Ir arriba ↑
            </button>
          </div>
        </div>
      </section>
    </footer>
  )
}
