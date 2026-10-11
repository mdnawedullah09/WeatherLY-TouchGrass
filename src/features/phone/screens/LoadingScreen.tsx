import { BrainCircuit, LoaderCircle } from 'lucide-react'

export function LoadingScreen() {
  return <div className="phone-loading"><div className="loading-orbit"><BrainCircuit size={26} /></div><h3>Reading the atmosphere</h3><p>Connecting weather signals around you...</p><LoaderCircle size={18} className="loading-spinner" /></div>
}
