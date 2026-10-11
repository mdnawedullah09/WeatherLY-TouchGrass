import 'leaflet/dist/leaflet.css'
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { CloudRain, Droplets, Gauge, LocateFixed, Map as MapIcon, Navigation, ShieldAlert, Wind } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'

const LeafletMap = MapContainer as ComponentType<any>
const LeafletTileLayer = TileLayer as ComponentType<any>
const LeafletCircleMarker = CircleMarker as ComponentType<any>
const LeafletTooltip = Tooltip as ComponentType<any>

type Layer = 'rain' | 'temperature' | 'wind' | 'aqi' | 'flood' | 'cyclone'

const layers: { id: Layer; label: string }[] = [
  { id: 'rain', label: 'Rain' },
  { id: 'temperature', label: 'Temperature' },
  { id: 'wind', label: 'Wind' },
  { id: 'aqi', label: 'AQI' },
  { id: 'flood', label: 'Flood' },
  { id: 'cyclone', label: 'Cyclone' },
]

const locations = [{ name: 'Patna', position: [25.5941, 85.1376] as [number, number], value: '28°', color: '#38bdf8' }, { name: 'Delhi', position: [28.6139, 77.209] as [number, number], value: '31°', color: '#facc15' }, { name: 'Mumbai', position: [19.076, 72.8777] as [number, number], value: '26°', color: '#22c55e' }, { name: 'Chennai', position: [13.0827, 80.2707] as [number, number], value: '30°', color: '#f97316' }]

export function MapPreview() {
  const [activeLayer, setActiveLayer] = useState<Layer>('rain')
  const layerIcon = activeLayer === 'flood' || activeLayer === 'cyclone' ? ShieldAlert : activeLayer === 'wind' ? Wind : activeLayer === 'aqi' ? Gauge : activeLayer === 'temperature' ? Navigation : CloudRain
  const LayerIcon = layerIcon

  return <section className="content-section india-map-section" id="maps"><SectionTitle eyebrow="Interactive India weather map" title="See the weather move across the country." copy="Switch layers, inspect cities, and understand the conditions before they reach your doorstep." /><div className="india-map-layout"><aside className="map-sidebar"><div className="map-sidebar-top"><span>Today's weather</span><LocateFixed size={16} /></div><h3>Patna <small>Bihar</small></h3><div className="map-sidebar-temp">28°</div><p>Heavy rain · Feels like 30°</p><div className="map-sidebar-stats"><span><Droplets size={15} />Rainfall<strong>18 mm</strong></span><span><Wind size={15} />Humidity<strong>64%</strong></span><span><ShieldAlert size={15} />Alerts<strong>2 active</strong></span></div><div className="layer-switcher"><small>Weather layers</small>{layers.map(({ id, label }) => <button className={activeLayer === id ? 'active' : ''} onClick={() => setActiveLayer(id)} key={id}>{label}<span /></button>)}</div></aside><div className="leaflet-map-wrap"><LeafletMap center={[22.5, 79]} zoom={4} scrollWheelZoom={false} zoomControl={false} className="india-leaflet-map"><LeafletTileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{locations.map((location) => <LeafletCircleMarker center={location.position} pathOptions={{ color: activeLayer === 'flood' ? '#ef4444' : location.color, fillColor: activeLayer === 'flood' ? '#ef4444' : location.color, fillOpacity: .8 }} radius={activeLayer === 'cyclone' ? 10 : 7} key={location.name}><LeafletTooltip direction="top" offset={[0, -6]}>{location.name} · {location.value}</LeafletTooltip></LeafletCircleMarker>)}</LeafletMap><div className="map-layer-pill"><MapIcon size={14} /> {layers.find((layer) => layer.id === activeLayer)?.label} layer</div><div className={`map-radar-overlay ${activeLayer}`}><i /><i /><i /></div></div></div><div className="map-active-state"><LayerIcon size={15} /> <span>Live layer active</span><strong>{layers.find((layer) => layer.id === activeLayer)?.label}</strong></div></section>
}
