import { motion } from 'framer-motion'
import { Building2, Globe2, Landmark, Satellite, ShieldCheck, Sprout } from 'lucide-react'
import { Heading } from '../common/Heading'

const partners = [{ label: 'IMD', detail: 'India Meteorological Department', icon: Landmark }, { label: 'ISRO', detail: 'Space intelligence', icon: Satellite }, { label: 'MOSDAC', detail: 'Satellite data systems', icon: Globe2 }, { label: 'NASA', detail: 'Earth observations', icon: Satellite }, { label: 'NOAA', detail: 'Oceanic & atmospheric', icon: CloudIcon }, { label: 'OpenWeather', detail: 'Global weather data', icon: Globe2 }]
const missions = [{ label: 'Mission LiFE', icon: Sprout }, { label: 'Digital India', icon: Building2 }, { label: 'Smart Cities Mission', icon: Landmark }, { label: 'UN Sustainable Development Goals', icon: ShieldCheck }]

export function GovernmentIntegrations() {
  return <section className="content-section government-section" id="government"><Heading align="center" eyebrow="Trusted data sources" title="Built for citizens. Ready for institutions." copy="WeatherLY brings scientific and public infrastructure into one accessible intelligence layer." /><div className="partner-grid">{partners.map(({ label, detail, icon: Icon }, index) => <motion.div className="partner-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} whileHover={{ y: -5 }} key={label}><Icon size={22} /><span><strong>{label}</strong><small>{detail}</small></span></motion.div>)}</div><div className="mission-row">{missions.map(({ label, icon: Icon }) => <motion.div whileHover={{ scale: 1.03 }} key={label}><Icon size={17} />{label}</motion.div>)}</div><div className="integration-flow"><span>Satellite</span><i>→</i><span>Weather data</span><i>→</i><strong>WeatherLY AI engine</strong><i>→</i><span>Citizen</span></div></section>
}

function CloudIcon() { return <span className="integration-cloud">☁</span> }
