import { Mic, Bell, Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type City = {
  id: number;
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
};

type Props = {
  city: string;
  state: string;
  onSearch: (query: string) => void;
  results: City[];
  onSelect: (city: City) => void;
};

export default function WeatherHeader({
  city,
  state,
  onSearch,
  results,
  onSelect,
}: Props) {
  const today = new Date();
  const [query, setQuery] = useState("");

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 flex w-full items-center justify-between rounded-3xl border border-black/10 bg-black/5 px-8 py-5 shadow-xl backdrop-blur-xl"
    >
            <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Weather Intelligence Centre
        </h1>

        <div className="mt-2 flex items-center gap-2 text-gray-300">
          <MapPin size={18} className="text-cyan-400" />
          <span>
            {city || "Unknown"}, {state || "India"}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-400">
          {today.toDateString()}
        </p>
      </div>

            <div className="relative hidden w-[420px] lg:block">
        <div className="flex items-center rounded-full bg-black/10 px-5 py-3 border border-black/10 focus-within:border-cyan-500/50 transition">
          <Search size={20} className="text-gray-300" />

          <input
            type="text"
            value={query}
            placeholder="Search Indian city (e.g. Delhi, Patna)..."
            className="ml-3 w-full bg-transparent text-slate-900 outline-none placeholder:text-gray-400"
            onChange={(e) => {
              const value = e.target.value;

              setQuery(value);

              if (value.trim().length >= 2) {
                onSearch(value);
              } else {
                onSearch("");
              }
            }}
          />
        </div>

        {query.trim().length >= 2 && results.length > 0 && (
          <div className="absolute left-0 top-full mt-3 z-[9999] max-h-72 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md hide-scrollbar">
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  setQuery(item.name);
                  onSearch("");
                }}
                className="block w-full border-b border-slate-200/80 px-4 py-3 text-left transition hover:bg-slate-800/90 last:border-none"
              >
                <div className="font-semibold text-slate-900">
                  {item.name}
                </div>

                <div className="text-sm text-gray-400">
                  {item.admin1 ? `${item.admin1}, ` : ""}{item.country || "India"}
                </div>
              </button>
            ))}
          </div>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="absolute left-0 top-full mt-3 z-[9999] w-full rounded-xl border border-slate-200 bg-white/95 p-4 text-center text-sm text-gray-400 shadow-2xl backdrop-blur-md">
            No matching locations in India found.
          </div>
        )}
      </div>

            <div className="flex gap-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 transition hover:scale-105 hover:bg-cyan-400">
          <Mic className="text-slate-900" />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 transition hover:bg-white/20">
          <Bell className="text-slate-900" />
        </button>
      </div>
    </motion.header>
  );
}