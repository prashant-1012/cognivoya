import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!started) return

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOutCubic(progress) * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, started])

  return count
}
