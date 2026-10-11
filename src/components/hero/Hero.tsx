import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BellRing, CloudRain, CloudSun, Leaf, Map, MessageSquare, Mic, ShieldAlert, Sparkles, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50">
      
            <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-slate-50 to-slate-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
                <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start justify-center max-w-2xl"
        >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 border border-sky-200 mb-6">
            <Sparkles size={14} className="text-sky-600" />
            <span className="text-xs font-semibold tracking-wider text-sky-800 uppercase">
              AI-Powered Weather Intelligence
            </span>
          </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Weather intelligence, <br className="hidden sm:block" />
            made <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">conversational.</span>
          </h1>

                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-10 max-w-xl">
            Get real-time weather insights, forecasts, alerts, maps and environmental intelligence through one intelligent AI platform.
          </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <Link 
              to="/dashboard" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-900 !text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
            >
              Experience WeatherLY
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center w-full sm:w-auto bg-white text-slate-700 px-7 py-3.5 rounded-full text-base font-semibold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
            >
              Explore Dashboard
            </Link>
          </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              "Real-time weather",
              "Multilingual AI",
              "Disaster alerts"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

                <div className="relative flex justify-center items-center h-[700px] lg:h-[800px] mt-10 lg:mt-0 perspective-1000">
          
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-400/20 rounded-full blur-[100px] pointer-events-none" />

                    <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[320px] h-[650px] bg-white rounded-[44px] border-[10px] border-slate-900 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-20"
          >
                        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
              <div className="w-32 h-6 bg-slate-900 rounded-b-[18px]" />
            </div>
            
                        <div className="flex-1 bg-slate-50 pt-12 pb-6 px-5 flex flex-col gap-6 overflow-hidden">
              
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-slate-500 font-medium text-xs mb-1">Good morning 👋</p>
                <h2 className="text-slate-900 font-bold text-lg">Here's your weather update</h2>
              </div>

                            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-5 text-white shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Patna, Bihar</h3>
                    <p className="text-sky-100 text-xs">Cloudy</p>
                  </div>
                  <CloudSun size={32} className="text-white drop-shadow-md" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">31°</span>
                  <span className="text-sky-100 font-medium text-sm">C</span>
                </div>
                <p className="text-sky-100 text-xs mt-1">Feels like 32°C</p>
                
                                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-[9px] text-sky-200 uppercase tracking-wider mb-1">Humidity</p>
                    <p className="text-xs font-semibold">78%</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-sky-200 uppercase tracking-wider mb-1">Wind</p>
                    <p className="text-xs font-semibold">4.2 km/h</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-sky-200 uppercase tracking-wider mb-1">AQI</p>
                    <p className="text-xs font-semibold">42 Good</p>
                  </div>
                </div>
              </div>

                            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={14} className="text-sky-600" />
                </div>
                <p className="text-slate-400 text-xs flex-1 truncate">Ask WeatherLY anything...</p>
                <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors">
                  <Mic size={16} />
                </button>
              </div>

                            <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: MessageSquare, label: 'AI Chat', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: Map, label: 'Weather Map', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                  { icon: ShieldAlert, label: 'Alerts', color: 'text-rose-500', bg: 'bg-rose-50' },
                  { icon: BellRing, label: 'Advisories', color: 'text-amber-500', bg: 'bg-amber-50' },
                  { icon: Leaf, label: 'EcoReels', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { icon: BarChart3, label: 'Analytics', color: 'text-violet-500', bg: 'bg-violet-50' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${item.bg} ${item.color} shadow-sm border border-slate-50`}>
                      <item.icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-600">{item.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

                    <motion.div 
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -left-8 lg:-left-20 top-24 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-start gap-3 w-48 hover:-translate-y-1 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
              <CloudRain size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">Rain Alert</p>
              <p className="text-[10px] text-slate-500 leading-tight">Heavy rainfall expected in 45 min</p>
            </div>
          </motion.div>

                    <motion.div 
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute -right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-start gap-3 w-44 hover:-translate-y-1 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-500">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">AI Forecast</p>
              <p className="text-[10px] text-slate-500 leading-tight">72% humidity • 31°C</p>
            </div>
          </motion.div>

                    <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -left-4 lg:-left-12 bottom-20 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 pr-6 hover:-translate-y-1 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-500">
              <Wind size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 mb-0.5">Air Quality</p>
              <p className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">Good • AQI 42</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
