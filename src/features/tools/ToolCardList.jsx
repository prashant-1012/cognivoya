import { Link } from 'react-router-dom'
import { Star, Bookmark, BookmarkCheck } from 'lucide-react'
import { cn } from '@/utils/cn'
import Badge from '@/components/ui/Badge'
import ToolBadge from './ToolBadge'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleBookmark, selectIsBookmarked } from '@/features/bookmarks/bookmarksSlice'
import { getLogoUrl } from '@/utils/formatters'
import toast from 'react-hot-toast'

const ToolCardList = ({ tool }) => {
  const dispatch = useAppDispatch()
  const isBookmarked = useAppSelector(selectIsBookmarked(tool.id))

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleBookmark(tool.id))
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!')
  }

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-border bg-surface-raised dark:bg-white/[0.03] dark:border-white/10 dark:backdrop-blur-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-card transition-all duration-200 group"
    >
      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-surface-overlay border border-border">
        <img
          src={getLogoUrl(tool.logo)}
          alt={tool.name}
          loading="lazy"
          width={44}
          height={44}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=0ea5e9&color=fff&size=44`
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-foreground">{tool.name}</span>
          <ToolBadge tool={tool} />
        </div>
        <p className="text-xs text-muted mt-0.5 truncate">{tool.tagline}</p>
      </div>

      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-muted">{tool.rating}</span>
        </div>
        <Badge label={tool.pricing} variant={tool.pricing} />
        <Badge label={tool.category} variant="default" />
      </div>

      <button
        onClick={handleBookmark}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        className={cn(
          'shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer',
          isBookmarked
            ? 'text-brand-primary bg-brand-primary/10'
            : 'text-subtle hover:text-brand-primary opacity-0 group-hover:opacity-100'
        )}
      >
        {isBookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
      </button>
    </Link>
  )
}

export default ToolCardList
