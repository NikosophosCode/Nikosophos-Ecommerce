import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/app/store/authStore'
import { toast } from 'sonner'

const editProfileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  avatar: z.string().url('URL inválida').optional().or(z.literal('')),
})

type EditProfileFormData = z.infer<typeof editProfileSchema>

export function EditProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      avatar: user?.avatar || '',
    },
  })

  const onSubmit = async (data: EditProfileFormData) => {
    setIsLoading(true)
    try {
      await updateProfile({
        name: data.name,
        avatar: data.avatar || undefined,
      })
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al actualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

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
          type="email"
          id="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-400 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-slate-500">El email no se puede modificar</p>
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-slate-200 mb-1">
          Avatar URL (opcional)
        </label>
        <input
          {...register('avatar')}
          type="url"
          id="avatar"
          className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="https://..."
        />
        {errors.avatar && (
          <p className="mt-1 text-sm text-red-400">{errors.avatar.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  )
}
