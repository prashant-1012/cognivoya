import { cn } from '@/utils/cn'

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }

const Spinner = ({ size = 'md', className }) => (
  <span
    className={cn(
      'inline-block rounded-full border-2 border-current border-t-transparent animate-spin text-brand-primary',
      sizes[size],
      className
    )}
  />
)

export default Spinner
