import { useState, useEffect } from "react";
import { CheckCircle2, Leaf, Plus, Coins, Camera, Upload, X, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
interface Reel {
  id: number;
  user: string;
  title: string;
  video_url: string;
  eco_points_earned: number;
  likes: number;
  comments: number;
}

export default function EcoReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [totalCoins, setTotalCoins] = useState(2450);
  const [showCreate, setShowCreate] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reels/`);
      const data = await res.json();
      
      const enhancedData = data.map((reel: any) => ({
        ...reel,
        likes: reel.likes || Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 5
      }));
      setReels(enhancedData);
    } catch (error) {
      console.error("Failed to fetch reels", error);
    }
  };

  const handleCreateReel = async () => {
    if (!newTitle.trim()) return;
    setIsUploading(true);
    
    setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/reels/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: "CurrentUser",
            title: newTitle,
            video_url: "https://www.w3schools.com/html/mov_bbb.mp4"
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTotalCoins(prev => prev + data.eco_points_earned);
          setShowCreate(false);
          setNewTitle("");
          fetchReels();
        }
      } catch (error) {
        console.error("Failed to upload reel", error);
      }
      setIsUploading(false);
    }, 1500);
  };

  const toggleLike = (id: number) => {
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="h-full w-full bg-black text-white relative flex flex-col overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-6 pb-2 flex justify-between items-center bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none">
        


        <div className="pointer-events-auto flex items-center gap-2 mt-2 font-mono text-[11px] font-bold uppercase text-teal-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-500/20 shadow-lg">
          <Coins size={14} className="text-teal-400" />
          {totalCoins} ECO-COINS
        </div>
        
        <button 
          onClick={() => setShowCreate(true)}
          className="pointer-events-auto mt-2 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/20 flex items-center justify-center text-white shadow-lg transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide w-full h-full pb-[68px]">
        
        {reels.map((reel) => (
          <div key={reel.id} className="w-full h-[100dvh] snap-start relative bg-slate-900 flex items-center justify-center">
            
            <video 
              src={reel.video_url} 
              className="absolute inset-0 w-full h-full object-cover"
              loop muted playsInline autoPlay
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload noplaybackrate"
            />
            
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-[90px] inset-x-0 px-4 flex items-end justify-between z-20 pointer-events-none">
              
              <div className="flex-1 pr-12 pb-2 flex flex-col items-start">
                
                <div className="pointer-events-auto flex items-center gap-1.5 text-[11px] font-semibold text-white mb-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                  <CheckCircle2 size={12} className="text-teal-400" />
                  60 SEC WATCHED · +{reel.eco_points_earned} PTS
                </div>

                <div className="flex items-center gap-2 mb-2 pointer-events-auto">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 p-[1px]">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                      <Leaf size={14} className="text-teal-300" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-white drop-shadow-md">
                    @{reel.user}
                  </span>
                  <button className="text-[11px] font-bold text-white bg-transparent border border-white/80 px-2 py-0.5 rounded-full ml-1 hover:bg-white hover:text-black transition-colors">
                    Follow
                  </button>
                </div>

                <h3 className="text-[14px] font-medium text-white drop-shadow-md leading-snug line-clamp-2">
                  {reel.title} 🌿 #EcoLife #WeatherLY
                </h3>
              </div>

              <div className="flex flex-col items-center gap-5 pb-2 pointer-events-auto">
                <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1 group">
                  <motion.div whileTap={{ scale: 1.3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Heart size={28} className={`drop-shadow-lg transition-colors ${likedReels[reel.id] ? 'fill-rose-500 text-rose-500' : 'text-white group-hover:text-gray-200'}`} />
                  </motion.div>
                  <span className="text-[11px] font-medium text-white drop-shadow-md">{formatNumber(reel.likes + (likedReels[reel.id] ? 1 : 0))}</span>
                </button>
                
                <button className="flex flex-col items-center gap-1 group">
                  <MessageCircle size={28} className="text-white drop-shadow-lg group-hover:text-gray-200 transition-colors" />
                  <span className="text-[11px] font-medium text-white drop-shadow-md">{formatNumber(reel.comments)}</span>
                </button>
                
                <button className="flex flex-col items-center gap-1 group">
                  <Send size={26} className="text-white drop-shadow-lg group-hover:text-gray-200 transition-colors" />
                  <span className="text-[11px] font-medium text-white drop-shadow-md">Share</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <Bookmark size={26} className="text-white drop-shadow-lg group-hover:text-gray-200 transition-colors" />
                  <span className="text-[11px] font-medium text-white drop-shadow-md">Save</span>
                </button>

                <button className="flex flex-col items-center gap-1 group mt-2">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center backdrop-blur-md">
                    <Coins size={22} className="text-teal-400 drop-shadow-lg" />
                  </div>
                  <span className="text-[11px] font-bold text-teal-300 drop-shadow-md">Earn</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-sm rounded-3xl p-6 border border-slate-200 shadow-2xl relative z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                  <Leaf className="text-emerald-500" /> New EcoReel
                </h2>
                <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-slate-900">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="aspect-[9/16] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm font-medium">Record or Upload</span>
                </div>

                <input 
                  type="text" 
                  placeholder="Describe your climate action..." 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-cyan-500"
                />

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-3 text-left">
                  <Coins className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-600">Earn +100 Eco-Coins</h4>
                    <p className="text-xs text-slate-600 mt-1 font-medium">Verified posts that promote climate conservation earn community rewards.</p>
                  </div>
                </div>

                <button 
                  onClick={handleCreateReel}
                  disabled={isUploading || !newTitle.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
                >
                  {isUploading ? "Uploading & Verifying..." : "Post Reel"} <Upload size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
