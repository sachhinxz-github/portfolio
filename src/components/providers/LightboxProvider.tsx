import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { LightboxContext, type OpenLightbox } from '../../context/ui'
import type { GalleryImage } from '../../data/portfolio'
import { useLockScroll } from '../../hooks/useLockScroll'

type LightboxState = { images: GalleryImage[]; index: number }

const SWIPE_DISTANCE = 48

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null)

  const open = useCallback<OpenLightbox>((images, index = 0) => {
    if (images.length > 0) setState({ images, index })
  }, [])
  const close = useCallback(() => setState(null), [])
  const step = useCallback((delta: number) => {
    setState((current) =>
      current && { ...current, index: (current.index + delta + current.images.length) % current.images.length },
    )
  }, [])

  return (
    <LightboxContext value={open}>
      {children}
      <AnimatePresence>
        {state && <LightboxDialog key="lightbox" state={state} onClose={close} onStep={step} />}
      </AnimatePresence>
    </LightboxContext>
  )
}

function LightboxDialog({
  state,
  onClose,
  onStep,
}: {
  state: LightboxState
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const { images, index } = state
  const image = images[index]
  const hasMany = images.length > 1
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeStart = useRef<number | null>(null)

  useLockScroll(true)

  // Move focus into the dialog, and hand it back to the opener on close.
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    return () => opener?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight' && hasMany) onStep(1)
      else if (event.key === 'ArrowLeft' && hasMany) onStep(-1)
      else if (event.key === 'Tab') {
        // Keep keyboard focus inside the dialog.
        const buttons = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? [])]
        if (buttons.length === 0) return
        const position = buttons.indexOf(document.activeElement as HTMLElement)
        const next = (position + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length
        event.preventDefault()
        buttons[next].focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasMany, onClose, onStep])

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX
  }
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null || !hasMany) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) > SWIPE_DISTANCE) onStep(distance < 0 ? 1 : -1)
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${image.caption}`}
      data-theme="dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[110] flex flex-col bg-black/92 text-fg backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="text-dim">/ {String(images.length).padStart(2, '0')}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Close <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={(event) => event.target === event.currentTarget && onClose()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={image.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex max-h-full min-h-0 flex-col items-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              draggable={false}
              className="max-h-[74svh] w-auto max-w-full rounded-lg border border-line object-contain shadow-2xl select-none"
            />
            <figcaption className="mt-4 max-w-xl text-center text-sm text-muted">{image.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-black/60 text-fg transition-colors hover:border-accent hover:text-accent sm:left-5"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-black/60 text-fg transition-colors hover:border-accent hover:text-accent sm:right-5"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}
