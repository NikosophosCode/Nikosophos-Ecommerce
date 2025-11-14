import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { PaginationState } from '../hooks/usePagination'

type PaginationProps = {
  pagination: PaginationState
  className?: string
}

export function Pagination({ pagination, className = '' }: PaginationProps) {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
  } = pagination

  // Generar array de páginas a mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7 // Máximo de botones visibles
    
    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Siempre mostrar primera página
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Páginas alrededor de la actual
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Siempre mostrar última página
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <motion.nav
      className={`flex items-center justify-center gap-1 sm:gap-2 ${className} w-full max-w-full overflow-x-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {/* Primera página - Oculto en móvil */}
        <motion.button
          onClick={() => goToPage(1)}
          disabled={!hasPreviousPage}
          className={`hidden md:flex p-2 rounded-xl transition-all ${
            hasPreviousPage
              ? 'glass-card hover:bg-white/10 text-white'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
          whileHover={hasPreviousPage ? { scale: 1.05 } : {}}
          whileTap={hasPreviousPage ? { scale: 0.95 } : {}}
          title="Primera página"
        >
          <ChevronsLeft className="w-5 h-5" />
        </motion.button>

        {/* Página anterior */}
        <motion.button
          onClick={previousPage}
          disabled={!hasPreviousPage}
          className={`p-1.5 sm:p-2 rounded-xl transition-all ${
            hasPreviousPage
              ? 'glass-card hover:bg-white/10 text-white'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
          whileHover={hasPreviousPage ? { scale: 1.05 } : {}}
          whileTap={hasPreviousPage ? { scale: 0.95 } : {}}
          title="Página anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>

        {/* Números de página */}
        <div className="flex items-center gap-1 sm:gap-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 sm:px-2 py-2 text-slate-400 text-xs sm:text-base"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <motion.button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`min-w-[36px] sm:min-w-[44px] px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl font-semibold transition-all text-xs sm:text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'glass-card hover:bg-white/10 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={false}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
              >
                {pageNumber}
              </motion.button>
            )
          })}
        </div>

        {/* Página siguiente */}
        <motion.button
          onClick={nextPage}
          disabled={!hasNextPage}
          className={`p-1.5 sm:p-2 rounded-xl transition-all ${
            hasNextPage
              ? 'glass-card hover:bg-white/10 text-white'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
          whileHover={hasNextPage ? { scale: 1.05 } : {}}
          whileTap={hasNextPage ? { scale: 0.95 } : {}}
          title="Página siguiente"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>

        {/* Última página - Oculto en móvil */}
        <motion.button
          onClick={() => goToPage(totalPages)}
          disabled={!hasNextPage}
          className={`hidden md:flex p-2 rounded-xl transition-all ${
            hasNextPage
              ? 'glass-card hover:bg-white/10 text-white'
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
          whileHover={hasNextPage ? { scale: 1.05 } : {}}
          whileTap={hasNextPage ? { scale: 0.95 } : {}}
          title="Última página"
        >
          <ChevronsRight className="w-5 h-5" />
        </motion.button>

        {/* Info de página - Solo números en móvil */}
        <motion.div
          className="ml-1 sm:ml-2 md:ml-4 px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 rounded-xl glass-card text-xs sm:text-sm text-slate-300 whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-bold text-white">{currentPage}</span>
          <span className="mx-0.5 sm:mx-1">/</span>
          <span className="font-bold text-white">{totalPages}</span>
        </motion.div>
      </div>
    </motion.nav>
  )
}
