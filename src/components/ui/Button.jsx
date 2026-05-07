import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-brand-primary text-white hover:opacity-90 shadow-sm',
  secondary: 'bg-surface-overlay text-foreground hover:bg-border',
  ghost: 'text-muted hover:text-foreground hover:bg-surface-overlay',
  outline: 'border border-border text-foreground hover:bg-surface-overlay',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className,
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none cursor-pointer select-none',
      variants[variant],
      sizes[size],
      (disabled || loading) && 'opacity-50 cursor-not-allowed',
      className
    )}
    {...props}
  >
    {loading ? (
      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
    ) : icon ? (
      <span className="shrink-0">{icon}</span>
    ) : null}
    {children}
  </button>
)

export default Button
