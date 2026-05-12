import { useRef } from 'react'
import { cn } from '@/utils/cn'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setActiveCategory, selectActiveCategory } from './categoriesSlice'
import { resetPagination } from '@/features/tools/toolsSlice'
import { useGetCategoriesQuery } from '@/services/categoriesApi'
import { CATEGORY_COLORS } from '@/utils/constants'

const CategoryFilter = () => {
  const dispatch = useAppDispatch()
  const active = useAppSelector(selectActiveCategory)
  const { data: categories = [] } = useGetCategoriesQuery()
  const scrollRef = useRef(null)

  const handleSelect = (slug) => {
    dispatch(setActiveCategory(slug))
    dispatch(resetPagination())
  }

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map(({ slug, label, count }) => (
        <button
          key={slug}
          onClick={() => handleSelect(slug)}
          className={cn(
            'shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap',
            active === slug
              ? (CATEGORY_COLORS[slug]?.active ?? 'bg-brand-primary text-white') + ' shadow-sm'
              : `bg-surface-overlay text-muted hover:text-foreground hover:bg-border`
          )}
        >
          {label}
          <span
            className={cn(
              'text-xs px-1.5 py-0.5 rounded-md font-normal',
              active === slug ? 'bg-white/20 text-white' : 'bg-surface text-subtle'
            )}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
