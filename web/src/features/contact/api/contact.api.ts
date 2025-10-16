import type { ContactFormData, ContactResponse } from './contact.schemas'

/**
 * Clave de acceso de Web3Forms
 * IMPORTANTE: En producción, mover a variable de entorno
 * Para testing puedes usar tu propia clave desde https://web3forms.com
 */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'

/**
 * Endpoint de Web3Forms para envío de formularios
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Envía los datos del formulario de contacto a Web3Forms
 * 
 * @param data - Datos validados del formulario
 * @returns Promesa con la respuesta del servicio
 * @throws Error si la petición falla o el servidor retorna error
 */
export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    // Preparar payload para Web3Forms
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      // Campos adicionales para identificación
      from_name: 'Ecommerce Store Contact Form',
      // Campo honey pot para prevenir spam (opcional)
      botcheck: '',
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    // Parsear respuesta JSON
    const result = await response.json()

    // Verificar si la petición fue exitosa
    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
        errors: result.errors,
      }
    }

    // Retornar respuesta exitosa
    return {
      success: true,
      message: result.message || '¡Mensaje enviado con éxito! Te contactaremos pronto.',
    }
  } catch (error) {
    // Manejo de errores de red u otros errores inesperados
    console.error('Error sending contact form:', error)
    
    return {
      success: false,
      message: error instanceof Error 
        ? `Error de conexión: ${error.message}` 
        : 'No se pudo conectar con el servidor. Verifica tu conexión.',
    }
  }
}

/**
 * Valida si la clave de Web3Forms está configurada
 * Útil para mostrar advertencias en desarrollo
 */
export function isWeb3FormsConfigured(): boolean {
  return WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE' && WEB3FORMS_ACCESS_KEY.length > 0
}
