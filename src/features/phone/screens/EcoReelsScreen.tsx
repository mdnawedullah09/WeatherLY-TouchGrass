import { CheckCircle2, Leaf, Play } from 'lucide-react'

export function EcoReelsScreen() {
  return <div className="timeline-reels"><div className="reel-visual"><Leaf size={30} /><strong>Cleaner air<br />after the rain</strong><button aria-label="Play EcoReel"><Play size={15} fill="currentColor" /></button></div><span>AI Verified · EcoReels 01 <CheckCircle2 size={12} /></span><h3>Small shifts. Clearer skies.</h3><p>Earn coins for climate-positive choices.</p></div>
}
