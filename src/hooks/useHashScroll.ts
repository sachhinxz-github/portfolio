import { useEffect } from 'react'

/**
 * Scroll to the section named in the URL hash once the app has rendered.
 * The browser's own fragment scroll runs before React mounts, so without
 * this a visitor landing on /#projects (or an old URL redirected to one)
 * would stay at the top of the page.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    // Two frames: one for React to commit, one for layout to settle.
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })),
    )
    return () => cancelAnimationFrame(frame)
  }, [])
}
