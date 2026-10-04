import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from '../../context/ui'

const VISIBLE_MS = 2600

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)
  const hideTimer = useRef<number | undefined>(undefined)

  const notify = useCallback((message: string) => {
    window.clearTimeout(hideTimer.current)
    setToast({ id: Date.now(), message })
    hideTimer.current = window.setTimeout(() => setToast(null), VISIBLE_MS)
  }, [])

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  return (
    <ToastContext value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2 px-4 py-2.5 font-mono text-xs text-fg shadow-2xl shadow-black/40"
            >
              <Check className="size-3.5 text-accent" aria-hidden="true" />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext>
  )
}
