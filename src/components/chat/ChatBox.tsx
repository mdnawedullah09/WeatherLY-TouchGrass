import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChat } from "../../hooks/useChat";
import { useVoice } from "../../hooks/useVoice";

type Props = {
  lat: number;
  lon: number;
  onCityDetected?: (city: string) => void;
};

export default function ChatBox({
  lat,
  lon,
  onCityDetected,
}: Props) {
  const { messages, loading, send } = useChat();

  const { speak } = useVoice();

  return (
    <div className="rounded-3xl bg-white p-6">
      <h2 className="mb-5 text-xl font-bold">
        WeatherLY AI Assistant
      </h2>

      <div className="mb-5 flex h-96 flex-col gap-4 overflow-y-auto">
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            role={m.role}
            content={m.content}
          />
        ))}
      </div>

      <ChatInput
        loading={loading}
        onSend={async (msg) => {
          try {
            const ai = await send(msg, lat, lon);

            if (ai?.city && onCityDetected) {
              onCityDetected(ai.city);
            }

            if (ai?.reply) {
              speak(ai.reply);
            }
          } catch (err) {
            console.error("Chat error:", err);
          }
        }}
      />
    </div>
  );
}