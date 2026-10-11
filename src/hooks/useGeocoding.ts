import { useState } from "react";
import { searchCity } from "../services/geocodingAPI";

export function useGeocoding() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(query: string) {
    if (query.trim().length < 2) {
      setResults([]);
      return [];
    }

    setLoading(true);

    try {
      const data = await searchCity(query);

      setResults(data);

      return data;
    } catch (err) {
      console.error(err);
      setResults([]);

      return [];
    } finally {
      setLoading(false);
    }
  }

  return {
    results,
    loading,
    search,
  };
}