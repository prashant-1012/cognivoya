import { useEffect, useRef, useState } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearchQuery, selectSearchQuery } from './searchSlice'
import { resetPagination } from '@/features/tools/toolsSlice'
import useDebounce from '@/hooks/useDebounce'

const SearchBar = ({ className, autoFocus = false, placeholder = 'Search AI tools…' }) => {
  const dispatch = useAppDispatch()
  const storedQuery = useAppSelector(selectSearchQuery)
  const [input, setInput] = useState(storedQuery)
  const [isDebouncing, setIsDebouncing] = useState(false)
  const debounced = useDebounce(input, 400)
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  // When debounced value settles — push to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debounced))
    dispatch(resetPagination())
    setIsDebouncing(false)
  }, [debounced, dispatch])

  const handleChange = (e) => {
    setInput(e.target.value)
    setIsDebouncing(true)
  }

  const handleClear = () => {
    setInput('')
    setIsDebouncing(false)
    dispatch(setSearchQuery(''))
    dispatch(resetPagination())
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search
        size={16}
        className="absolute left-3.5 text-muted pointer-events-none shrink-0"
      />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-border bg-surface-overlay text-foreground text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
      />
      <div className="absolute right-3 flex items-center">
        {isDebouncing && input ? (
          <Loader2 size={14} className="text-muted animate-spin" />
        ) : input ? (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
