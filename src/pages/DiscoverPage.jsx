import { useDispatch } from 'react-redux'
import PageWrapper from '@/components/layout/PageWrapper'
import CategoryFilter from '@/features/categories/CategoryFilter'
import SortControls from '@/features/tools/SortControls'
import ToolList from '@/features/tools/ToolList'
import Pagination from '@/components/ui/Pagination'
import { useGetToolsQuery } from '@/services/toolsApi'
import { useAppSelector } from '@/app/hooks'
import { selectActiveCategory } from '@/features/categories/categoriesSlice'
import { selectSort, selectViewMode, selectCurrentPage, setPage, resetPagination } from '@/features/tools/toolsSlice'
import { setActiveCategory } from '@/features/categories/categoriesSlice'

const DiscoverPage = () => {
  const dispatch = useDispatch()
  const category = useAppSelector(selectActiveCategory)
  const sort = useAppSelector(selectSort)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)

  const { data, isLoading, isError } = useGetToolsQuery({ page: currentPage, category, sort })

  const handleReset = () => {
    dispatch(setActiveCategory('all'))
    dispatch(resetPagination())
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageWrapper className="py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Discover AI Tools</h1>
        <p className="text-sm text-muted mt-1">Browse and filter the best AI tools available</p>
      </div>

      {/* Category filter */}
      <div className="mb-5">
        <CategoryFilter />
      </div>

      {/* Sort + view controls */}
      <div className="mb-6">
        <SortControls totalCount={data?.totalCount} />
      </div>

      {/* Tool grid/list */}
      <ToolList
        tools={data?.tools}
        isLoading={isLoading}
        isError={isError}
        viewMode={viewMode}
        onReset={handleReset}
      />

      {/* Pagination */}
      {data && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </PageWrapper>
  )
}

export default DiscoverPage
