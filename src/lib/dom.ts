export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Smooth-scroll to a section and keep the URL hash in sync. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'home' ? location.pathname + location.search : `#${id}`)
}

export function openExternal(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function isApplePlatform(): boolean {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
}
