import Badge from '@/components/ui/Badge'

const ToolBadge = ({ tool }) => {
  if (tool.isStaffPick) return <Badge label="⭐ Staff Pick" variant="staffpick" />
  if (tool.isTrending) return <Badge label="🔥 Trending" variant="trending" />
  if (tool.isNew) return <Badge label="✨ New" variant="new" />
  return null
}

export default ToolBadge
