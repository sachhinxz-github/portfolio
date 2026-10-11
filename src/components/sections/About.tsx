import { BrainCircuit, CircuitBoard, CodeXml, Puzzle, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { focusAreas, now, portraits, profile } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const FOCUS_ICONS: Record<(typeof focusAreas)[number]['id'], LucideIcon> = {
  web: CodeXml,
  iot: CircuitBoard,
  ml: BrainCircuit,
  dsa: Puzzle,
}

const photo = portraits[0]

/** Big editorial statement with the key phrases in bold, like a driver's "message" section. */
function Statement() {
  return (
    <p className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-balance">
      I'm an aspiring software engineer with hands-on experience in{' '}
      <strong className="font-extrabold text-accent">front-end and back-end web development</strong>,{' '}
      <strong className="font-extrabold text-accent">IoT solutions</strong> and{' '}
      <strong className="font-extrabold text-accent">data analytics</strong> — currently an R&D and Operations Intern at{' '}
      <strong className="font-extrabold">{now.company}</strong>, Bengaluru.
    </p>
  )
}

export function About() {
  return (
    <Section id="about" index="01" label="About" title={['Software,', 'hardware & data']} scheme="light">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Portrait with a clip reveal and a green stripe */}
        <Reveal className="lg:col-span-5">
          <figure className="relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-surface-2"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </motion.div>
            <span aria-hidden="true" className="absolute -left-3 top-10 h-40 w-1.5 bg-green" />
            <span aria-hidden="true" className="absolute -left-3 top-52 h-10 w-1.5 bg-lime" />
            <figcaption className="label-tech mt-4 flex items-center justify-between text-[10px] text-dim">
              <span>{profile.name}</span>
              <span>Coimbatore → Bengaluru</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Statement />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
              <div>
                <h3 className="label-tech text-[11px] text-accent">How I work</h3>
                <p className="mt-4 leading-relaxed text-muted">{profile.approach}</p>
              </div>
              <div>
                <h3 className="label-tech text-[11px] text-accent">Where I'm heading</h3>
                <p className="mt-4 leading-relaxed text-muted">{profile.goals}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <blockquote className="mt-10 border-l-2 border-green pl-5">
              <p className="font-display text-xl font-semibold tracking-tight">“{profile.motto.quote}”</p>
              <p className="mt-1.5 text-muted">{profile.motto.line}</p>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* What I build */}
      <Reveal className="mt-20">
        <h3 className="label-tech text-[11px] text-accent">What I enjoy building</h3>
      </Reveal>
      <ol className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area, position) => {
          const Icon = FOCUS_ICONS[area.id]
          return (
            <li key={area.id} className="bg-bg">
              <Reveal delay={0.06 * position} className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-dim">0{position + 1}</span>
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                </div>
                <h4 className="display-wide mt-10 text-2xl">{area.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.text}</p>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
