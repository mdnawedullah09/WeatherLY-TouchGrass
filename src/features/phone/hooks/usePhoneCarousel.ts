import { useEffect, useState } from 'react'
import type { PhoneScreenDefinition } from '../types'

export function usePhoneCarousel(screens: PhoneScreenDefinition[], options: { splashDuration?: number; interval?: number; paused?: boolean } = {}) {
  const { splashDuration = 2000, interval = 3500, paused = false } = options
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused) return
    let rotationTimer: number | undefined
    const startRotation = () => {
      setIndex((current) => current === 0 ? 1 % screens.length : current)
      rotationTimer = window.setInterval(() => setIndex((current) => (current + 1) % screens.length), interval)
    }
    const splashTimer = index === 0 ? window.setTimeout(startRotation, splashDuration) : window.setTimeout(startRotation, interval)

    return () => {
      window.clearTimeout(splashTimer)
      if (rotationTimer) window.clearInterval(rotationTimer)
    }
  }, [interval, paused, screens.length, splashDuration])

  const next = () => setIndex((current) => (current + 1) % screens.length)
  const previous = () => setIndex((current) => (current - 1 + screens.length) % screens.length)

  return { index, screen: screens[index], next, previous, setIndex }
}
