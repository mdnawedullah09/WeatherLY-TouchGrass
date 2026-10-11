import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ship, Plane, Sprout, Wind, Droplets, AlertTriangle, CloudRain, Navigation,
  CloudLightning
} from "lucide-react";
import { GlassCard } from "../../components/common/GlassCard";

type Tab = "farmer" | "marine" | "aviation";

export default function AdvisoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("farmer");

  const tabs = [
    { id: "farmer", label: "Crop", icon: Sprout },
    { id: "marine", label: "Marine", icon: Ship },
    { id: "aviation", label: "Aviation", icon: Plane },
  ];

  return (
    <div className="home-dashboard px-4 min-h-screen pb-24 overflow-y-auto pt-6">
            <div className="pb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Advisory Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Specialized intelligence for your sector
        </p>
      </div>

            <div className="flex bg-white/50 p-1 rounded-xl mb-6 border border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-600"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/50 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

            <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "farmer" && <FarmerAdvisory />}
            {activeTab === "marine" && <MarineAdvisory />}
            {activeTab === "aviation" && <AviationAdvisory />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FarmerAdvisory() {
  return (
    <div className="space-y-4">
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Sprout size={18} />
          <h3 className="font-semibold">Current Crop Action</h3>
        </div>
        <p className="text-slate-600 text-sm">
          Favorable conditions for sowing Kharif crops. Ensure adequate soil moisture before planting. Avoid spraying pesticides today due to expected evening showers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Droplets size={16} />
            <span className="text-xs font-mono uppercase">Soil Moisture</span>
          </div>
          <div className="text-xl font-bold text-slate-900">42%</div>
          <div className="text-xs text-slate-500 mt-1">Optimal</div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <CloudRain size={16} />
            <span className="text-xs font-mono uppercase">Rain Prob</span>
          </div>
          <div className="text-xl font-bold text-slate-900">65%</div>
          <div className="text-xs text-slate-500 mt-1">Evening Showers</div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">Pest & Disease Alert</h4>
        <div className="bg-white/50 border border-slate-200 rounded-xl p-3 flex gap-3 items-start">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
          <div>
            <div className="text-sm font-medium text-slate-900">Aphid Infestation Warning</div>
            <div className="text-xs text-slate-500 mt-1">High humidity may lead to aphid attacks in mustard. Monitor crops closely.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarineAdvisory() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Ship size={18} />
          <h3 className="font-semibold">Fishermen Warning</h3>
        </div>
        <p className="text-slate-600 text-sm">
          Strong winds speed reaching 45-55 kmph gusting to 65 kmph likely over Westcentral Arabian Sea. Fishermen are advised not to venture into these areas.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Navigation size={16} />
            <span className="text-xs font-mono uppercase">Wave Height</span>
          </div>
          <div className="text-xl font-bold text-slate-900">2.5 - 3.2m</div>
          <div className="text-xs text-red-400 mt-1">Rough</div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Wind size={16} />
            <span className="text-xs font-mono uppercase">Sea Wind</span>
          </div>
          <div className="text-xl font-bold text-slate-900">28 KT</div>
          <div className="text-xs text-slate-500 mt-1">South-West</div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">Sea Surface Data</h4>
        <GlassCard>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Sea Surface Temperature (SST)</span>
            <span className="text-sm font-bold text-slate-900">29.4°C</span>
          </div>
          <div className="h-px bg-slate-800 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Ocean Currents</span>
            <span className="text-sm font-bold text-slate-900">1.2 m/s</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function AviationAdvisory() {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Plane size={18} />
          <h3 className="font-semibold">Flight Operations</h3>
        </div>
        <p className="text-slate-600 text-sm">
          Clearance for VFR operations. Expect moderate turbulence between FL150 and FL200 due to jet stream. Low-level wind shear reported on approach runway 27.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <CloudRain size={16} />
            <span className="text-xs font-mono uppercase">Visibility</span>
          </div>
          <div className="text-xl font-bold text-slate-900">&gt; 10 km</div>
          <div className="text-xs text-emerald-400 mt-1">Clear</div>
        </GlassCard>
        
        <GlassCard>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <CloudLightning size={16} />
            <span className="text-xs font-mono uppercase">Cloud Base</span>
          </div>
          <div className="text-xl font-bold text-slate-900">4,500 ft</div>
          <div className="text-xs text-slate-500 mt-1">Scattered</div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">METAR / TAF (Mock)</h4>
        <div className="bg-white/80 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-600 leading-relaxed overflow-x-auto">
          <span className="text-cyan-400">METAR</span> VIDP 060830Z 27008KT 4000 HZ FEW040 34/21 Q1002 NOSIG<br/><br/>
          <span className="text-indigo-400">TAF</span> VIDP 060500Z 0606/0712 28010KT 5000 HZ SCT040<br/>
          BECMG 0610/0612 3000 BR
        </div>
      </div>
    </div>
  );
}
