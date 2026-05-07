import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSort, setViewMode, selectSort, selectViewMode } from './toolsSlice'
import { SORT_OPTIONS, VIEW_MODE } from '@/utils/constants'

const SortControls = ({ totalCount }) => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(selectSort)
  const viewMode = useAppSelector(selectViewMode)

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Result count */}
      {totalCount != null && (
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">{totalCount}</span> tools found
        </p>
      )}

      <div className="flex items-center gap-2 ml-auto">
        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="text-sm bg-surface-overlay border border-border text-foreground rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* View mode toggle */}
        <div className="flex items-center rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => dispatch(setViewMode(VIEW_MODE.GRID))}
            aria-label="Grid view"
            className={cn(
              'p-2 transition-colors cursor-pointer',
              viewMode === VIEW_MODE.GRID
                ? 'bg-brand-primary text-white'
                : 'text-muted hover:text-foreground hover:bg-surface-overlay'
            )}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => dispatch(setViewMode(VIEW_MODE.LIST))}
            aria-label="List view"
            className={cn(
              'p-2 transition-colors cursor-pointer',
              viewMode === VIEW_MODE.LIST
                ? 'bg-brand-primary text-white'
                : 'text-muted hover:text-foreground hover:bg-surface-overlay'
            )}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SortControls
