import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { Header } from '@/components/Header'
import { useCartStore } from '@/app/store/cartStore'
import { useProducts } from '@/features/products/hooks/useProducts'
import { CartItem } from '@/features/cart/ui/CartItem'
import { CouponInput } from '@/features/cart/ui/CouponInput'
import { formatCurrency, calculateDiscount, calculateTax, calculateShipping, calculateTotal } from '@/lib/utils'
import { AVAILABLE_COUPONS } from '@/lib/constants'
import { toast } from 'sonner'

export function CartPage() {
  const items = useCartStore((state) => state.items)
  const couponCode = useCartStore((state) => state.couponCode)
  const clearCart = useCartStore((state) => state.clearCart)
  const applyCoupon = useCartStore((state) => state.applyCoupon)
  const removeCoupon = useCartStore((state) => state.removeCoupon)

  // Fetch productos
  const { data: products = [], isLoading } = useProducts({})

  // Memoizar cálculos derivados
  const { cartItems, hasItems, cartProducts, subtotal, appliedCoupon, discount, tax, shipping, total } = useMemo(() => {
    const itemsArray = Object.values(items)
    const productIds = itemsArray.map((item) => item.productId)
    const filteredProducts = products.filter((p) => productIds.includes(p.id))
    
    const calculatedSubtotal = itemsArray.reduce((sum, item) => {
      const product = filteredProducts.find((p) => p.id === item.productId)
      return sum + (product?.price || 0) * item.quantity
    }, 0)

    // Validate and get coupon
    const coupon = couponCode 
      ? AVAILABLE_COUPONS.find(c => c.code === couponCode) || null
      : null

    const calculatedDiscount = calculateDiscount(calculatedSubtotal, coupon)
    const calculatedTax = calculateTax(calculatedSubtotal, calculatedDiscount)
    const calculatedShipping = calculateShipping(calculatedSubtotal)
    const calculatedTotal = calculateTotal(calculatedSubtotal, calculatedDiscount, calculatedTax, calculatedShipping)

    return {
      cartItems: itemsArray,
      hasItems: itemsArray.length > 0,
      cartProducts: filteredProducts,
      subtotal: calculatedSubtotal,
      appliedCoupon: coupon,
      discount: calculatedDiscount,
      tax: calculatedTax,
      shipping: calculatedShipping,
      total: calculatedTotal
    }
  }, [items, products, couponCode])

  const handleClearCart = () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart()
      toast.success('Carrito vaciado')
    }
  }

  const handleCheckout = () => {
    toast.info('Funcionalidad de checkout próximamente')
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-2 md:px-4 py-4">
        <Header />

        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Carrito de Compras</h1>
            {hasItems && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-400 hover:text-red-300 transition"
              >
                Vaciar carrito
              </button>
            )}
          </div>

          {!hasItems && (
            <div className="glass rounded-2xl p-12 text-center">
              <svg
                className="w-24 h-24 mx-auto mb-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-slate-300 mb-6">
                Explora nuestro catálogo y añade productos
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ir a la tienda
              </Link>
            </div>
          )}

          {hasItems && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-3 min-w-0">
                {isLoading && (
                  <div className="glass rounded-xl p-8 text-center">
                    <p className="text-slate-300">Cargando productos...</p>
                  </div>
                )}

                {!isLoading &&
                  cartItems.map((item) => {
                    const product = cartProducts.find((p) => p.id === item.productId)
                    if (!product) return null

                    return (
                      <CartItem
                        key={item.productId}
                        product={product}
                        quantity={item.quantity}
                      />
                    )
                  })}
              </div>

              {/* Resumen */}
              <div className="lg:col-span-1">
                <div className="glass rounded-xl p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Resumen</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Subtotal</span>
                      <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Descuento</span>
                        <span className="font-medium text-green-400">-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Impuestos (16%)</span>
                      <span className="font-medium">{formatCurrency(tax)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Envío</span>
                      <span className="font-medium text-green-400">
                        {shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
                      </span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* Coupon input */}
                  <div className="mb-4">
                    <CouponInput
                      subtotal={subtotal}
                      appliedCoupon={appliedCoupon}
                      onApply={applyCoupon}
                      onRemove={removeCoupon}
                    />
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition"
                  >
                    Continuar compra
                  </button>

                  <Link
                    to="/"
                    className="block text-center text-sm text-slate-400 hover:text-slate-300 mt-4 transition"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
