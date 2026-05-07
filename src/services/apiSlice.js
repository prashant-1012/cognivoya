import { createApi } from '@reduxjs/toolkit/query/react'
import { mockBaseQuery } from './mockBaseQuery'

// Swap mockBaseQuery → fetchBaseQuery(baseUrl) when a real API is ready
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  tagTypes: ['Tools', 'Categories'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
})
