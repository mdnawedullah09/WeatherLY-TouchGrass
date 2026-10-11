import api from "./api";

export const getCurrentWeather = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/current", {
    params: { lat, lon },
  });

  return res.data;
};

export const getHourlyForecast = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/hourly", {
    params: { lat, lon },
  });

  return res.data;
};

export const getDailyForecast = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/forecast", {
    params: { lat, lon },
  });

  return res.data;
};

export const getAgroWeather = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/agro", {
    params: { lat, lon },
  });
  return res.data;
};

export const getAviationWeather = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/aviation", {
    params: { lat, lon },
  });
  return res.data;
};

export const getMarineWeather = async (lat: number, lon: number) => {
  const res = await api.get("/api/weather/marine", {
    params: { lat, lon },
  });
  return res.data;
};