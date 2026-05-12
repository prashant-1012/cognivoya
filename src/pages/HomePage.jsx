import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Sparkles, ArrowRight, Zap, Users, Star, TrendingUp } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import ToolCard from '@/features/tools/ToolCard'
import ToolSkeleton from '@/features/tools/ToolSkeleton'
import { useGetToolsQuery } from '@/services/toolsApi'
import { CATEGORIES, CATEGORY_COLORS } from '@/utils/constants'
import { cn } from '@/utils/cn'
import { useCountUp } from '@/hooks/useCountUp'

// value: numeric target, suffix: display suffix, decimals: decimal places to show
// color: Tailwind arbitrary-value accent applied to icon, value text, and bottom border
const stats = [
  { icon: Zap,        label: 'AI Tools',        value: 2400, suffix: '+',  decimals: 0, color: { text: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-b-amber-400'   }, glow: 'rgba(251,191,36,0.25)'  },
  { icon: Users,      label: 'Monthly Visitors', value: 180,  suffix: 'K+', decimals: 0, color: { text: 'text-sky-400',     bg: 'bg-sky-400/10',     border: 'border-b-sky-400'     }, glow: 'rgba(56,189,248,0.25)'  },
  { icon: Star,       label: 'Avg Rating',       value: 4.8,  suffix: '',   decimals: 1, color: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-b-emerald-400' }, glow: 'rgba(52,211,153,0.25)'  },
  { icon: TrendingUp, label: 'New This Week',    value: 38,   suffix: '',   decimals: 0, color: { text: 'text-violet-400',  bg: 'bg-violet-400/10',  border: 'border-b-violet-400'  }, glow: 'rgba(167,139,250,0.25)' },
]

function StatCard({ icon: Icon, label, value, suffix, decimals, color, glow, started }) {
  const count = useCountUp(value, 1800, started)
  const display = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 8px 24px 0 ${glow}` }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex flex-col items-center gap-2 p-5 rounded-2xl bg-surface-raised dark:bg-white/[0.03] dark:backdrop-blur-sm border border-border border-b-2 ${color.border} cursor-default`}
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${color.bg}`}
      >
        <Icon size={18} className={color.text} />
      </motion.div>
      <span className={`text-2xl font-black tabular-nums ${color.text}`}>
        {display}{suffix}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const HomePage = () => {
  const { data, isLoading } = useGetToolsQuery({ sort: 'popular', page: 1 })
  const featuredTools = data?.tools?.slice(0, 8) ?? []
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
  <>
  <Helmet>
    <title>Cognivoya — Discover the Best AI Tools</title>
    <meta name="description" content="Browse 2,400+ curated AI tools for writing, image, video, code, and more. Find the perfect AI tool for any job." />
    <meta property="og:title" content="Cognivoya — Discover the Best AI Tools" />
    <meta property="og:description" content="Browse 2,400+ curated AI tools across every category. Discover what's trending." />
    <meta property="og:type" content="website" />
  </Helmet>
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Top-left — cyan */}
        <div className="mesh-orb-1 absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-brand-primary/15 blur-[120px]" />
        {/* Top-right — violet */}
        <div className="mesh-orb-2 absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full bg-brand-secondary/12 blur-[100px]" />
        {/* Bottom-left — violet */}
        <div className="mesh-orb-3 absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-brand-secondary/10 blur-[90px]" />
        {/* Bottom-right — cyan */}
        <div className="mesh-orb-4 absolute -bottom-20 right-0 w-[450px] h-[450px] rounded-full bg-brand-primary/10 blur-[80px]" />
      </div>

      <PageWrapper className="relative">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          {/* Pill label */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-sm font-medium">
              <Sparkles size={14} />
              The AI Tools Discovery Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]"
          >
            Find the perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              AI tool
            </span>{' '}
            for any job
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            Explore 2,400+ curated AI tools across writing, image, video, code, and more.
            Discover what's trending, bookmark your favorites, and stay ahead.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/discover">
              <Button size="lg" icon={<ArrowRight size={18} />}>
                Explore Tools
              </Button>
            </Link>
            <Link to="/category/all">
              <Button size="lg" variant="outline">
                Browse Categories
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} started={statsInView} />
          ))}
        </motion.div>
      </PageWrapper>
    </section>

    {/* Featured tools section */}
    <section className="py-16 border-t border-border">
      <PageWrapper>
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground">🔥 Most Popular</h2>
            <p className="text-sm text-muted mt-1">The tools everyone is using right now</p>
          </div>
          <Link
            to="/discover"
            className="hidden sm:flex items-center gap-1.5 text-sm text-brand-primary hover:underline font-medium"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? <ToolSkeleton count={8} viewMode="grid" />
            : featuredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      </PageWrapper>
    </section>

    {/* Categories section */}
    <section className="py-16 border-t border-border">
      <PageWrapper>
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
            <p className="text-sm text-muted mt-1">Find the right tool for every workflow</p>
          </div>
          <Link
            to="/category/all"
            className="hidden sm:flex items-center gap-1.5 text-sm text-brand-primary hover:underline font-medium"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.filter((c) => c.slug !== 'all').map(({ slug, label }, i) => (
            <motion.div
              key={slug}
              variants={fadeUp}
              custom={i * 0.05}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                to={`/category/${slug}`}
                style={{ '--cat-color': 'var(--tw-ring-color)' }}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-2xl border bg-surface-raised transition-all duration-200 group hover:scale-[1.03] hover:bg-surface-overlay',
                  CATEGORY_COLORS[slug]?.border ?? 'border-border'
                )}
              >
                <span className={cn('text-xl group-hover:scale-110 transition-transform duration-200', CATEGORY_COLORS[slug]?.text)}>
                  {categoryEmoji[slug]}
                </span>
                <span className={cn('text-xs font-medium transition-colors text-center text-muted group-hover:text-foreground')}>
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </PageWrapper>
    </section>

    {/* CTA banner */}
    <section className="py-16">
      <PageWrapper>
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary p-10 md:p-14 text-center"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative flex flex-col items-center gap-4">
            <Sparkles size={32} className="text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              New AI tools every week
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md">
              Stay ahead of the curve. Discover what's new, what's trending, and what's worth your time.
            </p>
            <Link to="/discover">
              <button className="mt-2 px-6 py-3 rounded-xl bg-white text-brand-primary font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                Start Exploring
              </button>
            </Link>
          </div>
        </motion.div>
      </PageWrapper>
    </section>
  </div>
  </>
  )
}

const categoryEmoji = {
  text: '✍️',
  image: '🎨',
  video: '🎬',
  code: '💻',
  audio: '🎵',
  productivity: '⚡',
  research: '🔬',
  chat: '💬',
  data: '📊',
  design: '🖌️',
  marketing: '📣',
}

export default HomePage
