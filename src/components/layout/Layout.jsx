import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-surface">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
)

export default Layout
