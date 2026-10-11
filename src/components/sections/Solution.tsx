import { motion } from 'framer-motion'
import { Activity, BarChart3, Bot, Cloud, Database, Droplets, Leaf, Map, MessageCircle, Mic, Plane, ShieldAlert, Ship, Sprout } from 'lucide-react'
import { Heading } from '../common/Heading'

const features = [
  { label: 'AI Chat', icon: MessageCircle },
  { label: 'Weather Forecast', icon: Cloud },
  { label: 'Voice Assistant', icon: Mic },
  { label: 'Weather Maps', icon: Map },
  { label: 'Disaster Alerts', icon: ShieldAlert },
  { label: 'Climate Analytics', icon: BarChart3 },
  { label: 'Farmer Advisory', icon: Sprout },
  { label: 'Marine Forecast', icon: Ship },
  { label: 'Aviation Weather', icon: Plane },
  { label: 'EcoReels', icon: Leaf },
  { label: 'Eco Currency', icon: Droplets },
  { label: 'Historical Analysis', icon: Database },
]

export function Solution() {
  return <section className="content-section solution-architecture" id="solution"><Heading align="center" eyebrow="The Objective" title="An Intelligent Conversational Platform" copy="Develop an AI-powered chatbot platform named WeatherLY that integrates meteorological datasets, forecasting models, and disaster warning systems to provide accurate, contextual, and multilingual weather intelligence through conversational interfaces." /><div className="solution-orbit"><div className="solution-orbit-ring ring-outer" /><div className="solution-orbit-ring ring-inner" />{features.map(({ label, icon: Icon }, index) => <motion.div className={`solution-node solution-node-${index + 1}`} key={label} initial={{ opacity: 0, scale: .7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .06, duration: .45, ease: 'easeOut' }}><Icon size={15} /><span>{label}</span></motion.div>)}<motion.div className="solution-core" initial={{ opacity: 0, scale: .6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8, ease: 'easeOut' }}><div className="core-pulse" /><Bot size={32} /><strong>WeatherLY</strong><small>One intelligent layer</small></motion.div><div className="solution-connectors" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></div><div className="solution-footnote"><Activity size={15} /> Every feature <span>→</span> AI <span>→</span> User</div></section>
}
