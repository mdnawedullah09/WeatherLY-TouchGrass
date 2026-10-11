import { motion, AnimatePresence } from 'framer-motion'
import { CloudSun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function MobileWrapper() {
  const [showSplash, setShowSplash] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem('hasSeenSplash', 'true')
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      setShowSplash(false)
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex justify-center">
            <div className="w-full max-w-[480px] bg-[#F8FAFC] min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
        
        <AnimatePresence mode="wait">
          {showSplash ? (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 z-50 bg-[#F8FAFC] flex flex-col items-center justify-center pointer-events-none"
            >
                            <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="w-64 h-64 bg-sky-200 rounded-full blur-3xl" />
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="bg-sky-500 p-4 rounded-3xl shadow-lg shadow-sky-500/20 mb-6">
                  <CloudSun size={48} className="text-white" strokeWidth={1.5} />
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-2xl font-bold text-slate-900 tracking-tight mb-2"
                >
                  Weather Intelligence
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="text-sm font-medium text-slate-500"
                >
                  Powered by WeatherLY
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col relative w-full h-full overflow-hidden"
            >
                            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#F8FAFC]">
                <div className="pb-24 pt-[env(safe-area-inset-top)] min-h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Outlet />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

                            <BottomNav />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  )
}
