import { ArrowUpRight, Images, ShieldCheck } from 'lucide-react'
import { useLightbox } from '../../context/ui'
import { featuredProject, projects } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { GithubIcon } from '../ui/BrandIcons'
import { secondaryButton } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'
import { Tag } from '../ui/Tag'
import { GithubFeed } from './GithubFeed'
import { UrlScanner } from './UrlScanner'

function FeaturedProject() {
  const project = featuredProject

  return (
    <SpotlightCard className="grid lg:grid-cols-2">
      <div className="p-6 sm:p-9">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Featured project
        </p>
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-1 text-lg text-muted">{project.subtitle}</p>
        <p className="mt-5 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-6 space-y-3">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={secondaryButton}>
              <GithubIcon className="size-4" />
              {link.label}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="relative border-t border-line bg-bg-soft/70 p-5 sm:p-8 lg:border-l lg:border-t-0">
        <UrlScanner />
      </div>
    </SpotlightCard>
  )
}

/** Three app screens fanned out like phones on a desk. */
const SCREEN_TILT = [
  '-rotate-6 translate-y-2 group-hover/cover:-translate-x-2 group-hover/cover:-rotate-9',
  'z-10 scale-110',
  'rotate-6 translate-y-2 group-hover/cover:translate-x-2 group-hover/cover:rotate-9',
]

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const openLightbox = useLightbox()
  const gallery = project.gallery ?? []

  return (
    <SpotlightCard id={`project-${project.id}`} className="flex h-full scroll-mt-24 flex-col">
      <button
        type="button"
        onClick={() => openLightbox(gallery)}
        aria-label={`Open the ${project.title} gallery (${gallery.length} images)`}
        className="group/cover relative block aspect-[16/10] w-full overflow-hidden border-b border-line bg-bg-soft"
      >
        {project.cover === 'screens' ? (
          <span className="absolute inset-0 flex items-center justify-center gap-5 bg-[radial-gradient(circle_at_50%_125%,var(--glow),transparent_62%)]">
            {project.coverImages.map((image, position) => (
              <span
                key={image.src}
                className={cn(
                  'relative block aspect-[9/19] h-[78%] overflow-hidden rounded-[14px] border-2 border-white/15 bg-black shadow-xl shadow-black/40 transition-transform duration-500',
                  SCREEN_TILT[position],
                )}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover" />
              </span>
            ))}
          </span>
        ) : (
          <img
            src={project.coverImages[0].src}
            alt={project.coverImages[0].alt}
            width={project.coverImages[0].width}
            height={project.coverImages[0].height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover/cover:scale-105"
          />
        )}
        <span className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur">
          <Images className="size-3.5" aria-hidden="true" />
          {gallery.length} photos
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-1 font-mono text-xs text-accent">{project.subtitle}</p>
        <p className="mt-4 flex-1 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Projects"
      title="Things I've built"
      intro="From a machine-learning browser extension to app prototypes and robots."
    >
      <Reveal>
        <FeaturedProject />
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {projects.map((project, position) => (
          <Reveal key={project.id} delay={0.08 * position} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <GithubFeed />
      </Reveal>
    </Section>
  )
}
