import { ArrowRight, Download, Mail } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { usePalette } from '../../context/ui'
import { now, profile } from '../../data/portfolio'
import { isApplePlatform } from '../../lib/dom'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { iconButton, primaryButton, secondaryButton } from '../ui/buttonStyles'
import { DotField } from './DotField'
import { Terminal } from './Terminal'
import { Typewriter } from './Typewriter'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero() {
  const { setOpen: setPaletteOpen } = usePalette()

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-svh lg:items-center lg:pb-20 lg:pt-24"
    >
      {/* Background: interactive dot matrix, a soft glow, and a fade into the page. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_85%_78%_at_50%_42%,black_30%,transparent_82%)]">
          <DotField />
        </div>
        <div className="absolute left-1/2 top-[-20rem] size-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-bg" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.a
            variants={rise}
            href="#experience"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 font-mono text-xs text-muted backdrop-blur transition-colors hover:border-accent/50"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span>
              <span className="text-fg">{now.role}</span> @ {now.company}
              <span className="hidden sm:inline"> · {now.location}</span>
            </span>
          </motion.a>

          <motion.h1
            variants={rise}
            className="mt-7 whitespace-nowrap font-display text-[clamp(3rem,9.5vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em]"
          >
            {profile.name}
            <span
              aria-hidden="true"
              className="ml-[0.1em] inline-block h-[0.7em] w-[0.36em] translate-y-[0.03em] animate-blink bg-accent"
            />
          </motion.h1>

          <motion.p variants={rise} className="mt-5 flex min-h-7 items-center gap-3 font-mono text-sm text-muted sm:text-lg">
            <span className="text-accent" aria-hidden="true">
              &gt;
            </span>
            <span>
              <Typewriter phrases={profile.roles} />
            </span>
          </motion.p>

          <motion.p variants={rise} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className={primaryButton}>
              View my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className={secondaryButton}>
              <Download className="size-4" aria-hidden="true" />
              Résumé
            </a>
          </motion.div>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-2">
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButton}>
              <GithubIcon className="size-[18px]" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButton}>
              <LinkedinIcon className="size-[18px]" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconButton}>
              <Mail className="size-[18px]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="ml-2 hidden items-center gap-2 font-mono text-xs text-dim transition-colors hover:text-fg md:flex"
            >
              Press
              <kbd className="rounded-md border border-line-strong px-1.5 py-0.5 text-muted">
                {isApplePlatform() ? '⌘K' : 'Ctrl K'}
              </kbd>
              to jump anywhere
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 lg:col-span-5"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
