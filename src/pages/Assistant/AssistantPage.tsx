import { useState, useRef, useEffect, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, Mic, Plus, Send, Sparkles, Volume2, Copy, RefreshCw } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { useVoice } from "../../hooks/useVoice";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { Link } from "react-router-dom";

export default function AssistantPage() {
  const { messages, loading, send } = useChat();
  const { listening, startListening, speak } = useVoice();
  const { lat, lon } = useGeoLocation();

  const [text, setText] = useState("");
  const [lang, setLang] = useState("hi-IN");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e?: FormEvent, overrideText?: string) {
    e?.preventDefault();
    const msg = overrideText || text;
    if (!msg.trim()) return;
    
    setText("");
    const res = await send(msg, lat, lon, lang);
    return res;
  }

  const handleVoiceResult = async (voiceText: string) => {
    setText("");
    const res = await handleSend(undefined, voiceText);
    if (res && res.reply) {
      speak(res.reply, lang);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const suggestionChips = [
    { label: "Will it rain today?", text: "Will it rain today?" },
    { label: "Tomorrow's forecast", text: "What is the weather forecast for tomorrow?" },
    { label: "Weather alerts", text: "Are there any severe weather alerts for my area?" },
    { label: "Best time to travel", text: "When is the best time to travel today?" }
  ];



  return (
    <div className="h-full flex flex-col relative bg-[#F8FAFC] text-slate-900 overflow-hidden">
      
            <div className="h-[60px] bg-white border-b border-slate-100 flex items-center justify-between px-4 z-20 flex-shrink-0 relative shadow-sm">
        <Link to="/dashboard" aria-label="Go back" className="text-slate-600 hover:text-slate-900 transition-colors p-1">
          <ChevronLeft size={24} strokeWidth={2.5} />
        </Link>
        
        <div className="flex flex-col items-center">
          <strong className="text-slate-900 text-sm font-bold">WeatherLY</strong>
          <span className="text-xs text-slate-500 font-medium">AI Weather Assistant</span>
        </div>

        <div className="relative group">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="appearance-none bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 pr-6 rounded-full border border-slate-200 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="mr-IN">Marathi</option>
            <option value="bn-IN">Bengali</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-[100px] scrollbar-hide flex flex-col relative z-10">
        
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center w-full mx-auto pb-10"
          >
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-sky-200">
              <Sparkles size={32} className="text-sky-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-2 text-center">
              How can I help with the weather?
            </h1>
            <p className="text-sm text-slate-500 text-center max-w-[280px] mb-8 font-medium leading-relaxed">
              Ask me about forecasts, rainfall, alerts, temperature, AQI or travel conditions.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center max-w-[320px]">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(undefined, chip.text)}
                  className="bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md text-slate-700 px-4 py-2.5 rounded-full text-xs font-semibold transition-all active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6 w-full mx-auto">
            {messages.map((m, i) => (
              <AnimatePresence mode="wait" key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 w-full ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                                    {m.role === "assistant" && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-md">
                        <Sparkles size={16} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                    
                                        <div className={`px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user" 
                        ? "bg-sky-50 text-slate-900 rounded-[20px] rounded-tr-[4px] border border-sky-100/50 shadow-sm font-medium" 
                        : "bg-transparent text-slate-800 font-normal"
                    }`}>
                      {m.role === "assistant" && (
                        <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                          WeatherLY
                        </div>
                      )}
                      {m.content}
                    </div>

                                        {m.role === "assistant" && (
                      <div className="flex items-center gap-4 mt-2 px-1">
                        <button 
                          onClick={() => speak(m.content, lang)}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label="Read aloud"
                        >
                          <Volume2 size={14} />
                          <span className="text-[11px] font-semibold">Read</span>
                        </button>
                        <button 
                          onClick={() => handleCopy(m.content)}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label="Copy"
                        >
                          <Copy size={14} />
                          <span className="text-[11px] font-semibold">Copy</span>
                        </button>
                        <button 
                          onClick={() => handleSend(undefined, messages[i-1]?.content)}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label="Regenerate"
                        >
                          <RefreshCw size={14} />
                          <span className="text-[11px] font-semibold">Retry</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
            
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 flex-row items-start pt-2 w-full"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="flex flex-col items-start mt-0.5">
                  <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    WeatherLY
                  </div>
                  <div className="flex gap-1.5 px-1 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        )}
      </div>

            <div className="absolute bottom-4 left-4 right-4 z-20">
        
                {!text.trim() && !listening && (
          <div className="flex justify-center mb-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-white/80 backdrop-blur border border-slate-200 shadow-sm rounded-full text-slate-500 hover:text-slate-800 transition-colors">
              <Sparkles size={10} className="text-indigo-400" />
              <span className="text-[10px] font-bold">Advanced Mode</span>
              <ChevronDown size={12} className="opacity-70" />
            </button>
          </div>
        )}

        <motion.form 
          layout
          onSubmit={handleSend} 
          className="bg-white border border-slate-200 shadow-lg shadow-slate-200/50 rounded-[24px] px-2 py-1.5 flex items-end transition-all w-full min-h-[56px]"
        >
          <button 
            type="button"
            className="p-2 mb-0.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors flex-shrink-0"
            aria-label="Add attachment"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>

          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask WeatherLY..."
            className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder-slate-400 resize-none py-2.5 px-2 text-[15px] font-medium scrollbar-hide max-h-[120px]"
            rows={1}
            style={{ minHeight: "44px" }}
          />

          <div className="flex items-center gap-1 pr-1 mb-0.5">
            {text.trim() || loading ? (
              <button 
                type="submit"
                disabled={!text.trim() || loading}
                className="p-2 rounded-full text-white bg-sky-500 hover:bg-sky-600 shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Send size={16} strokeWidth={2.5} className="ml-0.5" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => startListening(handleVoiceResult, lang)}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  listening ? "bg-red-50 text-red-500 animate-pulse border border-red-100" : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                }`}
                aria-label="Voice input"
              >
                <Mic size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </motion.form>
      </div>

            <AnimatePresence>
        {listening && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-[96px] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-4 z-30 shadow-xl"
          >
            <div className="flex items-center gap-1.5 h-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-red-400 rounded-full"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
