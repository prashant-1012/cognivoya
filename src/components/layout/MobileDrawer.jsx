import { X, Compass, BookmarkCheck, LayoutGrid, Sparkles, PlusCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import ThemeToggle from '@/features/theme/ThemeToggle'
import { APP_NAME } from '@/utils/constants'

const navLinks = [
  { to: '/', label: 'Home', icon: Sparkles, end: true },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/category/all', label: 'Categories', icon: LayoutGrid },
  { to: '/bookmarks', label: 'Bookmarks', icon: BookmarkCheck },
]

const MobileDrawer = ({ open, onClose, onSubmitTool }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.aside
          key="drawer"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border flex flex-col"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-border">
            <span className="font-bold text-lg text-foreground">{APP_NAME}</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-muted hover:text-foreground hover:bg-surface-overlay'
                  )
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="px-3 py-3 border-t border-border">
            <button
              onClick={() => { onClose(); onSubmitTool?.() }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors cursor-pointer"
            >
              <PlusCircle size={18} />
              Submit a Tool
            </button>
          </div>

          <div className="px-5 py-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-subtle">Theme</span>
            <ThemeToggle />
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
)

export default MobileDrawer
