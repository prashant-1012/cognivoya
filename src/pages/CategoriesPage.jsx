import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import CategoryFilter from '@/features/categories/CategoryFilter'
import SortControls from '@/features/tools/SortControls'
import ToolList from '@/features/tools/ToolList'
import Pagination from '@/components/ui/Pagination'
import { useGetToolsQuery } from '@/services/toolsApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setActiveCategory, selectActiveCategory } from '@/features/categories/categoriesSlice'
import { selectSort, selectViewMode, selectCurrentPage, setPage, resetPagination } from '@/features/tools/toolsSlice'
import { CATEGORIES } from '@/utils/constants'

const CategoriesPage = () => {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector(selectActiveCategory)
  const sort = useAppSelector(selectSort)
  const viewMode = useAppSelector(selectViewMode)
  const currentPage = useAppSelector(selectCurrentPage)

  // Sync URL slug → Redux on mount/slug change
  useEffect(() => {
    if (slug && slug !== activeCategory) {
      dispatch(setActiveCategory(slug))
      dispatch(resetPagination())
    }
  }, [slug])

  const { data, isLoading, isError } = useGetToolsQuery({
    page: currentPage,
    category: activeCategory,
    sort,
  })

  const handlePageChange = (page) => {
    dispatch(setPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === (slug ?? activeCategory))?.label ?? 'All Tools'

  return (
    <>
      <Helmet>
        <title>{categoryLabel} — Cognivoya</title>
      </Helmet>

      <PageWrapper className="py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">{categoryLabel}</h1>
          <p className="text-sm text-muted mt-1">
            {data?.totalCount != null
              ? `${data.totalCount} tools in this category`
              : 'Browse tools by category'}
          </p>
        </div>

        <div className="mb-5">
          <CategoryFilter />
        </div>

        <div className="mb-6">
          <SortControls totalCount={data?.totalCount} />
        </div>

        <ToolList
          tools={data?.tools}
          isLoading={isLoading}
          isError={isError}
          viewMode={viewMode}
          onReset={() => dispatch(setActiveCategory('all'))}
        />

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

export default CategoriesPage
