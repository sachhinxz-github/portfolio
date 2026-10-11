import { ArrowUpRight, Images } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useLightbox } from '../../context/ui'
import { featuredProject, projects, type Project } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { GithubIcon } from '../ui/BrandIcons'
import { secondaryButton } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'
import { GithubFeed } from './GithubFeed'
import { UrlScanner } from './UrlScanner'

/* ------------------------------------------------------------------ */
/* One editorial showcase per project: text on one side, visual on the */
/* other, swapping sides from project to project.                      */
/* ------------------------------------------------------------------ */

function ProjectShowcase({
  project,
  number,
  reverse = false,
  visual,
}: {
  project: Project
  number: string
  reverse?: boolean
  visual: ReactNode
}) {
  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="grid scroll-mt-24 grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14"
    >
      <Reveal className={cn('min-w-0 lg:col-span-5', reverse && 'lg:order-2')}>
        <p className="label-tech flex items-center gap-4 text-[11px] text-accent">
          <span>{number}</span>
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span>{project.category}</span>
        </p>
        <h3 id={`project-${project.id}-title`} className="display-wide mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
          {project.title}
        </h3>
        <p className="mt-2 font-display text-lg font-medium text-muted">{project.subtitle}</p>

        <dl className="mt-8 space-y-7">
          <div>
            <dt className="label-tech text-[11px] text-dim">The problem</dt>
            <dd className="mt-2 leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="label-tech text-[11px] text-dim">What I built</dt>
            <dd className="mt-2">
              <ul className="space-y-2.5">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-[0.7em] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label-tech text-[11px] text-dim">Key features</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Tag>{feature}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {project.challenges && (
            <div>
              <dt className="label-tech text-[11px] text-dim">Engineering decisions</dt>
              <dd className="mt-2 leading-relaxed text-muted">{project.challenges}</dd>
            </div>
          )}
          <div>
            <dt className="label-tech text-[11px] text-dim">Stack</dt>
            <dd className="mt-2 font-mono text-sm text-fg">{project.stack.join(' · ')}</dd>
          </div>
        </dl>

        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={secondaryButton}>
                <GithubIcon className="size-4" />
                {link.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1} className={cn('min-w-0 lg:col-span-7', reverse && 'lg:order-1')}>
        {visual}
      </Reveal>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

/** Frame around each visual with a technical label in the corner. */
function Frame({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative border border-line bg-surface', className)}>
      <span aria-hidden="true" className="label-tech absolute left-4 top-4 z-10 text-[10px] text-accent">
        {label}
      </span>
      {children}
    </div>
  )
}

/** Three app screens fanned out like phones on a desk. */
const SCREEN_TILT = [
  '-rotate-6 translate-y-3 group-hover/cover:-translate-x-3 group-hover/cover:-rotate-9',
  'z-10 scale-110',
  'rotate-6 translate-y-3 group-hover/cover:translate-x-3 group-hover/cover:rotate-9',
]

function ScreensVisual({ project }: { project: (typeof projects)[number] }) {
  const openLightbox = useLightbox()
  const gallery = project.gallery ?? []
  return (
    <Frame label={`${project.title} / Prototype`}>
      <button
        type="button"
        onClick={() => openLightbox(gallery)}
        aria-label={`Open the ${project.title} gallery (${gallery.length} images)`}
        className="group/cover relative block aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_120%,var(--glow),transparent_60%)] sm:aspect-[16/10]"
      >
        <span className="absolute inset-0 flex items-center justify-center gap-5 sm:gap-8">
          {project.coverImages.map((image, position) => (
            <span
              key={image.src}
              className={cn(
                'relative block aspect-[9/19] h-[72%] overflow-hidden rounded-[14px] border-2 border-white/15 bg-black shadow-2xl shadow-black/50 transition-transform duration-700 ease-out-expo',
                SCREEN_TILT[position],
              )}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover" />
            </span>
          ))}
        </span>
        <GalleryBadge count={gallery.length} />
      </button>
    </Frame>
  )
}

function PhotoVisual({ project }: { project: (typeof projects)[number] }) {
  const openLightbox = useLightbox()
  const gallery = project.gallery ?? []
  const cover = project.coverImages[0]
  return (
    <Frame label={`${project.title} / Build`}>
      <button
        type="button"
        onClick={() => openLightbox(gallery)}
        aria-label={`Open the ${project.title} gallery (${gallery.length} images)`}
        className="group/cover relative block aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]"
      >
        <motion.img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover/cover:scale-105"
        />
        <GalleryBadge count={gallery.length} />
      </button>
    </Frame>
  )
}

function GalleryBadge({ count }: { count: number }) {
  return (
    <span className="label-tech absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/75 px-3 py-2 text-[10px] text-white backdrop-blur">
      <Images className="size-3.5" aria-hidden="true" />
      {count} photos · open gallery
    </span>
  )
}

/* ------------------------------------------------------------------ */

export function Projects() {
  const [moviesflix, robot] = projects

  return (
    <Section
      id="projects"
      index="02"
      label="Projects"
      title={['Featured', 'work']}
      intro="From a machine-learning browser extension to app prototypes and robots — the strongest work first."
    >
      <div className="space-y-24 sm:space-y-32">
        <ProjectShowcase
          project={featuredProject}
          number="P/01"
          visual={
            <Frame label="Live demo · runs in your browser" className="p-5 sm:p-8">
              <div className="pt-6">
                <UrlScanner />
              </div>
            </Frame>
          }
        />
        <ProjectShowcase project={moviesflix} number="P/02" reverse visual={<ScreensVisual project={moviesflix} />} />
        <ProjectShowcase project={robot} number="P/03" visual={<PhotoVisual project={robot} />} />
      </div>

      <Reveal className="mt-24 border-t border-line pt-10 sm:mt-32">
        <p className="label-tech flex items-center gap-4 text-[11px] text-accent">
          <span>P/04</span>
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span>Latest on GitHub</span>
        </p>
        <div className="mt-6">
          <GithubFeed />
        </div>
      </Reveal>
    </Section>
  )
}
