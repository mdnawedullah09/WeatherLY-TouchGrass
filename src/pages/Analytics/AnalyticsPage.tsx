import { ChevronLeft } from 'lucide-react'
import { ClimateAnalytics } from '../../components/sections/ClimateAnalytics'
import { Link } from 'react-router-dom'

export default function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <Link to="/dashboard" aria-label="Go back" className="text-slate-500">
          <ChevronLeft size={18} />
        </Link>
        <span className="font-semibold">Farmer & Analytics</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-4">
        <ClimateAnalytics />
      </div>
    </div>
  )
}
