import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Bookmark, BookmarkCheck } from 'lucide-react'
import { cn } from '@/utils/cn'
import Badge from '@/components/ui/Badge'
import ToolBadge from './ToolBadge'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleBookmark, selectIsBookmarked } from '@/features/bookmarks/bookmarksSlice'
import { formatNumber, getLogoUrl } from '@/utils/formatters'
import toast from 'react-hot-toast'

const pricingVariant = { free: 'free', freemium: 'freemium', paid: 'paid' }

const ToolCard = ({ tool }) => {
  const dispatch = useAppDispatch()
  const isBookmarked = useAppSelector(selectIsBookmarked(tool.id))

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleBookmark(tool.id))
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!', {
      icon: isBookmarked ? '🗑️' : '🔖',
    })
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="group relative"
    >
      <Link
        to={`/tool/${tool.id}`}
        className="flex flex-col h-full rounded-2xl border border-border bg-surface-raised dark:bg-white/[0.03] dark:border-white/10 dark:backdrop-blur-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-soft transition-all duration-200 overflow-hidden"
      >
        {/* Card header */}
        <div className="flex items-start justify-between p-5 pb-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-overlay border border-border">
              <img
                src={getLogoUrl(tool.logo)}
                alt={tool.name}
                loading="lazy"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=0ea5e9&color=fff&size=48`
                }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">{tool.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star size={11} className="text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-xs text-muted">{tool.rating}</span>
                <span className="text-xs text-subtle">({formatNumber(tool.reviewCount)})</span>
              </div>
            </div>
          </div>

          {/* Bookmark button */}
          <button
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
            className={cn(
              'shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer',
              isBookmarked
                ? 'text-brand-primary bg-brand-primary/10'
                : 'text-subtle hover:text-brand-primary hover:bg-brand-primary/10 opacity-0 group-hover:opacity-100'
            )}
          >
            {isBookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          </button>
        </div>

        {/* Tagline */}
        <p className="px-5 text-xs text-muted leading-relaxed line-clamp-2">{tool.tagline}</p>

        {/* Footer */}
        <div className="mt-auto px-5 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <ToolBadge tool={tool} />
            <Badge label={tool.pricing} variant={pricingVariant[tool.pricing]} />
          </div>
          <Badge label={tool.category} variant="category" className="shrink-0" />
        </div>
      </Link>
    </motion.div>
  )
}

export default ToolCard
