const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function searchCity(query: string) {
  if (!query.trim()) return [];
  const res = await fetch(`${BASE_URL}/api/geocoding/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(`${BASE_URL}/api/geocoding/reverse?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Reverse geocoding failed");
  return res.json();
}
