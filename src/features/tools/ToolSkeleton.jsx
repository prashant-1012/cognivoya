import { cn } from '@/utils/cn'

const Shimmer = ({ className }) => (
  <div className={cn('rounded-lg bg-surface-overlay animate-pulse', className)} />
)

const ToolSkeletonCard = () => (
  <div className="flex flex-col rounded-2xl border border-border bg-surface-raised p-5 gap-3">
    <div className="flex items-center gap-3">
      <Shimmer className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <Shimmer className="h-3.5 w-32" />
        <Shimmer className="h-3 w-20" />
      </div>
    </div>
    <Shimmer className="h-3 w-full" />
    <Shimmer className="h-3 w-3/4" />
    <div className="flex gap-2 mt-1">
      <Shimmer className="h-5 w-20 rounded-md" />
      <Shimmer className="h-5 w-16 rounded-md" />
    </div>
  </div>
)

const ToolSkeletonList = () => (
  <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-border bg-surface-raised">
    <Shimmer className="w-11 h-11 rounded-xl shrink-0" />
    <div className="flex-1 flex flex-col gap-2">
      <Shimmer className="h-3.5 w-40" />
      <Shimmer className="h-3 w-64" />
    </div>
    <Shimmer className="hidden sm:block h-5 w-16 rounded-md" />
  </div>
)

const ToolSkeleton = ({ count = 6, viewMode = 'grid' }) =>
  Array.from({ length: count }, (_, i) =>
    viewMode === 'grid' ? <ToolSkeletonCard key={i} /> : <ToolSkeletonList key={i} />
  )

export default ToolSkeleton
