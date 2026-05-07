import { useEffect } from 'react'

const useKeyboardShortcut = (key, callback, { ctrl = false, meta = false } = {}) => {
  useEffect(() => {
    const handler = (e) => {
      const ctrlMatch = ctrl ? e.ctrlKey || e.metaKey : true
      const metaMatch = meta ? e.metaKey : true
      if (ctrlMatch && metaMatch && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback, ctrl, meta])
}

export default useKeyboardShortcut
