import type React from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
} from "lucide-react";

type Props = {
  current: any;
  sunrise?: string;
  sunset?: string;
};

export default function CurrentWeatherCard({ current, sunrise, sunset }: Props) {
  if (!current) return null;

  const weather = current.current;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-8 text-slate-900 shadow-2xl"
    >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

      <div className="relative z-10">

        <p className="text-lg opacity-80">
          Current Weather
        </p>

        <h1 className="mt-2 text-7xl font-bold">
          {weather.temperature}°
        </h1>

        <p className="mt-2 text-2xl">
          {weather.description}
        </p>

        <p className="opacity-80">
          Feels Like {weather.feels_like}°
        </p>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-6">

          <Info
            icon={<Droplets />}
            title="Humidity"
            value={`${weather.humidity}%`}
          />

          <Info
            icon={<Wind />}
            title="Wind"
            value={`${weather.wind_speed} km/h`}
          />

          <Info
            icon={<Gauge />}
            title="Pressure"
            value={`${weather.pressure} hPa`}
          />

          <Info
            icon={<Eye />}
            title="Cloud"
            value={`${weather.cloud_cover}%`}
          />

          <Info
            icon={<Sunrise />}
            title="Sunrise"
            value={sunrise ?? "N/A"}
          />

          <Info
            icon={<Sunset />}
            title="Sunset"
            value={sunset ?? "N/A"}
          />

        </div>

      </div>
    </motion.div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black/10 backdrop-blur-lg p-4">
      <div className="mb-3">{icon}</div>

      <p className="text-sm opacity-70">
        {title}
      </p>

      <h3 className="mt-1 text-xl font-semibold">
        {value}
      </h3>
    </div>
  );
}