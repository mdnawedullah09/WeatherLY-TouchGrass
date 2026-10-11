import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
} from "../services/weatherAPI";

const weatherCache: Record<string, any> = {};

export function useWeather(lat: number, lon: number) {
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const initialCache = weatherCache[cacheKey];

  const [current, setCurrent] = useState<any>(initialCache?.current || null);
  const [hourly, setHourly] = useState<any>(initialCache?.hourly || null);
  const [forecast, setForecast] = useState<any>(initialCache?.forecast || null);
  const [loading, setLoading] = useState(!initialCache);

  useEffect(() => {
    async function load() {
      if (weatherCache[cacheKey]) {
        return;
      }
      
      setLoading(true);
      try {
        const [c, h, f] = await Promise.all([
          getCurrentWeather(lat, lon),
          getHourlyForecast(lat, lon),
          getDailyForecast(lat, lon),
        ]);

        setCurrent(c);
        setHourly(h);
        setForecast(f);
        
        weatherCache[cacheKey] = { current: c, hourly: h, forecast: f };
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [lat, lon]);

  return {
    current,
    hourly,
    forecast,
    loading,
  };
}