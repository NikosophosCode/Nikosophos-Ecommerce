import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import type { Product } from '@/lib/types'
import { useProducts } from '../hooks/useProducts'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'
import { useCartStore } from '@/app/store/cartStore'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { toast } from 'sonner'

type ProductSliderProps = {
  params?: { categoryId?: number; limit?: number }
  onProductClick?: (product: Product) => void
}

export function ProductSlider({ params = {}, onProductClick }: ProductSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 30,
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { data: products, isLoading } = useProducts({ 
    limit: params.limit || 10,
    ...params 
  })

  const { addItem } = useCartStore()
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useTransform(mouseX, [-50, 50], [-20, 20])
  const parallaxY = useTransform(mouseY, [-50, 50], [-20, 20])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20)
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 6000)
    
    return () => clearInterval(autoplay)
  }, [emblaApi])

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-3xl">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-slate-300">Cargando productos...</p>
        </motion.div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[500px] rounded-3xl overflow-hidden">
      {/* Carousel Container */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {products.map((product, index) => {
            const favorite = isFavorite(product.id)
            
            return (
              <div 
                key={product.id} 
                className="flex-[0_0_100%] h-full relative"
              >
                <motion.div
                  className="relative w-full h-full"
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === selectedIndex ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background Image with Parallax */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      x: parallaxX,
                      y: parallaxY,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
                    <motion.img
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-40"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
                  </motion.div>

                  {/* Content Container */}
                  <div className="relative h-full flex items-center">
                    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                        
                        {/* Left Side - Product Info */}
                        <motion.div
                          className="space-y-3 md:space-y-4 lg:space-y-6 z-10 max-w-full overflow-hidden"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          {/* Category Badge */}
                          {product.category && (
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-xl text-white text-xs sm:text-sm font-semibold shadow-lg">
                                {product.category.name}
                              </span>
                            </motion.div>
                          )}

                          {/* Title */}
                          <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight break-words"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {product.title}
                          </motion.h2>

                          {/* Rating */}
                          <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-slate-300 text-sm sm:text-base">4.8 (120 reseñas)</span>
                          </motion.div>

                          {/* Description */}
                          {product.description && (
                            <motion.p
                              className="text-slate-300 text-sm sm:text-base md:text-lg line-clamp-3 max-w-xl"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              {product.description}
                            </motion.p>
                          )}

                          {/* Price */}
                          <motion.div
                            className="flex items-baseline gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              ${product.price.toFixed(2)}
                            </span>
                          </motion.div>

                          {/* Actions */}
                          <motion.div
                            className="flex flex-wrap gap-2 sm:gap-3 pt-2 md:pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                onProductClick?.(product)
                              }}
                              className="flex-1 sm:flex-initial px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm md:text-base shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="hidden xs:inline">Ver Detalles</span>
                              <span className="xs:hidden">Ver</span>
                            </motion.button>

                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                addItem(product.id)
                                toast.success(`${product.title} agregado al carrito`)
                              }}
                              className="flex-1 sm:flex-initial px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-2xl bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-semibold text-xs sm:text-sm md:text-base border border-white/20 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Agregar</span>
                            </motion.button>

                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (favorite) {
                                  removeFavorite(product.id)
                                  toast.info('Eliminado de favoritos')
                                } else {
                                  addFavorite(product.id)
                                  toast.success('Agregado a favoritos')
                                }
                              }}
                              className={`p-2.5 sm:p-3 md:p-4 rounded-2xl backdrop-blur-xl transition-all border ${
                                favorite
                                  ? 'bg-pink-500/90 text-white border-pink-500'
                                  : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                              }`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favorite ? 'fill-current' : ''}`} />
                            </motion.button>
                          </motion.div>
                        </motion.div>

                        {/* Right Side - Product Image */}
                        <motion.div
                          className="relative hidden lg:block"
                          initial={{ opacity: 0, x: 50, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <motion.div
                            className="relative"
                            animate={{
                              y: [0, -20, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl rounded-full" />
                            
                            <motion.img
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.title}
                              className="relative w-full max-w-lg mx-auto drop-shadow-2xl rounded-3xl"
                              whileHover={{ scale: 1.05, rotate: 2 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white shadow-2xl transition-all"
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </motion.button>

      <motion.button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white shadow-2xl transition-all"
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </motion.button>

      {/* Dots Indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === selectedIndex 
                ? 'w-6 sm:w-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' 
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </div>
  )
}
