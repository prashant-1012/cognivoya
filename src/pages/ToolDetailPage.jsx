import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, BookmarkCheck, Bookmark,
  Tag, Calendar, Layers, Copy, Check,
} from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import PageWrapper from '@/components/layout/PageWrapper'
import ToolCard from '@/features/tools/ToolCard'
import ToolSkeleton from '@/features/tools/ToolSkeleton'
import Badge from '@/components/ui/Badge'
import ToolBadge from '@/features/tools/ToolBadge'
import Button from '@/components/ui/Button'
import { useGetToolByIdQuery } from '@/services/toolsApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleBookmark, selectIsBookmarked } from '@/features/bookmarks/bookmarksSlice'
import { selectSubmittedTools } from '@/features/submissions/submissionsSlice'
import { rateTool, selectUserRating } from '@/features/ratings/ratingsSlice'
import StarRating, { StarDisplay } from '@/components/ui/StarRating'
import { getLogoUrl, formatNumber, formatDate } from '@/utils/formatters'

const pricingVariant = { free: 'free', freemium: 'freemium', paid: 'paid' }

const ToolDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isBookmarked = useAppSelector(selectIsBookmarked(id))
  const userRating = useAppSelector(selectUserRating(id))
  const [copied, setCopied] = useState(false)

  const submittedTools = useAppSelector(selectSubmittedTools)
  const { data: mockTool, isLoading, isError } = useGetToolByIdQuery(id)

  // Fall back to user-submitted tools when the mock query can't find the id
  const tool = isError || !mockTool
    ? submittedTools.find((t) => t.id === id) ?? null
    : mockTool

  const handleBookmark = () => {
    dispatch(toggleBookmark(id))
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!', {
      icon: isBookmarked ? '🗑️' : '🔖',
    })
  }

  const handleRate = (rating) => {
    dispatch(rateTool({ toolId: id, rating }))
    if (rating) toast.success(`You rated ${tool.name} ${rating} star${rating !== 1 ? 's' : ''}!`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success('Link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading && !tool) return <ToolDetailSkeleton />

  if (!tool) {
    return (
      <PageWrapper className="py-20 text-center">
        <p className="text-2xl font-bold text-foreground mb-2">Tool not found</p>
        <p className="text-muted mb-6">This tool doesn't exist or was removed.</p>
        <Button onClick={() => navigate('/discover')}>Browse all tools</Button>
      </PageWrapper>
    )
  }

  return (
    <>
      <Helmet>
        <title>{tool.name} — Cognivoya</title>
        <meta name="description" content={tool.tagline} />
        <meta property="og:title" content={`${tool.name} — Cognivoya`} />
        <meta property="og:description" content={tool.tagline} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://www.google.com/s2/favicons?domain=${tool.logo}&sz=128`} />
      </Helmet>

      <PageWrapper className="py-10">
        {/* Back nav */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-surface-raised dark:bg-white/[0.03] dark:border-white/10 dark:backdrop-blur-sm p-6 md:p-10 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Logo */}
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-border bg-surface-overlay shadow-card">
                <img
                  src={getLogoUrl(tool.logo)}
                  alt={tool.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=0ea5e9&color=fff&size=96`
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-black text-foreground">{tool.name}</h1>
                <ToolBadge tool={tool} />
              </div>

              <p className="text-base text-muted mb-4 leading-relaxed">{tool.tagline}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <StarDisplay value={tool.rating} size={15} />
                  <span className="font-semibold text-foreground text-sm">{tool.rating}</span>
                  <span className="text-xs text-muted">({formatNumber(tool.reviewCount)} reviews)</span>
                </div>
                <Badge label={tool.pricing} variant={pricingVariant[tool.pricing]} />
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Layers size={13} />
                  <Link
                    to={`/category/${tool.category}`}
                    className="hover:text-brand-primary transition-colors capitalize"
                  >
                    {tool.category}
                  </Link>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Calendar size={13} />
                  Added {formatDate(tool.addedAt)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  <Button icon={<ExternalLink size={16} />}>
                    Visit {tool.name}
                  </Button>
                </a>

                <Button
                  variant={isBookmarked ? 'secondary' : 'outline'}
                  icon={isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  onClick={handleBookmark}
                >
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>

                <Button
                  variant="ghost"
                  icon={copied ? <Check size={16} /> : <Copy size={16} />}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy link'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Description */}
            <section className="rounded-2xl border border-border bg-surface-raised p-6">
              <h2 className="font-bold text-foreground mb-3">About {tool.name}</h2>
              <p className="text-sm text-muted leading-relaxed">{tool.description}</p>
            </section>

            {/* Rate this tool */}
            <section className="rounded-2xl border border-border bg-surface-raised p-6">
              <h2 className="font-bold text-foreground mb-1">Rate this tool</h2>
              <p className="text-xs text-muted mb-4">
                {userRating ? 'Your rating is saved locally.' : 'How would you rate your experience?'}
              </p>
              <StarRating value={userRating} onChange={handleRate} />
            </section>

            {/* Tags */}
            {tool.tags?.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface-raised p-6">
                <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Tag size={15} /> Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-lg bg-surface-overlay border border-border text-xs text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-surface-raised p-6">
              <h2 className="font-bold text-foreground mb-4">Details</h2>
              <dl className="flex flex-col gap-3">
                {[
                  { label: 'Pricing', value: <Badge label={tool.pricing} variant={pricingVariant[tool.pricing]} /> },
                  { label: 'Category', value: <Link to={`/category/${tool.category}`} className="text-sm text-brand-primary capitalize hover:underline">{tool.category}</Link> },
                  { label: 'Rating', value: <span className="flex items-center gap-1.5"><StarDisplay value={tool.rating} size={12} /><span className="text-sm text-foreground">{tool.rating}</span></span> },
                  { label: 'Reviews', value: <span className="text-sm text-foreground">{formatNumber(tool.reviewCount)}</span> },
                  { label: 'Added', value: <span className="text-sm text-foreground">{formatDate(tool.addedAt)}</span> },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 pt-4 border-t border-border">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-brand-primary text-brand-primary text-sm font-medium hover:bg-brand-primary hover:text-white transition-all"
                >
                  <ExternalLink size={14} />
                  Open {tool.name}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related tools */}
        {tool.related?.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Related Tools</h2>
              <Link
                to={`/category/${tool.category}`}
                className="text-sm text-brand-primary hover:underline font-medium"
              >
                View all in {tool.category} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tool.related.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </section>
        )}
      </PageWrapper>
    </>
  )
}

const ToolDetailSkeleton = () => {
  const Shimmer = ({ className }) => (
    <div className={`rounded-lg bg-surface-overlay animate-pulse ${className}`} />
  )
  return (
    <PageWrapper className="py-10">
      <Shimmer className="h-4 w-16 mb-8" />
      <div className="rounded-3xl border border-border bg-surface-raised p-6 md:p-10 mb-8">
        <div className="flex gap-6">
          <Shimmer className="w-24 h-24 rounded-2xl shrink-0" />
          <div className="flex-1 flex flex-col gap-3">
            <Shimmer className="h-8 w-48" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
            <div className="flex gap-3 mt-2">
              <Shimmer className="h-9 w-32 rounded-xl" />
              <Shimmer className="h-9 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Shimmer className="h-40 rounded-2xl" />
        </div>
        <Shimmer className="h-52 rounded-2xl" />
      </div>
    </PageWrapper>
  )
}

export default ToolDetailPage
