import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import SearchBar from '@/features/search/SearchBar'
import ToolList from '@/features/tools/ToolList'
import SortControls from '@/features/tools/SortControls'
import Pagination from '@/components/ui/Pagination'
import { useGetToolsQuery } from '@/services/toolsApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearchQuery, selectSearchQuery } from '@/features/search/searchSlice'
import { selectSort, selectViewMode, selectCurrentPage, setPage, resetPagination } from '@/features/tools/toolsSlice'

const SearchResultsPage = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''

  const query = useAppSelector(selectSearchQuery)
  const sort = useAppSelector(selectSort)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)

  // Sync URL → Redux on mount / URL change
  useEffect(() => {
    if (urlQuery !== query) {
      dispatch(setSearchQuery(urlQuery))
      dispatch(resetPagination())
    }
  }, [urlQuery])

  // Sync Redux → URL when query changes
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
  }, [query])

  const { data, isLoading, isError } = useGetToolsQuery(
    { page: currentPage, sort, search: query, category: 'all' },
    { skip: !query }
  )

  const handlePageChange = (page) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageWrapper className="py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Search size={22} className="text-brand-primary" />
          {query ? `Results for "${query}"` : 'Search AI Tools'}
        </h1>
        {query && data?.totalCount != null && (
          <p className="text-sm text-muted mt-1">
            Found <span className="font-semibold text-foreground">{data.totalCount}</span> tools
          </p>
        )}
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-xl">
        <SearchBar autoFocus={!query} placeholder="Search tools, categories, use cases…" />
      </div>

      {!query ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-overlay flex items-center justify-center">
            <Search size={28} className="text-muted" />
          </div>
          <p className="font-semibold text-foreground">Start typing to search</p>
          <p className="text-sm text-muted max-w-xs">
            Search by tool name, category, or use case — e.g. "image generation" or "coding"
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <SortControls totalCount={data?.totalCount} />
          </div>

          <ToolList
            tools={data?.tools}
            isLoading={isLoading}
            isError={isError}
            viewMode={viewMode}
            onReset={() => dispatch(setSearchQuery(''))}
          />

          {data && (
            <Pagination
              currentPage={data.page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default SearchResultsPage
