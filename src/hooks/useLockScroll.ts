import { useEffect } from 'react'

let activeLocks = 0

/** Freeze page scrolling while an overlay (menu, lightbox, palette) is open. */
export function useLockScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return
    activeLocks += 1
    document.documentElement.style.overflow = 'hidden'
    return () => {
      activeLocks -= 1
      if (activeLocks === 0) document.documentElement.style.overflow = ''
    }
  }, [active])
}
