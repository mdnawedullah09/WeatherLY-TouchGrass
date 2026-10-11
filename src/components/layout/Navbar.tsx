import { AnimatePresence, motion } from 'framer-motion'
import { CloudSun, Menu, ArrowRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavItem = { label: string; path: string }

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Assistant', path: '/assistant' },
  { label: 'Maps', path: '/maps' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'EcoReels', path: '/eco-reels' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'About', path: '/about' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 h-[64px]' : 'bg-transparent h-[72px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-8">
          
                    <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={closeMenu}>
            <div className="bg-sky-500 p-1.5 rounded-lg group-hover:bg-sky-600 transition-colors">
              <CloudSun size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              WeatherLY
            </span>
          </Link>

                    <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map(({ label, path }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={label}
                  to={path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border border-sky-200 rounded-full"
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

                    <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/dashboard"
              className="group flex items-center gap-2 bg-slate-900 !text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-md active:scale-95"
            >
              Experience WeatherLY 
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

                    <button
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

            <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-6 gap-2">
              {navItems.map(({ label, path }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={label}
                    to={path}
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl text-base font-medium ${
                      isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="h-px bg-slate-200 my-4" />
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3.5 rounded-xl text-base font-medium hover:bg-slate-800 transition-colors"
              >
                Experience WeatherLY <ArrowRight size={18} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
