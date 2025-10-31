import { type FC } from 'react'

import s from './Pagination.module.scss'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  itemsPerPageOptions?: number[]
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
}) => {
  // Если элементов меньше чем itemsPerPage, показываем только 1 страницу
  const effectiveTotalPages = totalItems <= itemsPerPage ? 1 : totalPages

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    // Если только одна страница, возвращаем [1]
    if (effectiveTotalPages === 1) {
      return [1]
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(effectiveTotalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < effectiveTotalPages - 1) {
      rangeWithDots.push('...', effectiveTotalPages)
    } else {
      rangeWithDots.push(effectiveTotalPages)
    }

    return rangeWithDots
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < effectiveTotalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={s.pagination}>
      <div className={s.controls}>
        <button
          type={'button'}
          className={`${s.pageButton} ${currentPage === 1 ? s.disabled : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {visiblePages.map((page, index) => (
          <button
            type={'button'}
            key={index}
            className={`${s.pageButton} ${page === currentPage ? s.active : ''} ${
              typeof page === 'string' ? s.dots : ''
            }`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page === 'string'}
          >
            {page}
          </button>
        ))}

        <button
          type={'button'}
          className={`${s.pageButton} ${currentPage === effectiveTotalPages ? s.disabled : ''}`}
          onClick={handleNext}
          disabled={currentPage === effectiveTotalPages}
        >
          ›
        </button>
      </div>

      <div className={s.info}>
        <span className={s.showText}>Show</span>
        <select
          className={s.select}
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(Number(e.target.value))}
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={s.pageText}>on page</span>
      </div>
    </div>
  )
}
