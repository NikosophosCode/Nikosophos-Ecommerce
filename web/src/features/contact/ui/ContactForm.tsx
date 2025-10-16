import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { contactFormSchema, type ContactFormData } from '../api/contact.schemas'
import { sendContactForm, isWeb3FormsConfigured } from '../api/contact.api'

/**
 * Componente de formulario de contacto con validación completa
 * Features:
 * - Validación con Zod + React Hook Form
 * - Estados de loading/success/error
 * - Accesibilidad (ARIA, labels, focus management)
 * - Feedback visual con toasts
 * - Diseño responsive con estilos glass
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    // Verificar configuración antes de enviar
    if (!isWeb3FormsConfigured()) {
      toast.error('Configuración pendiente', {
        description: 'El formulario de contacto aún no está configurado. Por favor, contacta al administrador.',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const response = await sendContactForm(data)

      if (response.success) {
        // Éxito: mostrar toast, limpiar formulario, marcar como exitoso
        toast.success('¡Mensaje enviado!', {
          description: response.message,
        })
        setSubmitSuccess(true)
        reset() // Limpiar formulario
      } else {
        // Error del servidor: mostrar mensaje específico
        toast.error('Error al enviar', {
          description: response.message,
        })
      }
    } catch (error) {
      // Error inesperado
      toast.error('Error inesperado', {
        description: 'Ocurrió un problema al enviar tu mensaje. Intenta de nuevo.',
      })
      console.error('Unexpected error in ContactForm:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Mensaje de éxito */}
      {submitSuccess && (
        <div
          className="glass rounded-2xl p-6 mb-6 border border-green-500/20 bg-green-500/10"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                ¡Mensaje enviado con éxito!
              </h3>
              <p className="text-slate-300 text-sm">
                Gracias por contactarnos. Responderemos a la brevedad posible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass rounded-2xl p-6 md:p-8 space-y-6"
        noValidate
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Envíanos un mensaje</h2>
          <p className="text-slate-400 text-sm">
            Completa el formulario y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        {/* Campo: Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
            Nombre completo <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
              errors.name ? 'border-red-500' : 'border-slate-700'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            placeholder="Juan Pérez"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Campo: Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
            Correo electrónico <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
              errors.email ? 'border-red-500' : 'border-slate-700'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            placeholder="juan@ejemplo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo: Asunto */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-200 mb-2">
            Asunto <span className="text-red-400">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
              errors.subject ? 'border-red-500' : 'border-slate-700'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            placeholder="Consulta sobre productos"
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-400" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Campo: Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
            Mensaje <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
              errors.message ? 'border-red-500' : 'border-slate-700'
            } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y min-h-[120px]`}
            placeholder="Escribe tu mensaje aquí... (mínimo 20 caracteres)"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
          />
          <p id="message-hint" className="mt-2 text-xs text-slate-400">
            Mínimo 20 caracteres, máximo 2000
          </p>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Campo: Consentimiento (checkbox) */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              {...register('consent')}
              className={`mt-1 w-4 h-4 rounded border ${
                errors.consent ? 'border-red-500' : 'border-slate-700'
              } bg-slate-800/50 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer`}
              aria-invalid={errors.consent ? 'true' : 'false'}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
            />
            <label htmlFor="consent" className="text-sm text-slate-300 cursor-pointer">
              Acepto la{' '}
              <a href="#" className="text-blue-400 hover:underline">
                política de privacidad
              </a>{' '}
              y el procesamiento de mis datos personales <span className="text-red-400">*</span>
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" className="mt-2 ml-7 text-sm text-red-400" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25"
            aria-label={isSubmitting ? 'Enviando mensaje...' : 'Enviar mensaje'}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
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
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Enviar mensaje
              </span>
            )}
          </button>
        </div>

        {/* Nota informativa */}
        <p className="text-xs text-slate-500 text-center">
          Los campos marcados con <span className="text-red-400">*</span> son obligatorios
        </p>
      </form>
    </div>
  )
}
