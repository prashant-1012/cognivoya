export const APP_NAME = 'Cognivoya'
export const APP_TAGLINE = 'Discover the best AI tools for every use case'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'az', label: 'A → Z' },
]

export const CATEGORIES = [
  { slug: 'all', label: 'All Tools' },
  { slug: 'text', label: 'Text & Writing' },
  { slug: 'image', label: 'Image & Art' },
  { slug: 'video', label: 'Video' },
  { slug: 'code', label: 'Code & Dev' },
  { slug: 'audio', label: 'Audio & Music' },
  { slug: 'productivity', label: 'Productivity' },
  { slug: 'research', label: 'Research' },
  { slug: 'chat', label: 'Chatbots' },
  { slug: 'data', label: 'Data & Analytics' },
  { slug: 'design', label: 'Design & UI' },
  { slug: 'marketing', label: 'Marketing' },
]

export const TOOLS_PER_PAGE = 12

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const VIEW_MODE = {
  GRID: 'grid',
  LIST: 'list',
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
