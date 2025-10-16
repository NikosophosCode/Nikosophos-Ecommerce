import { z } from 'zod'

/**
 * Schema de validación para el formulario de contacto
 * Incluye validaciones de negocio y formato
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido')
    .max(254, 'El email no puede exceder 254 caracteres'),
  
  subject: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede exceder 200 caracteres'),
  
  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad'),
})

/**
 * Tipo inferido del schema para uso en componentes
 */
export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Tipo de respuesta exitosa del servicio de contacto
 */
export interface ContactSuccessResponse {
  success: true
  message: string
}

/**
 * Tipo de respuesta de error del servicio de contacto
 */
export interface ContactErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

/**
 * Tipo de respuesta general del servicio
 */
export type ContactResponse = ContactSuccessResponse | ContactErrorResponse
