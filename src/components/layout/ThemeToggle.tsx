import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { MouseEvent } from 'react'
import { useTheme } from '../../context/theme'
import { iconButton } from '../ui/buttonStyles'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const Icon = theme === 'dark' ? Sun : Moon

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // The new theme is revealed in a circle growing out of this button.
    const box = event.currentTarget.getBoundingClientRect()
    toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={iconButton}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.16 }}
          className="flex"
        >
          <Icon className="size-[18px]" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
