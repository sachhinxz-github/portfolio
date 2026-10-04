import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'
export type Point = { x: number; y: number }

export type ThemeContextValue = {
  theme: Theme
  /** `origin` is where the reveal animation starts (viewport coordinates). */
  setTheme: (next: Theme, origin?: Point) => void
  toggleTheme: (origin?: Point) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>')
  return value
}
