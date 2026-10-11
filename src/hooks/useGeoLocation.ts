import { useEffect, useState } from "react";

let cachedLocation: { lat: number; lon: number } | null = null;
let isGeoLocationLoading = true;

export function useGeoLocation() {
  const [location, setLocation] = useState(
    cachedLocation || {
      lat: 25.5941, // Default fallback (e.g. Patna)
      lon: 85.1376,
    }
  );

  const [loading, setLoading] = useState(
    cachedLocation ? false : isGeoLocationLoading
  );

  useEffect(() => {
    if (cachedLocation) {
      return; // Already cached, no need to refetch
    }

    if (!navigator.geolocation) {
      isGeoLocationLoading = false;
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLoc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        cachedLocation = newLoc;
        setLocation(newLoc);
        isGeoLocationLoading = false;
        setLoading(false);
      },
      () => {
        isGeoLocationLoading = false;
        setLoading(false);
      }
    );
  }, []);

  return {
    ...location,
    loading,
  };
}