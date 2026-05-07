import { SearchX } from 'lucide-react'
import Button from '@/components/ui/Button'

const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  action,
  actionLabel,
}) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center gap-4">
    <div className="w-16 h-16 rounded-2xl bg-surface-overlay flex items-center justify-center">
      <Icon size={28} className="text-muted" />
    </div>
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted mt-1 max-w-xs">{description}</p>
    </div>
    {action && (
      <Button variant="outline" size="sm" onClick={action}>
        {actionLabel}
      </Button>
    )}
  </div>
)

export default EmptyState
