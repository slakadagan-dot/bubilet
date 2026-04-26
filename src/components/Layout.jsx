import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
