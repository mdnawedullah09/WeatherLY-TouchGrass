import { motion } from 'framer-motion'
import { Activity, Droplets, Gauge, Sun, Sunrise, Sunset, ThermometerSun, Wind } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SectionTitle } from '../common/SectionTitle'

function CountValue({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame = 0
    const timer = window.setInterval(() => {
      frame += 1
      setValue(Math.min(target, Math.round((target * frame) / 24)))
      if (frame >= 24) window.clearInterval(timer)
    }, 28)
    return () => window.clearInterval(timer)
  }, [target])
  return <>{value}{suffix}</>
}

const forecast = [{ day: 'Today', temp: '28°', icon: '☔' }, { day: 'Tue', temp: '30°', icon: '☀' }, { day: 'Wed', temp: '27°', icon: '☁' }, { day: 'Thu', temp: '29°', icon: '☀' }, { day: 'Fri', temp: '26°', icon: '☔' }, { day: 'Sat', temp: '28°', icon: '☁' }, { day: 'Sun', temp: '31°', icon: '☀' }]

export function DashboardPreview() {
  return <section className="content-section live-dashboard-section" id="insights"><SectionTitle eyebrow="Live weather dashboard" title="The whole atmosphere, at a glance." copy="A powerful command surface for everyday weather, built with the calm clarity of Apple Weather and the depth of Windy." /><div className="dashboard-preview-layout"><div className="live-dashboard"><div className="live-dashboard-top"><div><span className="dashboard-location">Patna · Live now</span><h3>Heavy rain <small>28°</small></h3><p>Feels like 30° · Updated just now</p></div><div className="live-status"><i /> Live</div></div><div className="dashboard-stat-grid"><motion.div whileHover={{ y: -3 }}><ThermometerSun size={17} /><span>Temperature<strong><CountValue target={28} />°</strong></span></motion.div><motion.div whileHover={{ y: -3 }}><Droplets size={17} /><span>Humidity<strong><CountValue target={64} />%</strong></span></motion.div><motion.div whileHover={{ y: -3 }}><Wind size={17} /><span>Wind<strong><CountValue target={12} /> km/h</strong></span></motion.div><motion.div whileHover={{ y: -3 }}><Gauge size={17} /><span>Pressure<strong><CountValue target={1012} /> hPa</strong></span></motion.div><motion.div whileHover={{ y: -3 }}><Sun size={17} /><span>UV index<strong>3.2 · Low</strong></span></motion.div><motion.div whileHover={{ y: -3 }}><Activity size={17} /><span>AQI<strong><CountValue target={42} /> · Good</strong></span></motion.div></div><div className="dashboard-preview-grid"><div className="dashboard-preview-panel forecast-preview"><div className="dashboard-panel-title"><span>7-day forecast</span><small>Next week</small></div><div className="forecast-row">{forecast.map(({ day, temp, icon }) => <motion.div whileHover={{ y: -4 }} key={day}><small>{day}</small><span>{icon}</span><strong>{temp}</strong></motion.div>)}</div><div className="weather-timeline"><span className="timeline-line" /><i /><i /><i /><i /><i /></div><div className="forecast-times"><span>Now</span><span>12 PM</span><span>4 PM</span><span>8 PM</span><span>12 AM</span></div></div><div className="dashboard-preview-panel radar-preview"><div className="dashboard-panel-title"><span>Radar</span><small>Rain layer</small></div><div className="mini-radar"><i /><i /><i /><span /></div><small className="radar-label">Patna · 8 min ago</small></div><div className="dashboard-preview-panel air-preview"><div className="dashboard-panel-title"><span>Air quality</span><small>Good</small></div><div className="air-gauge"><strong>42</strong><span>AQI</span></div><div className="gauge-track"><i /></div></div></div><div className="sun-times"><span><Sunrise size={15} /> Sunrise <strong>5:42 AM</strong></span><span><Sunset size={15} /> Sunset <strong>6:31 PM</strong></span></div></div><div className="dashboard-laptop"><div className="laptop-screen"><div className="laptop-camera" /><div className="laptop-ui"><span>WeatherLY dashboard</span><strong>28°</strong><i /><i /><i /><i /></div></div><div className="laptop-base" /><small>Dashboard running live</small></div></div></section>
}
