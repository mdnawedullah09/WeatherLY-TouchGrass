import { motion } from 'framer-motion'
import { Bell, BrainCircuit, Cloud, Database, FileText, Mic, RadioTower, Send, UserRound } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'

const pipeline = [{ label: 'User', icon: UserRound }, { label: 'Voice / Text', icon: Mic }, { label: 'OpenRouter', icon: BrainCircuit }, { label: 'Weather APIs', icon: Cloud }, { label: 'Forecast Engine', icon: RadioTower }, { label: 'Response', icon: FileText }, { label: 'Notification', icon: Bell }]
const inputs = ['OpenWeather', 'NASA', 'NOAA', 'IMD', 'MOSDAC']

export function Architecture() {
  return <section className="content-section ai-architecture-section" id="architecture"><SectionTitle eyebrow="AI architecture" title="A forecast is only as powerful as the system behind it." copy="WeatherLY connects human intent to live atmospheric data, an intelligence layer, and a response you can act on." /><div className="architecture-canvas"><div className="architecture-inputs"><small>Live inputs</small>{inputs.map((input, index) => <motion.span initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} key={input}><Cloud size={13} />{input}</motion.span>)}</div><div className="architecture-pipeline">{pipeline.map(({ label, icon: Icon }, index) => <motion.div className="architecture-node" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} key={label}><span><Icon size={18} /></span><strong>{label}</strong>{index < pipeline.length - 1 && <i className="pipeline-arrow">→</i>}</motion.div>)}</div><div className="architecture-output"><Database size={16} /><span>Personal context + response memory</span><Send size={15} /></div></div></section>
}
