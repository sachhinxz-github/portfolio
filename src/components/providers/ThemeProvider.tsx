import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ThemeContext, type Point, type Theme } from '../../context/theme'
import { prefersReducedMotion } from '../../lib/dom'

const BROWSER_CHROME_COLOR: Record<Theme, string> = { dark: '#07090c', light: '#f4f5ef' }

/** The inline script in index.html has already put the saved theme on <html>. */
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BROWSER_CHROME_COLOR[theme])
  }, [theme])

  const setTheme = useCallback((next: Theme, origin?: Point) => {
    const commit = () => {
      applyTheme(next)
      setThemeState(next)
    }

    if (!('startViewTransition' in document) || prefersReducedMotion()) {
      commit()
      return
    }

    // Reveal the new theme as a circle growing out of the toggle button.
    const x = origin?.x ?? window.innerWidth - 48
    const y = origin?.y ?? 32
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(commit))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 520, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {
        // The transition was skipped (e.g. tab hidden); the theme has still been applied.
      })
  }, [])

  const toggleTheme = useCallback(
    (origin?: Point) => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', origin),
    [setTheme],
  )

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
