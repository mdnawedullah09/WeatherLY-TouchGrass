import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function PhoneScreen({ children, label }: { children: ReactNode; label: string }) {
  return <motion.div className="phone-screen" aria-live="polite" initial={{ opacity: 0, y: 10, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 1.015 }} transition={{ duration: .42, ease: 'easeOut' }}><div className="timeline-label">{label}</div>{children}</motion.div>
}
