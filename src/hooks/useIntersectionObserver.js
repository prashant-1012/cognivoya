import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting }
}

export default useIntersectionObserver
