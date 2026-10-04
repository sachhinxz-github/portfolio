import { createContext, useContext, type Context } from 'react'
import type { GalleryImage } from '../data/portfolio'

function useRequired<T>(context: Context<T | null>, name: string): T {
  const value = useContext(context)
  if (value === null) throw new Error(`${name} must be used inside <Providers>`)
  return value
}

/* Toast: a short confirmation message at the bottom of the screen. */
export type Notify = (message: string) => void
export const ToastContext = createContext<Notify | null>(null)
export const useToast = (): Notify => useRequired(ToastContext, 'useToast')

/* Lightbox: full-screen image viewer. */
export type OpenLightbox = (images: GalleryImage[], index?: number) => void
export const LightboxContext = createContext<OpenLightbox | null>(null)
export const useLightbox = (): OpenLightbox => useRequired(LightboxContext, 'useLightbox')

/* Command palette (Ctrl/⌘ + K). */
export type PaletteControls = { open: boolean; setOpen: (open: boolean) => void }
export const PaletteContext = createContext<PaletteControls | null>(null)
export const usePalette = (): PaletteControls => useRequired(PaletteContext, 'usePalette')
