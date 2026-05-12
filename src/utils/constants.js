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

// Unique color per category — used consistently on cards, pills, badges, detail pages
// Each entry: { text, bg, border, active } — all Tailwind classes
export const CATEGORY_COLORS = {
  all:          { text: 'text-slate-400',   bg: 'bg-slate-400/10',   border: 'border-slate-400/30',   active: 'bg-slate-500 text-white'         },
  text:         { text: 'text-sky-400',     bg: 'bg-sky-400/10',     border: 'border-sky-400/30',     active: 'bg-sky-500 text-white'           },
  image:        { text: 'text-pink-400',    bg: 'bg-pink-400/10',    border: 'border-pink-400/30',    active: 'bg-pink-500 text-white'          },
  video:        { text: 'text-red-400',     bg: 'bg-red-400/10',     border: 'border-red-400/30',     active: 'bg-red-500 text-white'           },
  code:         { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', active: 'bg-emerald-500 text-white'       },
  audio:        { text: 'text-violet-400',  bg: 'bg-violet-400/10',  border: 'border-violet-400/30',  active: 'bg-violet-500 text-white'        },
  productivity: { text: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/30',   active: 'bg-amber-500 text-white'         },
  research:     { text: 'text-cyan-400',    bg: 'bg-cyan-400/10',    border: 'border-cyan-400/30',    active: 'bg-cyan-500 text-white'          },
  chat:         { text: 'text-indigo-400',  bg: 'bg-indigo-400/10',  border: 'border-indigo-400/30',  active: 'bg-indigo-500 text-white'        },
  data:         { text: 'text-orange-400',  bg: 'bg-orange-400/10',  border: 'border-orange-400/30',  active: 'bg-orange-500 text-white'        },
  design:       { text: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/30', active: 'bg-fuchsia-500 text-white'       },
  marketing:    { text: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-400/30',    active: 'bg-rose-500 text-white'          },
}

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
