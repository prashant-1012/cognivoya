import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from '@/components/ui/BackToTop'

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-surface">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
    <BackToTop />
  </div>
)

export default Layout
