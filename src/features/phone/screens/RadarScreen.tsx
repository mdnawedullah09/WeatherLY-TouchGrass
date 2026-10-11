import { CloudRain, Zap } from 'lucide-react'

export function RadarScreen() {
  return <div className="phone-radar-screen"><div className="app-greeting">Live radar <CloudRain size={18} /></div><div className="radar-screen"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-sweep" /><span className="radar-rain rain-one" /><span className="radar-rain rain-two" /><span className="radar-rain rain-three" /><Zap size={23} /></div><p className="radar-caption">Rain cells · 8 min ago</p></div>
}
