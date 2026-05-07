import { cn } from '@/utils/cn'

const PageLoader = ({ className }) => (
  <div className={cn('flex items-center justify-center min-h-screen bg-surface', className)}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
      <p className="text-sm text-muted">Loading…</p>
    </div>
  </div>
)

export default PageLoader
