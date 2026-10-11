import { useEffect, useState } from "react";
import { getAviationWeather } from "../../services/weatherAPI";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { Plane, Wind, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function AviationWeatherCard() {
  const { lat, lon } = useGeoLocation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (lat && lon) {
      getAviationWeather(lat, lon).then((res) => {
        if (res.success) setData(res.current);
      }).catch(console.error);
    }
  }, [lat, lon]);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e1f22] p-4 rounded-3xl border border-white/5"
    >
      <div className="flex items-center gap-2 mb-3 text-sky-400">
        <Plane size={18} />
        <h3 className="text-sm font-medium">Aviation Weather</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Eye size={14} />
            <span className="text-xs">Visibility</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.visibility} m</div>
        </div>
        
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Wind size={14} />
            <span className="text-xs">Wind Gusts</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.wind_gusts} km/h</div>
        </div>
      </div>
    </motion.div>
  );
}
