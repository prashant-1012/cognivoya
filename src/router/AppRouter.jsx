import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import PageLoader from '@/components/feedback/PageLoader'

const HomePage = lazy(() => import('@/pages/HomePage'))
const DiscoverPage = lazy(() => import('@/pages/DiscoverPage'))
const ToolDetailPage = lazy(() => import('@/pages/ToolDetailPage'))
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const SearchResultsPage = lazy(() => import('@/pages/SearchResultsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const LayoutWrapper = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </Layout>
)

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
