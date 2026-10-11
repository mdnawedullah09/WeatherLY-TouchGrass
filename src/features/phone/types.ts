export type PhoneScreenId = 'splash' | 'permission' | 'loading' | 'home' | 'chat' | 'dashboard' | 'radar' | 'map' | 'alerts' | 'voice' | 'eco-reels' | 'wallet' | 'analytics'

export type PhoneTab = 'home' | 'chat' | 'map' | 'alerts' | 'profile'

export type PhoneScreenDefinition = {
  id: PhoneScreenId
  label: string
  tab: PhoneTab
}
