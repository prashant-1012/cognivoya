import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'

const InstallBanner = () => {
  const [prompt, setPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-dismissed') === '1'
  )

  useEffect(() => {
    if (dismissed) return
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [dismissed])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setVisible(false)
  }

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    localStorage.setItem('pwa-dismissed', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
        >
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Download size={18} className="text-brand-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Install Cognivoya</p>
              <p className="text-xs text-muted">Add to home screen for quick access</p>
            </div>
            <button
              onClick={handleInstall}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="shrink-0 text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstallBanner
