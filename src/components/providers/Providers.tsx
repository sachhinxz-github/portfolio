import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { LightboxProvider } from './LightboxProvider'
import { PaletteProvider } from './PaletteProvider'
import { ToastProvider } from './ToastProvider'

/** App-wide state: toasts, the image lightbox and the command palette. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // "user" = honour the visitor's reduced-motion setting for every motion component.
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <LightboxProvider>
          <PaletteProvider>{children}</PaletteProvider>
        </LightboxProvider>
      </ToastProvider>
    </MotionConfig>
  )
}
