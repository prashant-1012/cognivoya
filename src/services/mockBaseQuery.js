import { mockTools } from '@/data/mockTools'
import { TOOLS_PER_PAGE } from '@/utils/constants'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// Simulates network latency so skeletons and loading states are visible
const MOCK_DELAY_MS = 600

const handlers = {
  '/tools': async ({ params = {} }) => {
    await delay(MOCK_DELAY_MS)
    const { page = 1, category = 'all', sort = 'newest', search = '' } = params

    let results = [...mockTools]

    if (category && category !== 'all') {
      results = results.filter((t) => t.category === category)
    }

    if (search) {
      const q = search.toLowerCase()
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (sort === 'newest') {
      results.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    } else if (sort === 'popular') {
      results.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'az') {
      results.sort((a, b) => a.name.localeCompare(b.name))
    }

    const totalCount = results.length
    const totalPages = Math.ceil(totalCount / TOOLS_PER_PAGE)
    const start = (page - 1) * TOOLS_PER_PAGE
    const tools = results.slice(start, start + TOOLS_PER_PAGE)

    return { data: { tools, totalCount, totalPages, page: Number(page) } }
  },

  '/tools/:id': async ({ id }) => {
    await delay(MOCK_DELAY_MS)
    const tool = mockTools.find((t) => t.id === id)
    if (!tool) return { error: { status: 404, data: 'Tool not found' } }
    const related = mockTools
      .filter((t) => t.category === tool.category && t.id !== tool.id)
      .slice(0, 4)
    return { data: { ...tool, related } }
  },

  '/categories': async () => {
    await delay(MOCK_DELAY_MS / 2)
    const counts = mockTools.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    }, {})
    const categories = [
      { slug: 'all', label: 'All Tools', count: mockTools.length },
      ...Object.entries(counts).map(([slug, count]) => ({
        slug,
        label: slugToLabel(slug),
        count,
      })),
    ]
    return { data: categories }
  },
}

const slugToLabel = (slug) =>
  ({
    text: 'Text & Writing',
    image: 'Image & Art',
    video: 'Video',
    code: 'Code & Dev',
    audio: 'Audio & Music',
    productivity: 'Productivity',
    research: 'Research',
    chat: 'Chatbots',
    data: 'Data & Analytics',
    design: 'Design & UI',
    marketing: 'Marketing',
  }[slug] ?? slug)

export const mockBaseQuery = async (arg) => {
  const url = typeof arg === 'string' ? arg : arg.url
  const params = typeof arg === 'string' ? {} : (arg.params ?? {})
  try {
    // Match /tools/:id pattern
    const idMatch = url.match(/^\/tools\/(.+)$/)
    if (idMatch) return handlers['/tools/:id']({ id: idMatch[1] })
    if (handlers[url]) return handlers[url]({ params })
    return { error: { status: 404, data: `No mock handler for ${url}` } }
  } catch (e) {
    return { error: { status: 500, data: e.message } }
  }
}
