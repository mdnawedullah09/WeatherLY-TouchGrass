import { Navbar } from '../components/layout/Navbar'
import { Hero } from '../components/hero/Hero'
import { Features } from '../components/sections/Features'
import { CallToAction } from '../components/sections/CallToAction'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-900">
      <Navbar />
      <Hero />
      <Features />
            <CallToAction />
    </main>
  )
}
