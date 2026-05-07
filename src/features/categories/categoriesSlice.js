import { createSlice } from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { active: 'all' },
  reducers: {
    setActiveCategory(state, action) {
      state.active = action.payload
    },
    resetCategory(state) {
      state.active = 'all'
    },
  },
})

export const { setActiveCategory, resetCategory } = categoriesSlice.actions
export const selectActiveCategory = (state) => state.categories.active
export default categoriesSlice.reducer
