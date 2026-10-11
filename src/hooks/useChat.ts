import { useState } from "react";
import { askAI } from "../services/chatAPI";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(
    text: string,
    lat: number,
    lon: number,
    lang: string = "hi-IN"
  ) {
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    try {
      const currentHistory = [...messages]; // capture before setting loading
      const ai = await askAI(text, currentHistory, lat, lon, lang);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: ai.reply,
        },
      ]);

      return ai;
    } catch (err: any) {
      let errorText = "Oops! Something went wrong.";
      if (err.response && err.response.data && err.response.data.detail) {
          errorText = err.response.data.detail;
      } else if (err.message) {
          errorText = err.message;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorText,
        },
      ]);
      return { city: null, reply: errorText };
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    send,
  };
}