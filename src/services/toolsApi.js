import { apiSlice } from './apiSlice'

export const toolsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query({
      query: ({ page = 1, category = 'all', sort = 'newest', search = '' } = {}) => ({
        url: '/tools',
        params: { page, category, sort, search },
      }),
      providesTags: ['Tools'],
    }),
    getToolById: builder.query({
      query: (id) => `/tools/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Tools', id }],
    }),
  }),
})

export const { useGetToolsQuery, useGetToolByIdQuery } = toolsApi
