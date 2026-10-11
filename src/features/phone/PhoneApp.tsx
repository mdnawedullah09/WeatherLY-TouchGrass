import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePhoneCarousel } from './hooks/usePhoneCarousel'
import { PhoneFrame } from './PhoneFrame'
import { PhoneScreen } from './PhoneScreen'
import { AlertsScreen } from './screens/AlertsScreen'
import { AnalyticsScreen } from './screens/AnalyticsScreen'
import { ChatScreen } from './screens/ChatScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { EcoReelsScreen } from './screens/EcoReelsScreen'
import { HomeScreen } from './screens/HomeScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { MapScreen } from './screens/MapScreen'
import { PermissionScreen } from './screens/PermissionScreen'
import { RadarScreen } from './screens/RadarScreen'
import { SplashScreen } from './screens/SplashScreen'
import { VoiceScreen } from './screens/VoiceScreen'
import { WalletScreen } from './screens/WalletScreen'
import type { PhoneScreenDefinition } from './types'

const screens: PhoneScreenDefinition[] = [
  { id: 'splash', label: 'Splash', tab: 'home' },
  { id: 'permission', label: 'Location Permission', tab: 'home' },
  { id: 'loading', label: 'Loading', tab: 'home' },
  { id: 'home', label: 'Home', tab: 'home' },
  { id: 'chat', label: 'Chat', tab: 'chat' },
  { id: 'dashboard', label: 'Weather Intelligence', tab: 'home' },
  { id: 'radar', label: 'Live Radar', tab: 'map' },
  { id: 'map', label: 'India Map', tab: 'map' },
  { id: 'alerts', label: 'Alerts', tab: 'alerts' },
  { id: 'voice', label: 'Voice Assistant', tab: 'chat' },
  { id: 'eco-reels', label: 'EcoReels', tab: 'profile' },
  { id: 'wallet', label: 'Wallet', tab: 'profile' },
  { id: 'analytics', label: 'Analytics', tab: 'profile' },
]

function ScreenContent({ id }: { id: PhoneScreenDefinition['id'] }) {
  if (id === 'splash') return <SplashScreen />
  if (id === 'permission') return <PermissionScreen />
  if (id === 'loading') return <LoadingScreen />
  if (id === 'home') return <HomeScreen />
  if (id === 'chat') return <ChatScreen />
  if (id === 'dashboard') return <DashboardScreen />
  if (id === 'radar') return <RadarScreen />
  if (id === 'map') return <MapScreen />
  if (id === 'alerts') return <AlertsScreen />
  if (id === 'voice') return <VoiceScreen />
  if (id === 'eco-reels') return <EcoReelsScreen />
  if (id === 'wallet') return <WalletScreen />
  return <AnalyticsScreen />
}

export function PhoneApp() {
  const [isPaused, setIsPaused] = useState(false)
  const { index, screen, next, previous } = usePhoneCarousel(screens, { paused: isPaused })

  return <div className="phone-app-experience" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}><PhoneFrame activeTab={screen.tab} screenIndex={index} screenCount={screens.length}><AnimatePresence initial={false} mode="wait"><PhoneScreen key={screen.id} label={screen.label}><ScreenContent id={screen.id} /></PhoneScreen></AnimatePresence></PhoneFrame><div className="phone-controls" aria-label="Phone demo controls"><Button variant="outline" size="icon" onClick={previous} aria-label="Previous app screen"><ChevronLeft size={16} /></Button><span>{isPaused ? <><Pause size={13} /> Paused</> : <><Play size={13} /> Auto-playing</>}</span><Button variant="outline" size="icon" onClick={next} aria-label="Next app screen"><ChevronRight size={16} /></Button></div></div>
}
