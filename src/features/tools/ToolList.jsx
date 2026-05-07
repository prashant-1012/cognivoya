import { motion } from 'framer-motion'
import ToolCard from './ToolCard'
import ToolCardList from './ToolCardList'
import ToolSkeleton from './ToolSkeleton'
import EmptyState from '@/components/feedback/EmptyState'
import { VIEW_MODE } from '@/utils/constants'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const ToolList = ({ tools, isLoading, isError, viewMode = VIEW_MODE.GRID, onReset }) => {
  if (isLoading) {
    return (
      <div
        className={
          viewMode === VIEW_MODE.GRID
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-3'
        }
      >
        <ToolSkeleton count={12} viewMode={viewMode} />
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load tools"
        description="Something went wrong while fetching tools. Please try again."
        action={onReset}
        actionLabel="Retry"
      />
    )
  }

  if (!tools?.length) {
    return (
      <EmptyState
        title="No tools found"
        description="Try a different search term or clear the active filters."
        action={onReset}
        actionLabel="Clear filters"
      />
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={
        viewMode === VIEW_MODE.GRID
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'flex flex-col gap-3'
      }
    >
      {tools.map((tool) => (
        <motion.div key={tool.id} variants={item}>
          {viewMode === VIEW_MODE.GRID ? (
            <ToolCard tool={tool} />
          ) : (
            <ToolCardList tool={tool} />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ToolList
