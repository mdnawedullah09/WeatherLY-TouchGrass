import { motion } from 'framer-motion'
import { Ambulance, Bell, Flame, History, MapPinned, Mountain, Phone, Share2, ShieldAlert, Siren, Tornado, Users, Waves, Zap, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";

type Risk = 'flood' | 'cyclone' | 'lightning' | 'heatwave' | 'landslide'
const risks: { id: Risk; label: string; value: string; icon: typeof Waves; tone: string }[] = [
  { id: 'flood', label: 'Flood', value: 'High', icon: Waves, tone: 'red' }, 
  { id: 'cyclone', label: 'Cyclone', value: 'Low', icon: Tornado, tone: 'yellow' }, 
  { id: 'lightning', label: 'Lightning', value: 'Moderate', icon: Zap, tone: 'yellow' }, 
  { id: 'heatwave', label: 'Heatwave', value: 'Low', icon: Flame, tone: 'green' }, 
  { id: 'landslide', label: 'Landslide', value: 'Low', icon: Mountain, tone: 'green' }
]

export default function AlertsPage() {
  const [selectedRisk, setSelectedRisk] = useState<Risk>('flood')
  const [shared, setShared] = useState(false)
  const { lat, lon } = useGeoLocation();
  const { city } = useReverseGeocoding(lat, lon);

  return (
    <div className="disaster-center p-4">
      <div className="disaster-center-header">
        <span>
          <Link to="/dashboard" aria-label="Go back" className="text-slate-500 hover:text-slate-900 transition-colors mr-2"><ChevronLeft size={16} /></Link>
          <strong>Disaster Center</strong>
        </span>
        <span className="disaster-live"><i /> Live alerts</span>
      </div>
      
      <motion.div className="disaster-risk-banner" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="risk-gauge">
          <strong>HIGH</strong>
          <span>risk level</span>
        </div>
        <span>
          <strong>Heavy rain + flood warning</strong>
          <small>{city} · 2 active alerts</small>
        </span>
        <Bell size={17} />
      </motion.div>
      
      <div className="disaster-center-label">Live alert timeline</div>
      <div className="alert-timeline">
        <div><b>09:30</b><span>Heavy rain detected</span><i /></div>
        <div><b>11:00</b><span>River water rising</span><i /></div>
        <div className="current"><b>13:00</b><span>Flood alert issued</span><i /></div>
      </div>
      
      <div className="disaster-center-label mt-6">Risk overview <small>Tap a risk</small></div>
      <div className="risk-card-grid">
        {risks.map(({ id, label, value, icon: Icon, tone }) => (
          <motion.button 
            whileTap={{ scale: .97 }} 
            className={`risk-card ${tone} ${selectedRisk === id ? 'active' : ''}`} 
            onClick={() => setSelectedRisk(id)} 
            key={id}
          >
            <Icon size={16} />
            <span>{label}<strong>{value}</strong></span>
          </motion.button>
        ))}
      </div>
      
      <div className="safe-zone-card mt-6">
        <div className="safe-zone-head">
          <span><MapPinned size={14} /> Safe zones map</span>
          <small>{city} · 2.4 km</small>
        </div>
        <div className="safe-zone-map">
          <span className="safe-route" />
          <i className="safe-shelter shelter-one" />
          <i className="safe-shelter shelter-two" />
          <i className="safe-hospital" />
          <small><span />Shelter <span />Hospital</small>
        </div>
      </div>
      
      <div className="emergency-actions mt-6">
        <div className="disaster-center-label">Emergency contacts</div>
        <div>
          {[{ label: 'Ambulance', icon: Ambulance }, { label: 'Police', icon: Siren }, { label: 'Fire', icon: Flame }, { label: 'NDMA', icon: Phone }].map(({ label, icon: Icon }) => (
            <button key={label}>
              <Icon size={14} />
              <small>{label}</small>
            </button>
          ))}
        </div>
      </div>
      
      <div className="safety-advice mt-6">
        <ShieldAlert size={16} />
        <span>
          <strong>WeatherLY recommendation</strong>
          <small>Avoid low-lying areas. Stay indoors, keep an emergency kit ready, and monitor official alerts.</small>
        </span>
      </div>
      
      <div className="alert-footer-actions mt-4">
        <button><History size={13} /> Alert history</button>
        <button onClick={() => setShared((value) => !value)}>
          <Share2 size={13} /> {shared ? 'Alert shared' : 'Share alert'}
        </button>
      </div>
      
      <div className="disaster-audience mt-4 pb-4">
        <Users size={12} /> Alerts verified from official weather signals
      </div>
    </div>
  )
}
