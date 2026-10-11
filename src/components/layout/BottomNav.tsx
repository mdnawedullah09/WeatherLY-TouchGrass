import { Home, Sparkles, PlaySquare, Users, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'AI', path: '/assistant', icon: Sparkles },
    { label: 'Reels', path: '/eco-reels', icon: PlaySquare },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  ]

  return (
    <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center flex-1 py-1"
            >
              <div className="relative z-10 p-1.5 transition-colors">
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={isActive ? 'text-sky-500' : 'text-slate-400'} 
                />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute top-1 w-10 h-10 bg-sky-100 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
