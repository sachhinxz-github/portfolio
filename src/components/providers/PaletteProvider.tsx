import { ArrowUp, Copy, CornerDownLeft, FileText, Hash, Mail, Moon, Search, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { useTheme } from '../../context/theme'
import { PaletteContext } from '../../context/ui'
import { profile, sections } from '../../data/portfolio'
import { useCopy } from '../../hooks/useCopy'
import { useLockScroll } from '../../hooks/useLockScroll'
import { cn } from '../../lib/cn'
import { openExternal, scrollToSection } from '../../lib/dom'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

type PaletteItem = {
  id: string
  group: 'Navigate' | 'Actions' | 'Links'
  label: string
  hint?: string
  keywords?: string
  icon: ComponentType<{ className?: string }>
  run: () => void
}

/** Scrolling has to wait until the palette has closed and released the scroll lock. */
const afterClose = (action: () => void) => () => window.setTimeout(action, 80)

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const controls = useMemo(() => ({ open, setOpen }), [open])

  return (
    <PaletteContext value={controls}>
      {children}
      <AnimatePresence>{open && <PaletteDialog key="palette" onClose={() => setOpen(false)} />}</AnimatePresence>
    </PaletteContext>
  )
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const copy = useCopy()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useLockScroll(true)

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()
    return () => opener?.focus({ preventScroll: true })
  }, [])

  const items = useMemo<PaletteItem[]>(
    () => [
      ...sections.map((section) => ({
        id: `go-${section.id}`,
        group: 'Navigate' as const,
        label: section.label,
        hint: `#${section.id}`,
        keywords: 'go to jump section',
        icon: Hash,
        run: afterClose(() => scrollToSection(section.id)),
      })),
      {
        id: 'go-top',
        group: 'Navigate',
        label: 'Back to top',
        keywords: 'home start hero',
        icon: ArrowUp,
        run: afterClose(() => scrollToSection('home')),
      },
      {
        id: 'resume',
        group: 'Actions',
        label: 'Open résumé (PDF)',
        keywords: 'resume cv download',
        icon: FileText,
        run: () => openExternal(profile.resume),
      },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        keywords: 'mail contact clipboard',
        icon: Copy,
        run: () => copy(profile.email, 'Email copied to clipboard'),
      },
      {
        id: 'theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        keywords: 'dark light mode appearance colour color',
        icon: theme === 'dark' ? Sun : Moon,
        run: () => toggleTheme(),
      },
      {
        id: 'github',
        group: 'Links',
        label: 'GitHub',
        hint: 'sachhinxz-github',
        keywords: 'code repositories source',
        icon: GithubIcon,
        run: () => openExternal(profile.links.github),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'LinkedIn',
        keywords: 'profile connect',
        icon: LinkedinIcon,
        run: () => openExternal(profile.links.linkedin),
      },
      {
        id: 'email',
        group: 'Links',
        label: 'Send an email',
        hint: profile.email,
        keywords: 'mail contact hire',
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`
        },
      },
    ],
    [copy, theme, toggleTheme],
  )

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return items
    return items.filter((item) => {
      const haystack = `${item.label} ${item.group} ${item.hint ?? ''} ${item.keywords ?? ''}`.toLowerCase()
      return tokens.every((token) => haystack.includes(token))
    })
  }, [items, query])

  const active = Math.min(selected, Math.max(results.length - 1, 0))

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, results])

  const choose = (item: PaletteItem) => {
    onClose()
    item.run()
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected(results.length ? (active + 1) % results.length : 0)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected(results.length ? (active - 1 + results.length) % results.length : 0)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (results[active]) choose(results[active])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'Tab') {
      event.preventDefault() // focus stays in the search field while the palette is open
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[105] bg-black/60 px-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-[14svh] w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/50"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-dim" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelected(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section or run a command…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
            aria-label="Search commands"
            spellCheck={false}
            autoComplete="off"
            className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-dim"
          />
          <kbd className="shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">ESC</kbd>
        </div>

        <div ref={listRef} id="palette-results" role="listbox" aria-label="Commands" className="thin-scroll max-h-[min(52svh,24rem)] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted">
              Nothing matches “{query}”.
            </p>
          )}
          {results.map((item, position) => {
            const startsGroup = position === 0 || results[position - 1].group !== item.group
            const isActive = position === active
            return (
              <div key={item.id}>
                {startsGroup && (
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{item.group}</p>
                )}
                <button
                  type="button"
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={-1}
                  onMouseMove={() => setSelected(position)}
                  onClick={() => choose(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    isActive ? 'bg-accent/10 text-fg' : 'text-muted',
                  )}
                >
                  <item.icon className={cn('size-4 shrink-0', isActive ? 'text-accent' : 'text-dim')} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="hidden truncate font-mono text-xs text-dim sm:block">{item.hint}</span>}
                  {isActive && <CornerDownLeft className="size-3.5 shrink-0 text-accent" aria-hidden="true" />}
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
          <span>
            <kbd className="rounded border border-line px-1">↑</kbd> <kbd className="rounded border border-line px-1">↓</kbd> navigate
          </span>
          <span>
            <kbd className="rounded border border-line px-1">↵</kbd> select
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
