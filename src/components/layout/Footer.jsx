import { Link } from 'react-router-dom'
import { Sparkles, ExternalLink } from 'lucide-react'
import { APP_NAME, APP_TAGLINE } from '@/utils/constants'

const Footer = () => (
  <footer className="border-t border-border bg-surface mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-bold text-base text-foreground">{APP_NAME}</span>
          </Link>
          <p className="text-sm text-muted max-w-xs leading-relaxed">{APP_TAGLINE}</p>
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface-overlay transition-colors"
            >
              <ExternalLink size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface-overlay transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Explore</p>
          {[
            { to: '/discover', label: 'All Tools' },
            { to: '/category/text', label: 'Text & Writing' },
            { to: '/category/image', label: 'Image & Art' },
            { to: '/category/code', label: 'Code & Dev' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-sm text-muted hover:text-foreground transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Company</p>
          {[
            { to: '/bookmarks', label: 'Bookmarks' },
            { to: '/discover', label: 'Discover' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-sm text-muted hover:text-foreground transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-subtle">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="text-xs text-subtle">Built with React + Redux Toolkit</p>
      </div>
    </div>
  </footer>
)

export default Footer
