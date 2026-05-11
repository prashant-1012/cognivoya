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
import { CATEGORIES } from '@/utils/constants'
import { useCountUp } from '@/hooks/useCountUp'

// value: numeric target, suffix: display suffix, decimals: decimal places to show
// color: Tailwind arbitrary-value accent applied to icon, value text, and bottom border
const stats = [
  { icon: Zap,        label: 'AI Tools',        value: 2400, suffix: '+',  decimals: 0, color: { text: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-b-amber-400'  } },
  { icon: Users,      label: 'Monthly Visitors', value: 180,  suffix: 'K+', decimals: 0, color: { text: 'text-sky-400',    bg: 'bg-sky-400/10',    border: 'border-b-sky-400'    } },
  { icon: Star,       label: 'Avg Rating',       value: 4.8,  suffix: '',   decimals: 1, color: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-b-emerald-400' } },
  { icon: TrendingUp, label: 'New This Week',    value: 38,   suffix: '',   decimals: 0, color: { text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-b-violet-400' } },
]

function StatCard({ icon: Icon, label, value, suffix, decimals, color, started }) {
  const count = useCountUp(value, 1800, started)
  const display = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()
  return (
    <div className={`flex flex-col items-center gap-2 p-5 rounded-2xl bg-surface-raised border border-border border-b-2 ${color.border}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color.bg}`}>
        <Icon size={18} className={color.text} />
      </div>
      <span className={`text-2xl font-black tabular-nums ${color.text}`}>
        {display}{suffix}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
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
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl" />
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
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-surface-raised hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group"
              >
                <span className="text-2xl">{categoryEmoji[slug]}</span>
                <span className="text-xs font-medium text-muted group-hover:text-foreground transition-colors text-center">
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
