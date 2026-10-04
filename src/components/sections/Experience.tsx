import { ArrowUpRight, FileText } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'
import { Tag } from '../ui/Tag'

export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Where I've been working">
      {/* The ::before pseudo-element is the vertical timeline rail. */}
      <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-[7px] before:top-2 before:w-px before:bg-line-strong lg:before:left-[13.5rem]">
        {experience.map((job) => (
          <li key={job.id} className="relative pl-9 lg:grid lg:grid-cols-[12rem_1fr] lg:gap-12 lg:pl-0">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 flex size-[15px] items-center justify-center lg:left-[13.5rem] lg:top-8 lg:-translate-x-1/2"
            >
              {job.current && <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />}
              <span
                className={cn(
                  'relative size-[11px] rounded-full border-2',
                  job.current ? 'border-accent bg-accent' : 'border-dim bg-bg',
                )}
              />
            </span>

            <Reveal className="mb-3 lg:mb-0 lg:pt-7 lg:text-right">
              <p className={cn('font-mono text-sm', job.current ? 'text-accent' : 'text-fg')}>{job.period}</p>
              <p className="mt-1 font-mono text-xs text-dim">{job.location}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <SpotlightCard className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
                    <p className="mt-1 text-muted">
                      <span className="font-medium text-accent">@ {job.company}</span>
                    </p>
                  </div>
                  {job.current && (
                    <span className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                      Current
                    </span>
                  )}
                </div>

                {job.summary && <p className="mt-4 leading-relaxed text-muted">{job.summary}</p>}

                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {job.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {job.quote && (
                  <blockquote className="mt-5 border-l-2 border-accent/60 pl-4">
                    <p className="text-[15px] italic text-fg/90">“{job.quote.text}”</p>
                    <footer className="mt-1 font-mono text-xs text-dim">— {job.quote.source}</footer>
                  </blockquote>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {job.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {job.link && (
                    <a
                      href={job.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-fg transition-colors hover:text-accent"
                    >
                      <FileText className="size-3.5" aria-hidden="true" />
                      {job.link.label}
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
