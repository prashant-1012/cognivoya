import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'submittedTools'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const save = (tools) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tools))

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState: { tools: load() },
  reducers: {
    submitTool(state, action) {
      const tool = {
        ...action.payload,
        id: `user-${action.payload.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        rating: 4.0,
        reviewCount: 0,
        isNew: true,
        isTrending: false,
        isStaffPick: false,
        addedAt: new Date().toISOString().split('T')[0],
        isUserSubmitted: true,
      }
      state.tools.unshift(tool)
      save(state.tools)
    },
    removeSubmission(state, action) {
      state.tools = state.tools.filter((t) => t.id !== action.payload)
      save(state.tools)
    },
    updateSubmission(state, action) {
      const { id, ...changes } = action.payload
      const idx = state.tools.findIndex((t) => t.id === id)
      if (idx !== -1) {
        state.tools[idx] = { ...state.tools[idx], ...changes }
        save(state.tools)
      }
    },
  },
})

export const { submitTool, removeSubmission, updateSubmission } = submissionsSlice.actions
export const selectSubmittedTools = (state) => state.submissions.tools
export const selectSubmissionCount = (state) => state.submissions.tools.length
export default submissionsSlice.reducer
