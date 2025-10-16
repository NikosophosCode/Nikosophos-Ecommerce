import { useState } from 'react'
import { validateCoupon } from '@/lib/utils'
import { toast } from 'sonner'
import type { Coupon } from '@/lib/constants'

type CouponInputProps = {
  subtotal: number
  appliedCoupon: Coupon | null
  onApply: (code: string) => void
  onRemove: () => void
}

export function CouponInput({ subtotal, appliedCoupon, onApply, onRemove }: CouponInputProps) {
  const [code, setCode] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = () => {
    if (!code.trim()) {
      toast.error('Ingresa un código de cupón')
      return
    }

    setIsApplying(true)
    const validation = validateCoupon(code, subtotal)

    if (!validation.valid) {
      toast.error(validation.error || 'Cupón no válido')
      setIsApplying(false)
      return
    }

    onApply(code.toUpperCase())
    toast.success(`¡Cupón aplicado! ${validation.coupon?.description}`)
    setCode('')
    setIsApplying(false)
  }

  const handleRemove = () => {
    onRemove()
    setCode('')
    toast.success('Cupón removido')
  }

  return (
    <div className="space-y-2">
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Código de cupón"
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none text-sm"
            disabled={isApplying}
          />
          <button
            onClick={handleApply}
            disabled={isApplying || !code.trim()}
            className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Aplicar
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-400">{appliedCoupon.code}</p>
              <p className="text-xs text-green-300/70">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-red-500/10 rounded transition"
            aria-label="Remover cupón"
          >
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
