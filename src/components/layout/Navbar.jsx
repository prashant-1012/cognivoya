import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, Search, BookmarkCheck, Compass, Sparkles, LayoutGrid } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import ThemeToggle from '@/features/theme/ThemeToggle'
import MobileDrawer from './MobileDrawer'
import { APP_NAME } from '@/utils/constants'
import { useAppSelector } from '@/app/hooks'
import { selectBookmarkIds } from '@/features/bookmarks/bookmarksSlice'
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut'

const navLinks = [
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/category/all', label: 'Categories', icon: LayoutGrid },
  { to: '/bookmarks', label: 'Bookmarks', icon: BookmarkCheck },
]

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bookmarkCount = useAppSelector(selectBookmarkIds).length
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useKeyboardShortcut('k', () => navigate('/search'), { ctrl: true })

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 w-full transition-all duration-200',
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-border shadow-card'
            : 'bg-surface border-b border-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-glow">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-bold text-base text-foreground hidden sm:block">{APP_NAME}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-muted hover:text-foreground hover:bg-surface-overlay'
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              {/* Search button — Ctrl+K hint */}
              <button
                onClick={() => navigate('/search')}
                aria-label="Search tools (Ctrl+K)"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border text-muted text-sm hover:border-brand-primary/40 hover:text-foreground transition-all cursor-pointer"
              >
                <Search size={14} />
                <span className="hidden lg:block">Search tools…</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-surface-overlay text-subtle text-xs border border-border">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile search icon */}
              <button
                onClick={() => navigate('/search')}
                aria-label="Search"
                className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors cursor-pointer"
              >
                <Search size={18} />
              </button>

              <ThemeToggle />

              {/* Bookmark icon with count badge */}
              <Link
                to="/bookmarks"
                aria-label={`Bookmarks (${bookmarkCount})`}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors"
              >
                <BookmarkCheck size={18} />
                {bookmarkCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {bookmarkCount > 9 ? '9+' : bookmarkCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors cursor-pointer"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
