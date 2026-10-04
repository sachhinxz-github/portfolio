import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** A numbered page section with the shared heading treatment. */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string
  index: string
  label: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <header className="mb-10 max-w-3xl sm:mb-14">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              <span>{index}</span>
              <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
              <span>{label}</span>
            </p>
            <h2
              id={`${id}-title`}
              className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {title}
              <span className="text-accent">.</span>
            </h2>
            {intro && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{intro}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
