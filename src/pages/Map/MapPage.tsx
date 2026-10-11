import { motion } from 'framer-motion'
import { Bot, ChevronLeft, ChevronUp, CloudRain, Gauge, LocateFixed, Map as MapIcon, Mic, Search, Settings2, ShieldAlert, ThermometerSun, Wind } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import { useWeather } from "../../hooks/useWeather";

type Layer = 'rain' | 'temperature' | 'wind' | 'aqi' | 'flood' | 'cyclone'
const layers: { id: Layer; label: string; icon: typeof CloudRain }[] = [{ id: 'rain', label: 'Rain', icon: CloudRain }, { id: 'temperature', label: 'Temperature', icon: ThermometerSun }, { id: 'wind', label: 'Wind', icon: Wind }, { id: 'aqi', label: 'AQI', icon: Gauge }, { id: 'flood', label: 'Flood', icon: ShieldAlert }, { id: 'cyclone', label: 'Cyclone', icon: Wind }]
const cities = ['Patna, Bihar', 'New Delhi', 'Mumbai, Maharashtra', 'Bengaluru, Karnataka']

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState<Layer>('rain')
  const [search, setSearch] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  
  const { lat, lon } = useGeoLocation();
  const { city, state } = useReverseGeocoding(lat, lon);
  const { current } = useWeather(lat, lon);

  const locationText = `${city}, ${state}`
  const filteredCities = cities.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
  const temp = current?.current?.temperature ? Math.round(current.current.temperature) : '--'
  const wind = current?.current?.wind_speed ?? '--'

  return (
    <div className={`weather-command-center px-4 ${sheetOpen ? 'sheet-open' : ''}`}>
      <div className="map-command-header">
        <Link to="/dashboard" aria-label="Go back" className="text-slate-500 hover:text-slate-900 transition-colors"><ChevronLeft size={16} /></Link>
        <strong>Weather Map</strong>
        <button aria-label="Map layers"><Settings2 size={15} /></button>
      </div>
      
      <div className="map-command-search mt-4">
        <Search size={14} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search city..." aria-label="Search city" />
        <button aria-label="Use current location"><LocateFixed size={14} /></button>
      </div>
      
      {search && (
        <div className="map-city-suggestions">
          {filteredCities.map((c) => (
            <button onClick={() => setSearch('')} key={c}>{c}</button>
          ))}
        </div>
      )}

      <div className={`command-map-surface ${activeLayer}`}>
        <div className="command-map-grid" />
        <div className="india-outline" />
        <span className="command-map-marker marker-patna">●</span>
        <span className="command-map-marker marker-delhi">●</span>
        <span className="command-map-marker marker-mumbai">●</span>
        <div className="command-map-label"><MapIcon size={12} /> {layers.find((l) => l.id === activeLayer)?.label}</div>
        <div className="command-map-radar"><i /><i /><span /></div>
      </div>

      <div className="map-layer-drawer">
        <div className="layer-drawer-head">
          <span>Weather layers</span>
          <small>Tap to switch</small>
        </div>
        <div className="map-layer-buttons">
          {layers.map(({ id, label, icon: Icon }) => (
            <button className={activeLayer === id ? 'active' : ''} onClick={() => setActiveLayer(id)} key={id}>
              <Icon size={13} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="selected-location-card">
        <div className="selected-location-head">
          <span><LocateFixed size={13} /> Selected location</span>
          <small>Live now</small>
        </div>
        <strong>{locationText}</strong>
        <p>{temp}°C · Live Radar</p>
        <div>
          <span>AQI <b>Good</b></span>
          <span>Wind <b>{wind} km/h</b></span>
        </div>
      </div>

      <div className="map-ai-insight">
        <Bot size={15} className="mt-1 flex-shrink-0" />
        <span>
          <strong>WeatherLY Analysis</strong>
          <small>Analyzing real-time weather patterns for {city}. Everything looks normal for the next few hours.</small>
        </span>
      </div>

      <div className="map-floating-actions hidden">
        <button aria-label="Voice assistant"><Mic size={14} /></button>
        <button aria-label="Ask AI"><Bot size={14} /></button>
        <button aria-label="Locate me"><LocateFixed size={14} /></button>
      </div>

      <motion.button className="map-sheet-handle hidden" onClick={() => setSheetOpen((v) => !v)} animate={{ y: sheetOpen ? -2 : 0 }}>
        <ChevronUp size={14} />
        <span>{sheetOpen ? 'Hide details' : 'More weather intelligence'}</span>
      </motion.button>
    </div>
  )
}
