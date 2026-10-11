import { BarChart3, CloudRain, Droplets, Leaf, Map, MessageCircle, Mic, ShieldAlert, Sparkles, Sun, WalletCards, Wind } from 'lucide-react'
import { GlassCard } from '../common/GlassCard'

export const phoneScreenNames = ['Splash', 'Permission', 'Home', 'Chat', 'Forecast', 'Map', 'Alert', 'Voice', 'EcoReels', 'Wallet'] as const

export function PhoneScreen({ screen }: { screen: number }) {
  return <>
    {screen === 0 && <div className="timeline-splash"><Sparkles size={30} /><strong>WeatherLY</strong><span>AI Powered Weather Intelligence</span><small className="splash-loading">Loading your sky...</small></div>}
    {screen === 1 && <div className="timeline-login"><ShieldAlert size={28} /><h3>Enable weather access</h3><p>Allow location and notifications for local forecasts and timely alerts.</p><button>Allow permissions</button><small>Private · Secure · In your control</small></div>}
    {screen === 2 && <><div className="app-greeting">Good morning <span>☼</span></div><div className="phone-location">Bengaluru <span>⌄</span></div><div className="phone-temp">28°<small> / 24°</small></div><div className="phone-status">Mostly clear · Feels like 30°</div><div className="phone-chart"><div className="chart-line" /><div className="chart-labels"><span>Now</span><span>12 PM</span><span>4 PM</span><span>8 PM</span></div></div><GlassCard className="phone-stats"><span><Wind size={15} /> 12 km/h</span><span><Droplets size={15} /> 64%</span><span><CloudRain size={15} /> 10%</span></GlassCard></>}
    {screen === 3 && <div className="timeline-search"><MessageCircle size={25} /><h3>Ask WeatherLY anything</h3><div className="fake-input">Will it rain on my commute? <Mic size={14} /></div><div className="recent-place">WeatherLY <small>Thinking about your question...</small></div><div className="recent-place">Rain likely after 6 PM <small>Carry an umbrella on your way home</small></div></div>}
    {screen === 4 && <><div className="app-greeting">Hourly forecast <Sun size={18} /></div><div className="forecast-list"><span><small>Now</small><strong>28°</strong><Sun size={18} /></span><span><small>12 PM</small><strong>30°</strong><Sun size={18} /></span><span><small>4 PM</small><strong>29°</strong><CloudRain size={18} /></span><span><small>8 PM</small><strong>25°</strong><CloudRain size={18} /></span></div><div className="app-insight"><span>AI insight</span><strong>Perfect window for a walk</strong><p>Low wind and clear skies until sunset.</p></div></>}
    {screen === 5 && <><div className="app-greeting">Weather map <Map size={18} /></div><div className="radar-screen"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-sweep" /><Map size={25} /></div><p className="radar-caption">Zoomed to Bengaluru · Rain layer</p></>}
    {screen === 6 && <div className="timeline-alert"><ShieldAlert size={32} /><span>Weather alert</span><h3>Water levels rising nearby</h3><p>Move to higher ground if you are in the marked zone. WeatherLY is monitoring the radar.</p><button>View live map</button></div>}
    {screen === 7 && <div className="timeline-voice"><div className="voice-orb"><Mic size={28} /></div><h3>How can I help?</h3><p>“Will it rain on my commute?”</p><div className="voice-wave"><i /><i /><i /><i /><i /><i /><i /></div><small>Listening for your question</small></div>}
    {screen === 8 && <div className="timeline-reels"><div className="reel-visual"><Leaf size={30} /><strong>Cleaner air<br />after the rain</strong></div><span>EcoReels · 01</span><h3>Small shifts. Clearer skies.</h3><p>Your neighborhood's weather story, in 30 seconds.</p></div>}
    {screen === 9 && <div className="timeline-wallet"><WalletCards size={28} /><span>Impact wallet</span><strong>1,240 <small>points</small></strong><div className="wallet-bar"><i /></div><p>You've made 8 low-impact choices this week.</p></div>}
  </>
}

export function PhoneScreenPreview({ screen }: { screen: number }) {
  if (screen === 10) return <div className="timeline-analytics"><BarChart3 size={25} /><span>Personal analytics</span><strong>+12.4%</strong></div>
  return <PhoneScreen screen={screen} />
}
