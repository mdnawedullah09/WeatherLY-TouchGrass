import type { ReactNode } from 'react'
import { Bell, Home, Map, MessageCircle, UserRound } from 'lucide-react'

export type PhoneFrameProps = {
  children: ReactNode
  screenLabel?: string
  screenIndex?: number
  screenCount?: number
  activeTab?: 'home' | 'chat' | 'map' | 'alerts' | 'profile'
}

export function PhoneFrame({ children, screenLabel, screenIndex = 0, screenCount = 1, activeTab = 'home' }: PhoneFrameProps) {
  const tabs = [{ id: 'home', label: 'Home', icon: Home }, { id: 'chat', label: 'Chat', icon: MessageCircle }, { id: 'map', label: 'Map', icon: Map }, { id: 'alerts', label: 'Alerts', icon: Bell }, { id: 'profile', label: 'Profile', icon: UserRound }] as const

  return <div className="phone" aria-label="WeatherLY app phone frame"><div className="phone-notch" /><div className="phone-statusbar"><span>9:41</span><span>● ● ▰</span></div><div className="phone-appbar"><strong>WeatherLY</strong><span aria-hidden="true">◌</span></div><div className="phone-screen" key={screenIndex} aria-live="polite"><div className="timeline-label">{screenLabel}</div>{children}</div><div className="phone-bottom-nav">{tabs.map(({ id, label, icon: Icon }) => <span className={activeTab === id ? 'active' : ''} key={id}><Icon size={15} /><small>{label}</small></span>)}</div>{screenCount > 1 && <div className="phone-dots">{Array.from({ length: screenCount }, (_, index) => <i className={screenIndex === index ? 'active' : ''} key={index} />)}</div>}</div>
}
