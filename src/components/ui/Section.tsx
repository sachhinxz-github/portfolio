import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

export type Scheme = 'dark' | 'light' | 'green'

/**
 * A page section with its own colour scheme and the shared editorial opener:
 * a numbered technical label, then an oversized two-line title.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  scheme = 'dark',
  secondLine = 'outline',
  aside,
  className,
  children,
}: {
  id: string
  index: string
  label: string
  /** Each entry is one line of the headline. */
  title: [string, string] | [string]
  intro?: string
  scheme?: Scheme
  /** How the second headline line is drawn. */
  secondLine?: 'outline' | 'accent'
  /** Optional content to the right of the title (e.g. a button). */
  aside?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      data-theme={scheme}
      aria-labelledby={`${id}-title`}
      className={cn('relative bg-bg py-24 text-fg sm:py-32', className)}
    >
      <div className="container-page">
        <Reveal>
          <header className="mb-14 flex flex-col gap-8 border-t border-line pt-6 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label-tech flex items-center gap-4 text-xs text-accent">
                <span>{index}</span>
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                <span>{label}</span>
              </p>
              <h2 id={`${id}-title`} className="display-wide mt-6 text-[clamp(2rem,9.5vw,7.5rem)]">
                {title.map((line, position) => (
                  <span
                    key={position}
                    className={cn('block', position === 1 && (secondLine === 'accent' ? 'text-accent' : 'text-outline'))}
                  >
                    {line}
                  </span>
                ))}
              </h2>
              {intro && <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
