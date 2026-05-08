import { useState, useEffect } from 'react'
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
  const debounced = useDebounce(input, 250)
  const navigate = useNavigate()

  useKeyboardShortcut('k', () => setOpen(true), { ctrl: true })

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleClose = () => {
    setOpen(false)
    setInput('')
  }

  const handleSearch = (term) => {
    const q = (term ?? input).trim()
    if (!q) return
    saveRecent(q)
    setRecent(getRecent())
    handleClose()
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

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

  return (
    <>
      {/* Trigger button in Navbar calls setOpen — exposed via context-free shortcut */}
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
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search AI tools…"
                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-subtle focus:outline-none"
                  />
                  {input && (
                    <button
                      onClick={() => setInput('')}
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
                <div className="max-h-80 overflow-y-auto py-2">
                  {results.length > 0 ? (
                    <>
                      <p className="px-4 py-1.5 text-xs font-semibold text-subtle uppercase tracking-wider">
                        Results
                      </p>
                      {results.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => { handleClose(); navigate(`/tool/${tool.id}`) }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-overlay transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 bg-surface-overlay">
                            <img
                              src={getLogoUrl(tool.logo)}
                              alt={tool.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=32` }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{tool.name}</p>
                            <p className="text-xs text-muted truncate">{tool.tagline}</p>
                          </div>
                          <ArrowRight size={14} className="text-subtle shrink-0" />
                        </button>
                      ))}
                      {/* Search all results link */}
                      <button
                        onClick={() => handleSearch(input)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-overlay transition-colors text-left cursor-pointer border-t border-border mt-1"
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
                          {recent.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleSearch(term)}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-overlay transition-colors text-left cursor-pointer"
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
                      {TRENDING.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => { handleClose(); navigate(`/tool/${tool.id}`) }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-overlay transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 bg-surface-overlay">
                            <img
                              src={getLogoUrl(tool.logo)}
                              alt={tool.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=32` }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{tool.name}</p>
                            <p className="text-xs text-muted truncate">{tool.tagline}</p>
                          </div>
                          <TrendingUp size={13} className="text-orange-400 shrink-0" />
                        </button>
                      ))}
                    </>
                  )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-surface-raised">
                  <span className="text-xs text-subtle flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-overlay border border-border text-[10px]">↵</kbd>
                    to search
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
