import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BellRing, Leaf, Map, MessageSquare, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'AI Weather Assistant',
    description: 'Ask questions in plain language and get instant, intelligent weather insights and forecasts.',
    icon: MessageSquare,
    to: '/assistant',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Live Weather Maps',
    description: 'Explore interactive radar maps with real-time precipitation, temperature, and wind overlays.',
    icon: Map,
    to: '/maps',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Smart Alerts',
    description: 'Receive proactive notifications for severe weather events and atmospheric changes.',
    icon: ShieldAlert,
    to: '/alerts',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    title: 'Weather Advisories',
    description: 'Expert guidance and safety recommendations based on current and forecasted conditions.',
    icon: BellRing,
    to: '/advisory',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Environmental Insights',
    description: 'Monitor air quality, UV index, and eco-metrics to understand your local environment.',
    icon: Leaf,
    to: '/eco-reels',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Weather Analytics',
    description: 'Dive deep into historical climate data, trends, and comprehensive meteorological reports.',
    icon: BarChart3,
    to: '/analytics',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function Features() {
  return (
    <section className="w-full py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
                <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Everything you need to understand the weather.
          </h2>
          <p className="text-lg text-slate-600">
            A complete suite of intelligent tools designed to give you clarity and control over your environment.
          </p>
        </div>

                <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link 
                to={feature.to}
                className="group block h-full bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-lg hover:border-slate-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} ${feature.color} mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-sky-600 mt-auto opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Explore feature <ArrowRight size={16} className="ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
