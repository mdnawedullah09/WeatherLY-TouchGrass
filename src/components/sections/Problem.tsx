import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, BrainCircuit, Cloud, Globe2, Languages, RadioTower, Satellite } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Heading } from '../common/Heading'

const sources = [
  { name: 'IMD', detail: 'Forecasts', icon: Cloud },
  { name: 'NASA', detail: 'Satellite data', icon: Satellite },
  { name: 'NOAA', detail: 'Storm signals', icon: RadioTower },
  { name: 'OpenWeather', detail: 'Live conditions', icon: Globe2 },
]

const timeline = [
  { title: 'Multiple Portals', detail: 'Weather info is scattered across bulletins and satellite products.' },
  { title: 'Complex Data', detail: 'Forecast models are hard for common users to interpret.' },
  { title: 'Delayed Insights', detail: 'Disaster managers struggle to quickly obtain actionable insights.' },
  { title: 'Lack of Conversational AI', detail: 'No intelligent platform provides support in natural language.' },
]

export function Problem() {
  const [hasConverged, setHasConverged] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHasConverged(true), 2600)
    return () => window.clearTimeout(timer)
  }, [])

  return <section className="content-section problem-story-section" id="problem"><div className="problem-story-grid"><div className="problem-story-copy"><Heading eyebrow="Current challenges" title="Weather intelligence should be accessible." copy="Background Weather information is often distributed through multiple portals, bulletins, satellite products, and forecast systems, making it difficult to quickly obtain actionable insights." /><div className="problem-timeline">{timeline.map(({ title, detail }, index) => <motion.div className="problem-timeline-item" key={title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .5 }} transition={{ delay: index * .08, duration: .45 }}><span className="timeline-number">0{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></motion.div>)}</div></div><div className="problem-visual" aria-label="Weather sources converging into WeatherLY"><div className="problem-visual-header"><span>Current weather system</span><span className={hasConverged ? 'converged' : ''}>{hasConverged ? 'Unified' : 'Scattered'}</span></div><div className="source-orbit">{sources.map(({ name, detail, icon: Icon }, index) => <motion.div className={`source-orbit-card source-orbit-${index + 1}`} key={name} initial={{ opacity: 0, scale: .7, x: index % 2 === 0 ? -35 : 35 }} animate={{ opacity: 1, scale: 1, x: hasConverged ? 0 : index % 2 === 0 ? -7 : 7, y: hasConverged ? 0 : index % 2 === 0 ? -8 : 8 }} transition={{ delay: index * .25, duration: .7, ease: 'easeOut' }}><Icon size={17} /><span><strong>{name}</strong><small>{detail}</small></span></motion.div>)}<motion.div className="convergence-lines" animate={{ opacity: hasConverged ? 1 : .35, scale: hasConverged ? 1 : .82 }} transition={{ delay: 2.3, duration: .7 }} /><motion.div className="weatherly-hub" animate={{ scale: hasConverged ? [1, 1.08, 1] : 1, boxShadow: hasConverged ? '0 0 55px rgba(56, 189, 248, .35)' : '0 0 25px rgba(56, 189, 248, .12)' }} transition={{ duration: .8 }}><BrainCircuit size={27} /><span>WeatherLY</span><small>One AI assistant</small></motion.div></div><AnimatePresence>{hasConverged && <motion.div className="problem-convergence-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><Languages size={16} /> Real-time weather intelligence.</motion.div>}</AnimatePresence><div className="problem-confusion"><AlertTriangle size={16} /><span>Scattered data creates delayed actions.</span></div></div></div></section>
}
