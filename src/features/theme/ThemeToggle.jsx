import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { cn } from '@/utils/cn'
import useTheme from '@/hooks/useTheme'

const ThemeToggle = ({ className }) => {
  const { isDark, toggle } = useTheme()

  const handleToggle = () => {
    toggle()
    toast(isDark ? '☀️ Light mode' : '🌙 Dark mode', { duration: 1500 })
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle
