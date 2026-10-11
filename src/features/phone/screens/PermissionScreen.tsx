import { BellRing, MapPin } from 'lucide-react'

export function PermissionScreen() {
  return <div className="phone-permission"><div className="permission-icon"><MapPin size={25} /></div><h3>Weather, right where you are.</h3><p>Allow location and notifications for local forecasts and timely alerts.</p><button>Allow permissions</button><small><BellRing size={12} /> You stay in control</small></div>
}
