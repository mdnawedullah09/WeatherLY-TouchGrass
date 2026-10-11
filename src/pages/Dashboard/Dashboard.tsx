import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  CloudSun,
  Droplets,
  Mic,
  Sparkles,
  Wind,
  ShieldAlert,
  Thermometer,
  CloudRain,
  Leaf,
  MapPinned
} from "lucide-react"

import { useWeather } from "../../hooks/useWeather"
import { useGeoLocation } from "../../hooks/useGeoLocation"
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning ☀️"
  if (hour < 18) return "Good Afternoon ☀️"
  return "Good Evening 🌙"
}

export default function Dashboard() {
  const { lat, lon, loading: locationLoading } = useGeoLocation()
  const { city, state } = useReverseGeocoding(lat, lon)
  const { current, hourly, loading } = useWeather(lat, lon)

  if (loading || locationLoading) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500 bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
          <span className="text-sm font-medium">Loading intelligence...</span>
        </div>
      </div>
    )
  }

  if (!current || !hourly) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500 bg-[#F8FAFC]">
        Data unavailable. Please check your connection.
      </div>
    )
  }

  const weather = current.current
  if (!weather) return <div className='flex h-full items-center justify-center'>Error loading weather.</div>
  const condition = weather.cloud_cover > 50 ? "Cloudy" : "Clear Sky"
  
  const hourlyData = hourly.data || []
  const currentHourIndex = hourlyData.findIndex((item: any) => new Date(item.time) > new Date())
  const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex
  
  const upcomingHours = hourlyData.slice(startIndex, startIndex + 12).map((item: any, i: number) => {
    const date = new Date(item.time)
    const hourStr = date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
    return {
      time: i === 0 ? "Now" : hourStr.split(" ")[0] + " " + hourStr.split(" ")[1],
      temp: Math.round(item.temperature) + "°",
      icon: item.weather_code >= 50 ? "🌧" : (item.cloud_cover > 50 ? "☁️" : "☀️"),
      rain: item.rain_probability || 0
    }
  })

  return (
    <div className="px-5 pt-6 pb-8 bg-[#F8FAFC] min-h-full">
      
            <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-xl font-bold text-slate-900">{getGreeting()}</h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {city || "Locating..."}, {state} • Updated just now
          </p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0"
        >
          <span className="text-slate-600 font-bold text-lg">U</span>
        </motion.button>
      </motion.div>

            <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6 mb-6 relative overflow-hidden"
      >
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Weather</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[64px] font-bold text-slate-900 tracking-tighter leading-none">
                {Math.round(weather.temperature)}°
              </span>
            </div>
            <p className="text-lg font-medium text-slate-700 mt-2">{condition}</p>
            <p className="text-sm text-slate-500 mt-1">Feels like {Math.round(weather.feels_like)}°C</p>
          </div>
          <CloudSun size={64} className="text-sky-500 drop-shadow-sm" strokeWidth={1.5} />
        </div>

        <div className="relative z-10 border-t border-slate-100 pt-5 mt-5">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Droplets size={14} />
                <span className="text-xs font-medium">Humidity</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{weather.relative_humidity_2m ?? weather.humidity}%</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Wind size={14} />
                <span className="text-xs font-medium">Wind</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{weather.wind_speed_10m ?? weather.wind_speed} km/h</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Leaf size={14} />
                <span className="text-xs font-medium">AQI</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">42 Good</p>
            </div>
          </div>
        </div>
      </motion.div>

            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Link to="/assistant">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-full p-2 pl-5 shadow-sm border border-slate-200 flex items-center justify-between group hover:border-sky-300 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <Sparkles size={18} className="text-sky-500 flex-shrink-0" />
              <span className="text-slate-400 text-sm font-medium truncate">✨ Ask WeatherLY anything...</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-sky-50 flex flex-shrink-0 items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mic size={18} className="text-sky-600" />
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-base font-bold text-slate-900">Today's Forecast</h2>
          <span className="text-xs font-semibold text-sky-500">Hourly →</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide -mx-5 px-5">
          {upcomingHours.map((item: any, i: number) => (
            <motion.div 
              whileTap={{ scale: 0.95 }}
              key={i} 
              className={`flex-shrink-0 flex flex-col items-center justify-between w-[72px] h-[100px] rounded-[20px] p-3 border ${
                i === 0 ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-100 text-slate-700 shadow-sm'
              }`}
            >
              <span className={`text-[11px] font-medium ${i === 0 ? 'text-slate-300' : 'text-slate-500'}`}>
                {item.time}
              </span>
              <span className="text-xl my-1">{item.icon}</span>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">{item.temp}</span>
                {item.rain > 0 && (
                  <span className={`text-[9px] font-medium mt-0.5 ${i === 0 ? 'text-sky-300' : 'text-sky-500'}`}>
                    {item.rain}%
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mb-8"
      >
        <h2 className="text-base font-bold text-slate-900 mb-4 px-1">Explore</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/maps">
            <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <MapPinned size={20} />
              </div>
              <span className="font-semibold text-slate-700">Live Maps</span>
            </motion.div>
          </Link>
          <Link to="/alerts">
            <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <ShieldAlert size={20} />
              </div>
              <span className="font-semibold text-slate-700">Disaster Alerts</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>

            <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-base font-bold text-slate-900 mb-4 px-1">Weather Insights</h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-500">
              <CloudRain size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Rain</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">Rain likely after 6 PM</p>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Wind size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Wind</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">Light winds today</p>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-500">
              <Thermometer size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Temp</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">2° warmer than yesterday</p>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.97 }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-500">
              <ShieldAlert size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Alerts</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">No severe alerts</p>
          </motion.div>
        </div>
      </motion.div>
      
    </div>
  )
}