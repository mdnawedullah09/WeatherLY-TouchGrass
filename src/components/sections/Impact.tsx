import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, Clock3, Languages, ShieldCheck, Target, Users, Wheat } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SectionTitle } from '../common/SectionTitle'

const kpis = [{ value: 22, suffix: '+', label: 'Indian languages', icon: Languages }, { value: 99.9, suffix: '%', label: 'platform availability', icon: ShieldCheck }, { value: 24, suffix: '×7', label: 'weather intelligence', icon: Clock3 }, { value: 1, suffix: 'M+', label: 'citizens reach', icon: Users }, { value: 95, suffix: '%', label: 'faster decision support', icon: Target }, { value: 100, suffix: '%', label: 'AI disaster readiness', icon: ShieldCheck }]
const outcomes = [{ icon: Wheat, title: 'Farmers', detail: 'Safe irrigation', metric: '18% less water waste' }, { icon: Target, title: 'Pilots', detail: 'Better flight planning', metric: 'Fewer weather delays' }, { icon: Users, title: 'Citizens', detail: 'Early warning', metric: 'Minutes that matter' }, { icon: Building2, title: 'Government', detail: 'Disaster response', metric: 'One shared view' }]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => { let frame = 0; const timer = window.setInterval(() => { frame += 1; setCount(Math.min(value, Number((value * frame / 28).toFixed(1)))); if (frame >= 28) window.clearInterval(timer) }, 28); return () => window.clearInterval(timer) }, [value])
  return <>{count}{suffix}</>
}

export function Impact() {
  return <section className="content-section impact-section" id="impact"><div className="impact-heading"><SectionTitle eyebrow="Impact & outcomes" title="Weather intelligence that changes what happens next." copy="From a safer field to a faster response room, clearer information creates measurable resilience." /><a href="#top">See the full story <ArrowUpRight size={15} /></a></div><div className="impact-kpis">{kpis.map(({ value, suffix, label, icon: Icon }, index) => <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} key={label}><Icon size={17} /><strong><Counter value={value} suffix={suffix} /></strong><span>{label}</span></motion.div>)}</div><div className="outcomes-grid">{outcomes.map(({ icon: Icon, title, detail, metric }) => <motion.div whileHover={{ y: -4 }} key={title}><Icon size={18} /><span><strong>{title}</strong><small>{detail}</small></span><b>{metric}</b></motion.div>)}</div></section>
}
