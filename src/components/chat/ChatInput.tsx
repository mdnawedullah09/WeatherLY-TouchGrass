import { useState } from "react";
import { Mic } from "lucide-react";
import { useVoice } from "../../hooks/useVoice";

type Props = {
  onSend: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const { listening, startListening } = useVoice();

  function send() {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <div className="flex gap-3">
      <input
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none"
        value={text}
        placeholder="Ask WeatherLY..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />

      <button
        onClick={() =>
         startListening((voiceText) => {
  setText(voiceText);
})
        }
        className={`rounded-xl px-4 ${
          listening ? "bg-red-600" : "bg-slate-700"
        }`}
      >
        <Mic size={20} className="text-slate-900" />
      </button>

      <button
        onClick={send}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-5 text-slate-900 disabled:opacity-50"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}