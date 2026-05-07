import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 5 page numbers with ellipsis logic
  const getVisible = () => {
    if (totalPages <= 5) return pages
    if (currentPage <= 3) return [...pages.slice(0, 5), '…', totalPages]
    if (currentPage >= totalPages - 2) return [1, '…', ...pages.slice(-5)]
    return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages]
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted hover:text-foreground hover:bg-surface-overlay disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>

      {getVisible().map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-subtle text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors cursor-pointer',
              currentPage === page
                ? 'bg-brand-primary text-white shadow-sm'
                : 'border border-border text-muted hover:text-foreground hover:bg-surface-overlay'
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted hover:text-foreground hover:bg-surface-overlay disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default Pagination
