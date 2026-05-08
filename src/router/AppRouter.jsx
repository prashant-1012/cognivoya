import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/feedback/PageLoader'
import PageTransition from '@/components/layout/PageTransition'

const HomePage = lazy(() => import('@/pages/HomePage'))
const DiscoverPage = lazy(() => import('@/pages/DiscoverPage'))
const ToolDetailPage = lazy(() => import('@/pages/ToolDetailPage'))
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const SearchResultsPage = lazy(() => import('@/pages/SearchResultsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const LayoutWrapper = () => {
  const location = useLocation()
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

const AppRouter = () => (
  <Routes>
    <Route element={<LayoutWrapper />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/tool/:id" element={<ToolDetailPage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
      <Route path="/category/:slug" element={<CategoriesPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default AppRouter
