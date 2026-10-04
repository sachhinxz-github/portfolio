import { Download, Menu, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { usePalette } from '../../context/ui'
import { profile, sections } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLockScroll } from '../../hooks/useLockScroll'
import { cn } from '../../lib/cn'
import { isApplePlatform, scrollToSection } from '../../lib/dom'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { iconButtonBare, iconButtonLarge, primaryButton, primaryButtonCompact } from '../ui/buttonStyles'
import { ThemeToggle } from './ThemeToggle'

/** "home" is observed too, so no link stays highlighted while the hero is on screen. */
const OBSERVED_IDS = ['home', ...sections.map((section) => section.id)]

export function Navbar() {
  const active = useActiveSection(OBSERVED_IDS)
  const { setOpen: setPaletteOpen } = usePalette()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  const [menuOpen, setMenuOpen] = useState(false)
  const shortcut = isApplePlatform() ? '⌘K' : 'Ctrl K'

  useLockScroll(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, or when the window grows to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const goFromMenu = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setMenuOpen(false)
    // Wait for the menu to release the scroll lock before scrolling.
    window.setTimeout(() => scrollToSection(id), 80)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
          <a href="#home" aria-label="Sachin S. S — back to top" className="font-mono text-sm font-semibold text-fg">
            <span className="text-accent">~/</span>sachin
            <span className="animate-blink text-accent" aria-hidden="true">
              _
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((section) => {
              const isActive = active === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-lg px-2.5 py-2 font-mono text-[13px] transition-colors xl:px-3',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg border border-line bg-fg/[0.06]"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{section.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="flex h-10 items-center gap-2 rounded-lg border border-line px-3 text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <Search className="size-4" aria-hidden="true" />
              <kbd className="hidden font-mono text-[11px] xl:block">{shortcut}</kbd>
            </button>
            <ThemeToggle />
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className={cn(primaryButtonCompact, 'hidden md:inline-flex')}
            >
              Résumé <Download className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(iconButtonBare, 'flex lg:hidden')}
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col justify-between gap-10 py-8">
              <ul>
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => goFromMenu(event, section.id)}
                      className="flex items-baseline gap-4 py-4 font-display text-3xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-xs font-normal text-accent">{String(index + 1).padStart(2, '0')}</span>
                      {section.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <a href={profile.resume} target="_blank" rel="noreferrer" className={cn(primaryButton, 'flex-1')}>
                  Résumé <Download className="size-4" aria-hidden="true" />
                </a>
                <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButtonLarge}>
                  <GithubIcon className="size-5" />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButtonLarge}>
                  <LinkedinIcon className="size-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
