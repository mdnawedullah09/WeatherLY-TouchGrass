import { useEffect, useState } from "react";
import { getMarineWeather } from "../../services/weatherAPI";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { Waves, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function MarineWeatherCard() {
  const { lat, lon } = useGeoLocation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (lat && lon) {
      getMarineWeather(lat, lon).then((res) => {
        if (res.success && res.current.wave_height !== null) {
          setData(res.current);
        }
      }).catch(console.error);
    }
  }, [lat, lon]);

  if (!data) return null; // Don't show on inland locations

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e1f22] p-4 rounded-3xl border border-white/5"
    >
      <div className="flex items-center gap-2 mb-3 text-blue-400">
        <Waves size={18} />
        <h3 className="text-sm font-medium">Marine Forecast</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Waves size={14} />
            <span className="text-xs">Wave Height</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.wave_height} m</div>
        </div>
        
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Navigation size={14} />
            <span className="text-xs">Wave Period</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.wave_period} s</div>
        </div>
      </div>
    </motion.div>
  );
}
