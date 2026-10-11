import { useEffect, useState } from "react";
import { reverseGeocode } from "../services/geocodingAPI";

const geocodingCache: Record<string, any> = {};

export function useReverseGeocoding(lat: number, lon: number) {
  const cacheKey = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const initialCache = geocodingCache[cacheKey];

  const [city, setCity] = useState(initialCache?.city || "Loading...");
  const [state, setState] = useState(initialCache?.state || "");

  useEffect(() => {
    async function load() {
      if (geocodingCache[cacheKey]) {
        return;
      }
      
      try {
        const data = await reverseGeocode(lat, lon);

        const newCity = data.city || "Unknown";
        const newState = data.state || "";
        
        setCity(newCity);
        setState(newState);
        
        geocodingCache[cacheKey] = { city: newCity, state: newState };
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [lat, lon]);

  return { city, state };
}