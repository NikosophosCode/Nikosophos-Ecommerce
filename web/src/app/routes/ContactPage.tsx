import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/features/contact'

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto px-2 md:px-4 py-4">
        <Header />
        
        <div className="mt-8 mb-12">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contacto
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.
              Completa el formulario y te responderemos lo antes posible.
            </p>
          </div>

          {/* Formulario de contacto */}
          <ContactForm />

          {/* Información adicional */}
          <div className="max-w-2xl mx-auto mt-12">
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Otras formas de contacto</h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a
                      href="mailto:contacto@tutienda.com"
                      className="text-blue-400 hover:underline"
                    >
                      contacto@tutienda.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-white">Teléfono</p>
                    <a href="tel:+1234567890" className="text-blue-400 hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-white">Horario de atención</p>
                    <p className="text-slate-400">
                      Lunes a Viernes: 9:00 AM - 6:00 PM
                      <br />
                      Sábados: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
