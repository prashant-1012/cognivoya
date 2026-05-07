import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem('bookmarks') ?? '[]')
  } catch {
    return []
  }
}

const save = (ids) => localStorage.setItem('bookmarks', JSON.stringify(ids))

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: { ids: load() },
  reducers: {
    addBookmark(state, action) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload)
        save(state.ids)
      }
    },
    removeBookmark(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload)
      save(state.ids)
    },
    toggleBookmark(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((i) => i !== id)
      } else {
        state.ids.push(id)
      }
      save(state.ids)
    },
  },
})

export const { addBookmark, removeBookmark, toggleBookmark } = bookmarksSlice.actions
export const selectBookmarkIds = (state) => state.bookmarks.ids
export const selectIsBookmarked = (id) => (state) => state.bookmarks.ids.includes(id)
export default bookmarksSlice.reducer
