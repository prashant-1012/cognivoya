import { X, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectSearchQuery, clearSearch } from '@/features/search/searchSlice'
import { selectActiveCategory, setActiveCategory } from '@/features/categories/categoriesSlice'
import { selectSort, setSort, resetPagination } from './toolsSlice'
import { SORT_OPTIONS } from '@/utils/constants'

const Chip = ({ label, onRemove }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-medium border border-brand-primary/20"
  >
    {label}
    <button onClick={onRemove} aria-label={`Remove ${label} filter`} className="hover:opacity-70 cursor-pointer">
      <X size={12} />
    </button>
  </motion.span>
)

const ActiveFilters = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectSearchQuery)
  const category = useAppSelector(selectActiveCategory)
  const sort = useAppSelector(selectSort)

  const defaultSort = SORT_OPTIONS[0].value
  const hasFilters = query || category !== 'all' || sort !== defaultSort

  if (!hasFilters) return null

  const resetAll = () => {
    dispatch(clearSearch())
    dispatch(setActiveCategory('all'))
    dispatch(setSort(defaultSort))
    dispatch(resetPagination())
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-subtle">Active filters:</span>

      <AnimatePresence>
        {query && (
          <Chip
            key="search"
            label={`"${query}"`}
            onRemove={() => { dispatch(clearSearch()); dispatch(resetPagination()) }}
          />
        )}
        {category !== 'all' && (
          <Chip
            key="category"
            label={category}
            onRemove={() => { dispatch(setActiveCategory('all')); dispatch(resetPagination()) }}
          />
        )}
        {sort !== defaultSort && (
          <Chip
            key="sort"
            label={SORT_OPTIONS.find((o) => o.value === sort)?.label ?? sort}
            onRemove={() => { dispatch(setSort(defaultSort)); dispatch(resetPagination()) }}
          />
        )}
      </AnimatePresence>

      <button
        onClick={resetAll}
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors cursor-pointer ml-1"
      >
        <RotateCcw size={11} />
        Reset all
      </button>
    </div>
  )
}

export default ActiveFilters
