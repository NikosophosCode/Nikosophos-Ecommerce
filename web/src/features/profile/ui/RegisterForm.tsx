import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/app/store/authStore'
import { toast } from 'sonner'

const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

type RegisterFormProps = {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const register_auth = useAuthStore((state) => state.register)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await register_auth(data.email, data.password, data.name)
      toast.success('¡Cuenta creada correctamente!')
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-1">
          Nombre
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">
          Contraseña
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-1">
          Confirmar contraseña
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creando cuenta...' : 'Registrarse'}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      )}
    </form>
  )
}
