import { useInView, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useTheme } from '../../context/theme'
import { complete, createCommands } from './terminalCommands'

type Line = { id: number; kind: 'command' | 'output'; content: ReactNode }

/** Typed out automatically the first time the terminal scrolls into view. */
const BOOT_SEQUENCE = ['whoami', 'now']
const SUGGESTIONS = ['help', 'projects', 'skills', 'contact']

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

function Prompt() {
  return (
    <span className="shrink-0 select-none" aria-hidden="true">
      <span className="hidden sm:inline">
        <span className="text-accent">sachin</span>
        <span className="text-dim">@</span>
        <span className="text-cyan">portfolio</span>
        <span className="text-dim">:</span>
      </span>
      <span className="text-cyan">~</span>
      <span className="text-dim">$</span>
    </span>
  )
}

/**
 * A small working shell: type `help`, use ↑/↓ for history and Tab to complete.
 * It keeps a dark colour scheme in both site themes, like a real terminal window.
 */
export function Terminal() {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  const history = useRef<string[]>([])
  const historyCursor = useRef<number | null>(null)

  const inView = useInView(rootRef, { once: true, amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const { setTheme } = useTheme()

  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [autoTyped, setAutoTyped] = useState('')
  const [booting, setBooting] = useState(true)

  const shell = useMemo(() => createCommands({ setTheme, history }), [setTheme])

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim()
      const entry: Line = { id: nextId.current++, kind: 'command', content: text }
      if (!text) {
        setLines((current) => [...current, entry])
        return
      }

      history.current.push(text)
      historyCursor.current = null

      const [name, ...args] = text.split(/\s+/)
      const command = shell.find(name)
      if (command?.name === 'clear') {
        setLines([])
        return
      }

      const output = command ? (
        command.run(args)
      ) : (
        <p>
          command not found: {name} <span className="text-dim">— type “help”</span>
        </p>
      )
      setLines((current) => [
        ...current,
        entry,
        ...(output ? [{ id: nextId.current++, kind: 'output' as const, content: output }] : []),
      ])
    },
    [shell],
  )

  // Boot sequence: type a couple of commands so the terminal introduces itself.
  useEffect(() => {
    if (!inView) return
    let cancelled = false

    const boot = async () => {
      history.current = []
      setLines([])
      for (const command of BOOT_SEQUENCE) {
        if (!reduceMotion) {
          await wait(420)
          for (let length = 1; length <= command.length; length++) {
            if (cancelled) return
            setAutoTyped(command.slice(0, length))
            await wait(65)
          }
          await wait(240)
        }
        if (cancelled) return
        setAutoTyped('')
        run(command)
      }
      setBooting(false)
    }

    void boot()
    return () => {
      cancelled = true
    }
  }, [inView, reduceMotion, run])

  // Keep the newest output in view (scrolls the terminal only, never the page).
  useEffect(() => {
    const scroller = scrollRef.current
    if (scroller) scroller.scrollTop = scroller.scrollHeight
  }, [lines, autoTyped])

  const focusInput = () => {
    // Don't steal focus from a text selection the visitor is making.
    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const past = history.current

    if (event.key === 'Enter') {
      event.preventDefault()
      run(input)
      setInput('')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (past.length === 0) return
      const cursor = historyCursor.current === null ? past.length - 1 : Math.max(historyCursor.current - 1, 0)
      historyCursor.current = cursor
      setInput(past[cursor])
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyCursor.current === null) return
      const cursor = historyCursor.current + 1
      if (cursor >= past.length) {
        historyCursor.current = null
        setInput('')
      } else {
        historyCursor.current = cursor
        setInput(past[cursor])
      }
    } else if (event.key === 'Tab' && input.trim()) {
      // With an empty prompt, Tab keeps its normal job of moving focus onwards.
      event.preventDefault()
      const completed = complete(input, shell.names)
      if (completed) setInput(completed)
    } else if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault()
      setLines([])
    }
  }

  return (
    <div ref={rootRef} data-theme="dark" className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
      />
      <section
        aria-label="Interactive terminal"
        className="overflow-hidden rounded-2xl border border-line-strong bg-[#0a0d12]/95 text-fg shadow-2xl shadow-black/50 backdrop-blur"
      >
        <header className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <p className="ml-2 flex-1 truncate font-mono text-xs text-dim">sachin@portfolio: ~</p>
          <span className="rounded border border-accent/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            interactive
          </span>
        </header>

        <div
          ref={scrollRef}
          onClick={focusInput}
          className="thin-scroll h-80 cursor-text overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
        >
          <div role="log" aria-live="polite">
            {lines.map((line) =>
              line.kind === 'command' ? (
                <p key={line.id} className="mt-3 flex gap-2 first:mt-0">
                  <Prompt />
                  <span className="min-w-0 break-words text-fg">{line.content}</span>
                </p>
              ) : (
                <div key={line.id} className="mt-1.5 text-muted">
                  {line.content}
                </div>
              ),
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Prompt />
            {booting ? (
              <span className="text-fg" aria-hidden="true">
                {autoTyped}
                <span className="ml-px inline-block h-[1.15em] w-[0.6em] translate-y-[0.22em] animate-blink bg-accent" />
              </span>
            ) : (
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal input — type help and press Enter"
                placeholder="type “help”"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="w-full min-w-0 flex-1 bg-transparent text-base text-fg caret-accent outline-none placeholder:text-dim/70 sm:text-[13px]"
              />
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-3">
          <span className="font-mono text-[11px] text-dim">try:</span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={booting}
              onClick={() => run(suggestion)}
              className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </footer>
      </section>
    </div>
  )
}
