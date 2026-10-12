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

    // Once the visitor scrolls on their own, stop correcting the position.
    let userScrolled = false
    const markScrolled = () => {
      userScrolled = true
    }
    const jump = () => {
      if (!userScrolled) document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    // Two frames: one for React to commit, one for layout to settle.
    const frame = requestAnimationFrame(() => requestAnimationFrame(jump))
    // Headlines change height when the web fonts swap in and images stream in
    // above the target, so jump again once loading has finished.
    document.fonts.ready.then(jump).catch(() => {})
    window.addEventListener('load', jump, { once: true })
    for (const event of ['wheel', 'touchmove', 'keydown']) window.addEventListener(event, markScrolled, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('load', jump)
      for (const event of ['wheel', 'touchmove', 'keydown']) window.removeEventListener(event, markScrolled)
    }
  }, [])
}
