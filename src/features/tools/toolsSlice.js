import { createSlice } from '@reduxjs/toolkit'
import { SORT_OPTIONS, VIEW_MODE } from '@/utils/constants'

const toolsSlice = createSlice({
  name: 'tools',
  initialState: {
    sort: SORT_OPTIONS[0].value,
    viewMode: VIEW_MODE.GRID,
    currentPage: 1,
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload
      state.currentPage = 1
    },
    setViewMode(state, action) {
      state.viewMode = action.payload
    },
    setPage(state, action) {
      state.currentPage = action.payload
    },
    resetPagination(state) {
      state.currentPage = 1
    },
  },
})

export const { setSort, setViewMode, setPage, resetPagination } = toolsSlice.actions
export const selectSort = (state) => state.tools.sort
export const selectViewMode = (state) => state.tools.viewMode
export const selectCurrentPage = (state) => state.tools.currentPage
export default toolsSlice.reducer
