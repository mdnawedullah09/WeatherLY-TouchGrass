import { Bell, Home, Map, MessageCircle, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PhoneTab } from './types'

export function PhoneFrame({ children, activeTab, screenIndex, screenCount }: { children: ReactNode; activeTab: PhoneTab; screenIndex: number; screenCount: number }) {
  const tabs = [{ id: 'home', label: 'Home', icon: Home }, { id: 'chat', label: 'Chat', icon: MessageCircle }, { id: 'map', label: 'Map', icon: Map }, { id: 'alerts', label: 'Alerts', icon: Bell }, { id: 'profile', label: 'Profile', icon: UserRound }] as const

  return <div className="phone" aria-label="WeatherLY app phone frame"><div className="phone-notch" /><div className="phone-statusbar"><span>9:41</span><span>● ● ▰</span></div><div className="phone-appbar"><strong>WeatherLY</strong><span aria-hidden="true">◌</span></div>{children}<div className="phone-bottom-nav">{tabs.map(({ id, label: tabLabel, icon: Icon }) => <span className={activeTab === id ? 'active' : ''} key={id}><Icon size={15} /><small>{tabLabel}</small></span>)}</div><div className="phone-dots">{Array.from({ length: screenCount }, (_, index) => <i className={screenIndex === index ? 'active' : ''} key={index} />)}</div></div>
}
