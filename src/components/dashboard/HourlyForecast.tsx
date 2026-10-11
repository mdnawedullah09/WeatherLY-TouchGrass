import { motion } from "framer-motion";
import {
  Sun,
  CloudRain,
  Cloud,
  CloudLightning,
  Snowflake,
  Wind,
} from "lucide-react";

type Props = {
  hourly: any;
};

const getIcon = (code: number) => {
  if (code === 0) return <Sun size={28} className="text-yellow-300" />;

  if ([1, 2, 3].includes(code))
    return <Cloud size={28} className="text-slate-900" />;

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return <CloudRain size={28} className="text-cyan-300" />;

  if ([95, 96, 99].includes(code))
    return <CloudLightning size={28} className="text-yellow-400" />;

  if ([71, 73, 75, 85, 86].includes(code))
    return <Snowflake size={28} className="text-slate-900" />;

  return <Cloud size={28} />;
};

export default function HourlyForecast({ hourly }: Props) {
  if (!hourly) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 rounded-3xl bg-black/5 backdrop-blur-xl border border-black/10 p-6"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Hourly Forecast
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">

        {hourly.data.slice(0, 24).map((item: any, index: number) => (

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.05,
            }}
            key={index}
            className="min-w-[120px] rounded-2xl bg-black/10 backdrop-blur-lg p-5 text-center transition"
          >
            <p className="text-gray-300 text-sm">
              {item.time.substring(11, 16)}
            </p>

            <div className="my-4 flex justify-center">
              {getIcon(item.weather_code)}
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {item.temperature}°
            </h3>

            <p className="mt-2 text-cyan-300 text-sm">
              🌧 {item.rain_probability}%
            </p>

            <div className="flex items-center justify-center gap-1 mt-3 text-gray-300 text-sm">
              <Wind size={15} />
              {item.wind_speed} km/h
            </div>

          </motion.div>

        ))}

      </div>
    </motion.div>
  );
}