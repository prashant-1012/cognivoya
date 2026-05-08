# Cognivoya — AI Tools Discovery Platform

> Discover, filter, and bookmark the best AI tools across every category.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=flat&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel)

---

## Live Demo

🔗 **[cognivoya.vercel.app](https://cognivoya.vercel.app)**

---

## Overview

Cognivoya is a production-grade **AI Tools Discovery Platform** built as a frontend portfolio project. Inspired by Futurepedia and Product Hunt, it showcases advanced React patterns, scalable architecture, and a premium user experience.

Users can browse 60+ curated AI tools, filter by category, search with a command palette, bookmark favorites, and view detailed tool pages — all with smooth animations, dark/light theming, and PWA support.

---

## Features

| Feature | Details |
|---|---|
| **Tool Discovery Feed** | Paginated grid/list of AI tools with category filters and sort options |
| **⌘K Command Palette** | Spotlight-style search modal with live results, recent searches, trending tools |
| **Debounced Search** | 400ms debounced search with URL sync (`/search?q=...`) |
| **Category Filters** | Horizontal scrollable filter pills with tool counts per category |
| **Sort Controls** | Sort by Newest, Most Popular, Top Rated, A→Z with grid/list view toggle |
| **Active Filter Chips** | Visual chips showing active filters — individually removable |
| **Tool Detail Pages** | Full page with description, tags, related tools, bookmark + copy link |
| **Bookmarks** | Save tools to localStorage — persists across sessions, count in navbar |
| **Dark / Light Theme** | System-aware + manual toggle, animated sun/moon icon, persists to localStorage |
| **Page Transitions** | Smooth fade+slide animations on every route change via Framer Motion |
| **Skeleton Loaders** | Premium shimmer skeletons matching card dimensions exactly |
| **PWA Support** | Installable app, service worker caching, offline fallback page |
| **Responsive** | Mobile-first — fully tested on mobile, tablet, desktop |

---

## Tech Stack

### Core
- **React 19** + **Vite 8** — UI library and build tool
- **React Router v6** — client-side routing with lazy loading + code splitting

### State & Data
- **Redux Toolkit** — global client state (search, filters, theme, bookmarks)
- **RTK Query** — server state, caching, loading/error states
- **Custom mock base query** — API-agnostic architecture, swap to real API in 3 lines

### Styling
- **Tailwind CSS v4** — utility-first with `@tailwindcss/vite` plugin
- **CSS custom properties** — design token system for dark/light theming
- **clsx + tailwind-merge** — safe conditional class composition via `cn()`

### UI & Animation
- **Framer Motion** — page transitions, card animations, stagger effects
- **Radix UI** — accessible headless UI primitives
- **Lucide React** — icon system (tree-shakeable)
- **react-hot-toast** — lightweight toast notifications

### PWA & SEO
- **vite-plugin-pwa** — service worker, web app manifest, offline caching
- **react-helmet-async** — per-page meta tags and OG tags

---

## Architecture

### Feature-based folder structure
```
src/
├── app/           # Redux store + typed hooks
├── services/      # RTK Query API layer (mock-swappable)
├── features/      # Domain modules
│   ├── tools/     # ToolCard, ToolList, ToolSkeleton, SortControls, ActiveFilters
│   ├── search/    # SearchBar, SearchModal (⌘K)
│   ├── bookmarks/ # Bookmark state + BookmarkButton
│   ├── categories/# CategoryFilter + slice
│   └── theme/     # ThemeSlice, ThemeToggle, ThemeProvider
├── components/    # Shared UI atoms + layout + feedback
├── pages/         # Thin route-level containers
├── hooks/         # useDebounce, useTheme, useKeyboardShortcut...
├── utils/         # cn(), formatters, constants
└── router/        # AppRouter with lazy loading + AnimatePresence
```

### State separation
| State type | Tool | Examples |
|---|---|---|
| Server state | RTK Query | Tool lists, categories, tool detail |
| Client state | Redux slices | Search query, active filters, sort, bookmarks, theme |

### API-agnostic data layer
The app uses a custom RTK Query `mockBaseQuery` simulating a real API — pagination, filtering, sorting, search, and realistic latency. Swapping to a production API requires changing **one import** in `apiSlice.js`.

---

## Getting Started

```bash
# Clone
git clone https://github.com/your-username/cognivoya.git
cd cognivoya

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Key Engineering Decisions

**RTK Query over React Query** — RTK Query ships inside Redux Toolkit. Using both would be duplication. Same caching, invalidation, and loading state capabilities — zero extra bundle cost.

**Radix UI (headless) over MUI/Chakra** — Radix provides accessibility (ARIA, keyboard nav, focus management) for free while giving us full design ownership. Full component libraries enforce their aesthetic — not ideal for a portfolio differentiating on design.

**Mock data over a real API** — No free public API provides the correct data shape for an AI tools directory. Mock data gives full control over content quality, supports all filtering/sorting/pagination patterns, and is architecturally identical to a real API integration.

**Feature-based structure over type-based** — Grouping by domain (`features/tools/`) keeps related files together. Adding or removing a feature means touching one folder, not 5 different `components/`, `hooks/`, `slices/` directories.

---

## Performance

- Route-level code splitting — every page is a separate JS chunk
- `loading="lazy"` on all images with explicit `width`/`height`
- RTK Query — 60s cache with automatic deduplication
- Tailwind CSS — zero runtime, only used classes in production bundle
- PWA service worker — app shell cached for instant repeat visits
- Framer Motion — hardware-accelerated CSS transforms only

---

## Roadmap

- [ ] Real API integration (ProductHunt GraphQL or custom Supabase backend)
- [ ] "Submit a Tool" form with React Hook Form + Zod validation
- [ ] User authentication via Supabase
- [ ] Tool ratings and user reviews
- [ ] Infinite scroll variant alongside pagination

---

## Author

**Prashant Kumar**
[prashant2009kr@gmail.com](mailto:prashant2009kr@gmail.com)

---

*Built with React 19, Redux Toolkit, Tailwind CSS v4, Framer Motion, and Vite 8.*
