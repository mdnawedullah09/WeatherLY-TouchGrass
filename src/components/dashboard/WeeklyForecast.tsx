import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
} from "lucide-react";

type Props = {
  forecast: any;
};

const getIcon = (code: number) => {
  if (code === 0) return <Sun className="text-yellow-400" size={24} />;
  if ([1, 2, 3].includes(code)) return <Cloud className="text-slate-900" size={24} />;
  if ([61, 63, 65, 80, 81, 82].includes(code))
    return <CloudRain className="text-cyan-400" size={24} />;
  if ([95, 96, 99].includes(code))
    return <CloudLightning className="text-yellow-300" size={24} />;
  if ([71, 73, 75, 85, 86].includes(code))
    return <Snowflake className="text-slate-900" size={24} />;

  return <Cloud size={24} />;
};

export default function WeeklyForecast({ forecast }: Props) {
  if (!forecast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl bg-black/5 backdrop-blur-xl border border-black/10 p-6"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        7 Day Forecast
      </h2>

      <div className="space-y-3">

        {forecast.data.map((day: any, index: number) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-2xl bg-black/10 px-5 py-4"
          >

            <div className="w-28 text-slate-900 font-semibold">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>

            <div>
              {getIcon(day.weather_code)}
            </div>

            <div className="text-cyan-300">
              🌧 {day.rain_probability}%
            </div>

            <div className="text-slate-900">
              ⬆ {day.max_temp}°
            </div>

            <div className="text-gray-400">
              ⬇ {day.min_temp}°
            </div>

          </motion.div>

        ))}

      </div>
    </motion.div>
  );
}