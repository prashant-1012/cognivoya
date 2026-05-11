import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { getLogoUrl } from '@/utils/formatters'
import useDebounce from '@/hooks/useDebounce'
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut'
import { mockTools } from '@/data/mockTools'

const TRENDING = mockTools.filter((t) => t.isTrending).slice(0, 5)
const RECENT_KEY = 'recentSearches'

const getRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') } catch { return [] }
}
const saveRecent = (term) => {
  const prev = getRecent().filter((t) => t !== term)
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, 5)))
}

const SearchModal = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [recent, setRecent] = useState(getRecent)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const debounced = useDebounce(input, 250)
  const navigate = useNavigate()

  useKeyboardShortcut('k', () => setOpen(true), { ctrl: true })

  const handleClose = () => {
    setOpen(false)
    setInput('')
    setActiveIndex(-1)
  }

  const handleSearch = useCallback((term) => {
    const q = (term ?? input).trim()
    if (!q) return
    saveRecent(q)
    setRecent(getRecent())
    handleClose()
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }, [input, navigate])

  // Live results from mock data
  const results = debounced
    ? mockTools
        .filter(
          (t) =>
            t.name.toLowerCase().includes(debounced.toLowerCase()) ||
            t.tagline.toLowerCase().includes(debounced.toLowerCase()) ||
            t.tags.some((tag) => tag.toLowerCase().includes(debounced.toLowerCase()))
        )
        .slice(0, 6)
    : []

  // Flat list of all navigable items in current view
  const items = results.length > 0
    ? [
        ...results.map((tool) => ({
          key: tool.id,
          action: () => { handleClose(); navigate(`/tool/${tool.id}`) },
        })),
        {
          key: '__search_all__',
          action: () => handleSearch(input),
        },
      ]
    : [
        ...recent.map((term) => ({
          key: `recent-${term}`,
          action: () => handleSearch(term),
        })),
        ...TRENDING.map((tool) => ({
          key: `trending-${tool.id}`,
          action: () => { handleClose(); navigate(`/tool/${tool.id}`) },
        })),
      ]

  // Reset active index when visible items change
  useEffect(() => { setActiveIndex(-1) }, [debounced])

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  // Keyboard: Escape + Up/Down/Enter
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % items.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i <= 0 ? items.length - 1 : i - 1))
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && items[activeIndex]) {
          e.preventDefault()
          items[activeIndex].action()
        } else {
          handleSearch()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, activeIndex, items, handleSearch])

  // Helper: assign ref to each navigable row
  const rowRef = (i) => (el) => { itemRefs.current[i] = el }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[12%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
            >
              <div className="rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">

                {/* Input row */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                  <Search size={18} className="text-muted shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setActiveIndex(-1) }}
                    placeholder="Search AI tools…"
                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-subtle focus:outline-none"
                  />
                  {input && (
                    <button
                      onClick={() => { setInput(''); setActiveIndex(-1) }}
                      className="text-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-surface-overlay border border-border text-subtle text-xs">
                    Esc
                  </kbd>
                </div>

                {/* Results or defaults */}
                <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
                  {results.length > 0 ? (
                    <>
                      <p className="px-4 py-1.5 text-xs font-semibold text-subtle uppercase tracking-wider">
                        Results
                      </p>
                      {results.map((tool, i) => (
                        <button
                          key={tool.id}
                          ref={rowRef(i)}
                          onClick={items[i].action}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left cursor-pointer',
                            activeIndex === i ? 'bg-surface-overlay' : 'hover:bg-surface-overlay'
                          )}
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 bg-surface-overlay">
                            <img
                              src={getLogoUrl(tool.logo)}
                              alt={tool.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=0ea5e9&color=fff&size=32` }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{tool.name}</p>
                            <p className="text-xs text-muted truncate">{tool.tagline}</p>
                          </div>
                          <ArrowRight size={14} className="text-subtle shrink-0" />
                        </button>
                      ))}
                      {/* Search all results */}
                      <button
                        ref={rowRef(results.length)}
                        onClick={() => handleSearch(input)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left cursor-pointer border-t border-border mt-1',
                          activeIndex === results.length ? 'bg-surface-overlay' : 'hover:bg-surface-overlay'
                        )}
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                          <Search size={14} className="text-brand-primary" />
                        </div>
                        <p className="text-sm text-brand-primary font-medium">
                          Search all results for "{input}"
                        </p>
                        <ArrowRight size={14} className="text-brand-primary shrink-0 ml-auto" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Recent searches */}
                      {recent.length > 0 && (
                        <div className="mb-1">
                          <p className="px-4 py-1.5 text-xs font-semibold text-subtle uppercase tracking-wider">
                            Recent
                          </p>
                          {recent.map((term, i) => (
                            <button
                              key={term}
                              ref={rowRef(i)}
                              onClick={() => handleSearch(term)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-2 transition-colors text-left cursor-pointer',
                                activeIndex === i ? 'bg-surface-overlay' : 'hover:bg-surface-overlay'
                              )}
                            >
                              <Clock size={14} className="text-subtle shrink-0" />
                              <span className="text-sm text-muted">{term}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Trending */}
                      <p className="px-4 py-1.5 text-xs font-semibold text-subtle uppercase tracking-wider">
                        Trending
                      </p>
                      {TRENDING.map((tool, i) => {
                        const idx = recent.length + i
                        return (
                          <button
                            key={tool.id}
                            ref={rowRef(idx)}
                            onClick={() => { handleClose(); navigate(`/tool/${tool.id}`) }}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left cursor-pointer',
                              activeIndex === idx ? 'bg-surface-overlay' : 'hover:bg-surface-overlay'
                            )}
                          >
                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 bg-surface-overlay">
                              <img
                                src={getLogoUrl(tool.logo)}
                                alt={tool.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=0ea5e9&color=fff&size=32` }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{tool.name}</p>
                              <p className="text-xs text-muted truncate">{tool.tagline}</p>
                            </div>
                            <TrendingUp size={13} className="text-orange-400 shrink-0" />
                          </button>
                        )
                      })}
                    </>
                  )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-surface-raised">
                  <span className="text-xs text-subtle flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">↓</kbd>
                    to navigate
                  </span>
                  <span className="text-xs text-subtle flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">↵</kbd>
                    to open
                  </span>
                  <span className="text-xs text-subtle flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">Esc</kbd>
                    to close
                  </span>
                  <span className="text-xs text-subtle flex items-center gap-1.5 ml-auto">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">⌘K</kbd>
                    to open
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SearchModal
