import { Navbar } from '../../components/layout/Navbar'
import { Architecture } from '../../components/sections/Architecture'
import { TechStack } from '../../components/sections/TechStack'
import { GovernmentIntegrations } from '../../components/sections/GovernmentIntegrations'
import { Impact } from '../../components/sections/Impact'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="pt-24 pb-12 space-y-12">
        <Architecture />
        <TechStack />
        <GovernmentIntegrations />
        <Impact />
      </div>
    </main>
  )
}
