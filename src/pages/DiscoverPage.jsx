import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import CategoryFilter from '@/features/categories/CategoryFilter'
import SortControls from '@/features/tools/SortControls'
import ActiveFilters from '@/features/tools/ActiveFilters'
import ToolList from '@/features/tools/ToolList'
import Pagination from '@/components/ui/Pagination'
import SearchBar from '@/features/search/SearchBar'
import { useGetToolsQuery } from '@/services/toolsApi'
import { useAppSelector } from '@/app/hooks'
import { selectSearchQuery, clearSearch } from '@/features/search/searchSlice'
import { selectActiveCategory, setActiveCategory } from '@/features/categories/categoriesSlice'
import { selectSort, selectViewMode, selectCurrentPage, setPage, resetPagination, setSort } from '@/features/tools/toolsSlice'

const DiscoverPage = () => {
  const dispatch = useDispatch()
  const query = useAppSelector(selectSearchQuery)
  const category = useAppSelector(selectActiveCategory)
  const sort = useAppSelector(selectSort)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)

  const { data, isLoading, isError } = useGetToolsQuery({
    page: currentPage,
    category,
    sort,
    search: query,
  })

  const handleReset = () => {
    dispatch(clearSearch())
    dispatch(setActiveCategory('all'))
    dispatch(setSort('newest'))
    dispatch(resetPagination())
  }

  const handlePageChange = (page) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
    <Helmet>
      <title>Discover AI Tools — Cognivoya</title>
      <meta name="description" content="Browse and filter 2,400+ AI tools by category, sort by popularity, and find exactly what you need." />
    </Helmet>
    <PageWrapper className="py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Discover AI Tools</h1>
        <p className="text-sm text-muted mt-1">Browse and filter the best AI tools available</p>
      </div>

      {/* Search bar */}
      <div className="mb-5">
        <SearchBar placeholder="Search by name, category, or use case…" />
      </div>

      {/* Category filter */}
      <div className="mb-4">
        <CategoryFilter />
      </div>

      {/* Sort + view controls */}
      <div className="mb-3">
        <SortControls totalCount={data?.totalCount} />
      </div>

      {/* Active filter chips */}
      <div className="mb-6">
        <ActiveFilters />
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
    </>
  )
}

export default DiscoverPage
