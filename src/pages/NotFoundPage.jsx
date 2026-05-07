import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
    <p className="text-8xl font-black text-brand-primary">404</p>
    <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
    <p className="text-muted max-w-sm">
      Looks like this page doesn't exist. Let's get you back to discovering AI tools.
    </p>
    <Link
      to="/"
      className="px-6 py-2.5 rounded-xl bg-brand-primary text-white font-medium hover:opacity-90 transition-opacity"
    >
      Go home
    </Link>
  </div>
)

export default NotFoundPage
