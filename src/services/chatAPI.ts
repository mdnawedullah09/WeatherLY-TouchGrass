import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 60000,
});

export interface AIResponse {
  city: string | null;
  reply: string;
}

export async function askAI(
  message: string,
  history: { role: string; content: string }[],
  lat: number,
  lon: number,
  lang: string = "hi-IN"
): Promise<AIResponse> {
  const res = await api.post("/api/chat/", { message, history, lat, lon, lang });
  return res.data;
}
