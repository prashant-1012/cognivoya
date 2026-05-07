import { cn } from '@/utils/cn'

const PageWrapper = ({ children, className, wide = false }) => (
  <main
    className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      wide ? 'max-w-screen-2xl' : 'max-w-7xl',
      className
    )}
  >
    {children}
  </main>
)

export default PageWrapper
