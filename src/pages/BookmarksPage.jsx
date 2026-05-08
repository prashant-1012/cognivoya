import { Link } from 'react-router-dom'
import { BookmarkX, Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import ToolCard from '@/features/tools/ToolCard'
import ToolCardList from '@/features/tools/ToolCardList'
import SortControls from '@/features/tools/SortControls'
import Button from '@/components/ui/Button'
import { useAppSelector } from '@/app/hooks'
import { selectBookmarkIds } from '@/features/bookmarks/bookmarksSlice'
import { selectViewMode } from '@/features/tools/toolsSlice'
import { mockTools } from '@/data/mockTools'
import { VIEW_MODE } from '@/utils/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
}

const BookmarksPage = () => {
  const bookmarkIds = useAppSelector(selectBookmarkIds)
  const viewMode = useAppSelector(selectViewMode)

  const bookmarkedTools = mockTools.filter((t) => bookmarkIds.includes(t.id))

  return (
    <>
      <Helmet>
        <title>Bookmarks — Cognivoya</title>
      </Helmet>

      <PageWrapper className="py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Bookmarks</h1>
            <p className="text-sm text-muted mt-1">
              {bookmarkedTools.length > 0
                ? `${bookmarkedTools.length} tool${bookmarkedTools.length !== 1 ? 's' : ''} saved`
                : 'No bookmarks yet'}
            </p>
          </div>
          {bookmarkedTools.length > 0 && (
            <Link to="/discover">
              <Button variant="outline" size="sm" icon={<Compass size={15} />}>
                Discover more
              </Button>
            </Link>
          )}
        </div>

        {bookmarkedTools.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="mb-6">
              <SortControls />
            </div>

            <div
              className={
                viewMode === VIEW_MODE.GRID
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {bookmarkedTools.map((tool, i) => (
                <motion.div key={tool.id} variants={fadeUp} custom={i} initial="hidden" animate="visible">
                  {viewMode === VIEW_MODE.GRID
                    ? <ToolCard tool={tool} />
                    : <ToolCardList tool={tool} />}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </PageWrapper>
    </>
  )
}

const Empty = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 gap-5 text-center"
  >
    <div className="w-20 h-20 rounded-3xl bg-surface-overlay border border-border flex items-center justify-center">
      <BookmarkX size={32} className="text-muted" />
    </div>
    <div>
      <p className="text-lg font-bold text-foreground">No bookmarks yet</p>
      <p className="text-sm text-muted mt-1 max-w-xs">
        Hit the bookmark icon on any tool card to save it here for quick access.
      </p>
    </div>
    <Link to="/discover">
      <Button icon={<Compass size={16} />}>Discover AI Tools</Button>
    </Link>
  </motion.div>
)

export default BookmarksPage
