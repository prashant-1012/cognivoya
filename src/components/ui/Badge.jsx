import { cn } from '@/utils/cn'

const variants = {
  default: 'bg-surface-overlay text-muted',
  primary: 'bg-brand-primary/10 text-brand-primary',
  new: 'bg-emerald-500/10 text-emerald-500',
  trending: 'bg-orange-500/10 text-orange-500',
  featured: 'bg-brand-primary/10 text-brand-primary',
  staffpick: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  free: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  paid: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  freemium: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

const Badge = ({ label, variant = 'default', className }) => (
  <span
    className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
      variants[variant],
      className
    )}
  >
    {label}
  </span>
)

export default Badge
