import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BookmarkX, Compass, Inbox, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import ToolCard from '@/features/tools/ToolCard'
import ToolCardList from '@/features/tools/ToolCardList'
import SortControls from '@/features/tools/SortControls'
import Button from '@/components/ui/Button'
import SubmitToolModal from '@/features/submissions/SubmitToolModal'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectBookmarkIds } from '@/features/bookmarks/bookmarksSlice'
import { selectSubmittedTools, removeSubmission } from '@/features/submissions/submissionsSlice'
import { selectViewMode } from '@/features/tools/toolsSlice'
import { mockTools } from '@/data/mockTools'
import { VIEW_MODE } from '@/utils/constants'
import { cn } from '@/utils/cn'

const TABS = [
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'submissions', label: 'Submissions' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
}

const BookmarksPage = () => {
  const [activeTab, setActiveTab] = useState('bookmarks')
  const bookmarkIds = useAppSelector(selectBookmarkIds)
  const submittedTools = useAppSelector(selectSubmittedTools)
  const viewMode = useAppSelector(selectViewMode)

  const bookmarkedTools = mockTools.filter((t) => bookmarkIds.includes(t.id))

  const isBookmarks = activeTab === 'bookmarks'
  const tools = isBookmarks ? bookmarkedTools : submittedTools
  const count = tools.length

  return (
    <>
      <Helmet>
        <title>Bookmarks — Cognivoya</title>
      </Helmet>

      <PageWrapper className="py-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isBookmarks ? 'Your Bookmarks' : 'Your Submissions'}
            </h1>
            <p className="text-sm text-muted mt-1">
              {count > 0
                ? `${count} tool${count !== 1 ? 's' : ''} ${isBookmarks ? 'saved' : 'submitted'}`
                : isBookmarks ? 'No bookmarks yet' : 'No submissions yet'}
            </p>
          </div>
          {isBookmarks && count > 0 && (
            <Link to="/discover">
              <Button variant="outline" size="sm" icon={<Compass size={15} />}>
                Discover more
              </Button>
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-surface-overlay rounded-xl w-fit border border-border">
          {TABS.map((tab) => {
            const tabCount = tab.id === 'bookmarks' ? bookmarkIds.length : submittedTools.length
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-surface text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {tab.label}
                {tabCount > 0 && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full font-bold',
                    activeTab === tab.id
                      ? 'bg-brand-primary/15 text-brand-primary'
                      : 'bg-border text-subtle'
                  )}>
                    {tabCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        {count === 0 ? (
          isBookmarks ? <EmptyBookmarks /> : <EmptySubmissions />
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
              {tools.map((tool, i) => (
                <motion.div key={tool.id} variants={fadeUp} custom={i} initial="hidden" animate="visible">
                  {activeTab === 'submissions' ? (
                    <SubmittedToolCard tool={tool} viewMode={viewMode} />
                  ) : (
                    viewMode === VIEW_MODE.GRID
                      ? <ToolCard tool={tool} />
                      : <ToolCardList tool={tool} />
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </PageWrapper>
    </>
  )
}

const SubmittedToolCard = ({ tool, viewMode }) => {
  const dispatch = useAppDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const menuRef = useRef(null)

  // close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(removeSubmission(tool.id))
    setMenuOpen(false)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen(false)
    setEditOpen(true)
  }

  const handleMenuToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((prev) => !prev)
  }

  return (
    <>
      <div className="relative">
        {viewMode === VIEW_MODE.GRID ? <ToolCard tool={tool} /> : <ToolCardList tool={tool} />}

        {/* ⋯ button — overlays the bookmark icon position (top-right) */}
        <div ref={menuRef} className="absolute top-3 right-3 z-20">
          <button
            onClick={handleMenuToggle}
            aria-label="Tool options"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface border border-border text-muted hover:text-foreground hover:border-brand-primary/40 transition-colors cursor-pointer shadow-sm"
          >
            <MoreVertical size={14} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-10 w-36 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-30"
              >
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground hover:bg-surface-overlay transition-colors cursor-pointer"
                >
                  <Pencil size={13} className="text-muted" />
                  Edit
                </button>
                <div className="h-px bg-border mx-2" />
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SubmitToolModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editTool={tool}
      />
    </>
  )
}

const EmptyBookmarks = () => (
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

const EmptySubmissions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 gap-5 text-center"
  >
    <div className="w-20 h-20 rounded-3xl bg-surface-overlay border border-border flex items-center justify-center">
      <Inbox size={32} className="text-muted" />
    </div>
    <div>
      <p className="text-lg font-bold text-foreground">No submissions yet</p>
      <p className="text-sm text-muted mt-1 max-w-xs">
        Use the "Submit a Tool" button in the navbar to add your own AI tools.
      </p>
    </div>
  </motion.div>
)

export default BookmarksPage
