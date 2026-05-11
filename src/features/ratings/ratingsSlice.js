import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'userRatings'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

const save = (ratings) => localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: { ratings: load() },
  reducers: {
    rateTool(state, action) {
      const { toolId, rating } = action.payload
      state.ratings[toolId] = rating
      save(state.ratings)
    },
  },
})

export const { rateTool } = ratingsSlice.actions
export const selectUserRating = (toolId) => (state) => state.ratings.ratings[toolId] ?? null
export default ratingsSlice.reducer
