import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/services/apiSlice'
import themeReducer from '@/features/theme/themeSlice'
import searchReducer from '@/features/search/searchSlice'
import toolsReducer from '@/features/tools/toolsSlice'
import bookmarksReducer from '@/features/bookmarks/bookmarksSlice'
import categoriesReducer from '@/features/categories/categoriesSlice'
import submissionsReducer from '@/features/submissions/submissionsSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    search: searchReducer,
    tools: toolsReducer,
    bookmarks: bookmarksReducer,
    categories: categoriesReducer,
    submissions: submissionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
