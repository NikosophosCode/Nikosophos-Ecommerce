import { useState, useMemo, useCallback } from 'react'

export type PaginationState = {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  reset: () => void
}

type UsePaginationProps = {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): PaginationState {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calcular total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage) || 1
  }, [totalItems, itemsPerPage])

  // Asegurar que la página actual esté en rango válido
  const validCurrentPage = useMemo(() => {
    if (currentPage < 1) return 1
    if (currentPage > totalPages) return totalPages
    return currentPage
  }, [currentPage, totalPages])

  // Calcular índices de inicio y fin
  const startIndex = useMemo(() => {
    return (validCurrentPage - 1) * itemsPerPage
  }, [validCurrentPage, itemsPerPage])

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems)
  }, [startIndex, itemsPerPage, totalItems])

  // Estados de navegación
  const hasNextPage = validCurrentPage < totalPages
  const hasPreviousPage = validCurrentPage > 1

  // Funciones de navegación
  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
    
    // Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(validCurrentPage + 1)
    }
  }, [hasNextPage, validCurrentPage, goToPage])

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(validCurrentPage - 1)
    }
  }, [hasPreviousPage, validCurrentPage, goToPage])

  const reset = useCallback(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  return {
    currentPage: validCurrentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    previousPage,
    reset,
  }
}
