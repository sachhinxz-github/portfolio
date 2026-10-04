import { BrainCircuit, CircuitBoard, CodeXml, Puzzle, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { focusAreas, now, portraits, profile } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'

const FOCUS_ICONS: Record<(typeof focusAreas)[number]['id'], LucideIcon> = {
  web: CodeXml,
  iot: CircuitBoard,
  ml: BrainCircuit,
  dsa: Puzzle,
}

const SLIDE_MS = 4500

/** Photo frame that cross-fades through the portraits; pauses while hovered. */
function PortraitCard() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const photo = portraits[index]

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % portraits.length), SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  return (
    <figure
      className="relative mx-auto w-full max-w-sm lg:mx-0"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Viewfinder-style corner marks */}
      <span aria-hidden="true" className="absolute -left-2.5 -top-2.5 size-6 rounded-tl-lg border-l-2 border-t-2 border-accent" />
      <span aria-hidden="true" className="absolute -right-2.5 -top-2.5 size-6 rounded-tr-lg border-r-2 border-t-2 border-accent" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
        <AnimatePresence initial={false}>
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 font-mono text-xs text-white">
          <span>
            {profile.name}
            <span className="mt-0.5 block text-white/65">
              {now.role} @ {now.company}
            </span>
          </span>
          <span className="shrink-0 text-white/65" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}/{String(portraits.length).padStart(2, '0')}
          </span>
        </figcaption>
      </div>

      <div className="mt-2 flex gap-2">
        {portraits.map((portrait, position) => (
          <button
            key={portrait.src}
            type="button"
            onClick={() => setIndex(position)}
            aria-label={`Show photo ${position + 1} of ${portraits.length}`}
            aria-current={position === index ? 'true' : undefined}
            className="group/dot flex-1 py-2.5"
          >
            <span
              className={cn(
                'block h-1 rounded-full transition-colors',
                position === index ? 'bg-accent' : 'bg-line-strong group-hover/dot:bg-dim',
              )}
            />
          </button>
        ))}
      </div>
    </figure>
  )
}

export function About() {
  return (
    <Section id="about" index="01" label="About" title="Software, hardware, and the data in between">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <PortraitCard />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.summary.map((paragraph, position) => (
                <p key={position} className={cn('text-pretty', position === 0 && 'text-xl text-fg')}>
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-display text-xl font-medium text-fg">“{profile.motto.quote}”</p>
              <p className="mt-1.5 text-muted">{profile.motto.line}</p>
            </blockquote>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {focusAreas.map((area, position) => {
              const Icon = FOCUS_ICONS[area.id]
              return (
                <li key={area.id}>
                  <Reveal delay={0.06 * position} className="h-full">
                    <SpotlightCard className="h-full p-5">
                      <Icon className="size-5 text-accent" aria-hidden="true" />
                      <h3 className="mt-4 font-display text-lg font-semibold">{area.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.text}</p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
