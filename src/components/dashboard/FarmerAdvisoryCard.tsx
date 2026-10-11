import { useEffect, useState } from "react";
import { getAgroWeather } from "../../services/weatherAPI";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { Sprout, Droplets, ThermometerSun } from "lucide-react";
import { motion } from "framer-motion";

export default function FarmerAdvisoryCard() {
  const { lat, lon } = useGeoLocation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (lat && lon) {
      getAgroWeather(lat, lon).then((res) => {
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
      <div className="flex items-center gap-2 mb-3 text-green-400">
        <Sprout size={18} />
        <h3 className="text-sm font-medium">Agriculture Info</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <ThermometerSun size={14} />
            <span className="text-xs">Soil Temp</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.soil_temperature}°C</div>
        </div>
        
        <div className="bg-black/5 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Droplets size={14} />
            <span className="text-xs">Soil Moisture</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{data.soil_moisture} m³/m³</div>
        </div>
      </div>
    </motion.div>
  );
}
