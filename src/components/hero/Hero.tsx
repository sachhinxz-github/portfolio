import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'motion/react'
import { useEffect, useRef } from 'react'
import { now, portraits, profile } from '../../data/portfolio'
import { prefersReducedMotion } from '../../lib/dom'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { primaryButton, secondaryButton } from '../ui/buttonStyles'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

/** Each letter of the name slides up from behind a clipping line. */
const letter: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

const portrait = portraits[2] // the motorcycle photo: the most motorsport of the four

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // 2.5D: the photo and the name drift in opposite directions as the pointer moves…
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 })
  const imageX = useTransform(springX, [-1, 1], [16, -16])
  const imageY = useTransform(springY, [-1, 1], [12, -12])
  const nameX = useTransform(springX, [-1, 1], [-8, 8])

  // …and the photo sinks slowly as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX, pointerY])

  return (
    <section
      ref={sectionRef}
      id="home"
      data-theme="dark"
      aria-label="Introduction"
      className="grid-marks relative isolate flex min-h-svh flex-col overflow-hidden bg-bg pt-[4.5rem] text-fg"
    >
      {/* Racing stripes across the top-right corner */}
      <div
        aria-hidden="true"
        className="stripes absolute -right-24 top-[4.5rem] h-40 w-[40rem] opacity-40 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] lg:h-[30rem] lg:w-[64rem] lg:opacity-60"
      />
      {/* Technical corner labels */}
      <div aria-hidden="true" className="label-tech pointer-events-none absolute inset-x-5 bottom-6 hidden justify-between text-[10px] text-dim sm:inset-x-8 lg:flex lg:px-4">
        <span>SEC 01 — PROFILE</span>
        <span>12.97° N · 77.59° E · BENGALURU</span>
        <span>GMT +05:30</span>
      </div>

      <div className="container-page relative flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-6 lg:py-6">
          {/* ---------- copy ---------- */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-1">
            <motion.a
              variants={rise}
              href="#resume"
              className="label-tech inline-flex items-center gap-3 border border-line bg-black/40 py-2 pl-3 pr-4 text-[11px] text-muted backdrop-blur transition-colors hover:border-lime hover:text-fg"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-lime" />
              </span>
              <span>
                Now · <span className="text-fg">{now.role}</span> @ {now.company}
              </span>
            </motion.a>

            <motion.h1 style={{ x: nameX }} className="mt-8 lg:mt-10">
              <span className="sr-only">{profile.name}</span>
              <span aria-hidden="true" className="display-wide flex overflow-hidden text-[clamp(3.6rem,19vw,8.5rem)] leading-[0.86] lg:text-[clamp(8rem,12.4vw,12rem)]">
                {[...profile.firstName].map((character, position) => (
                  <motion.span key={position} variants={letter} className="inline-block">
                    {character}
                  </motion.span>
                ))}
              </span>
              <motion.span variants={rise} aria-hidden="true" className="display-wide mt-2 flex items-center gap-4 text-[clamp(1.6rem,4.5vw,3.6rem)] text-outline">
                S. S
                <span className="h-px flex-1 max-w-32 bg-lime" />
              </motion.span>
            </motion.h1>

            <motion.p variants={rise} className="label-tech mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(0.95rem,2vw,1.35rem)] text-fg">
              {profile.roleStatement.map((part, position) => (
                <span key={part} className="flex items-center gap-3">
                  {position > 0 && (
                    <span className="text-lime" aria-hidden="true">
                      /
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </motion.p>

            <motion.p variants={rise} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {profile.intro}
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className={primaryButton}>
                Explore my work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer" className={secondaryButton}>
                Download résumé
                <Download className="size-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.ul variants={rise} className="mt-8 flex items-center gap-6">
              <li>
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="label-tech link-draw flex items-center gap-2 text-[11px] text-muted hover:text-fg">
                  <GithubIcon className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="label-tech link-draw flex items-center gap-2 text-[11px] text-muted hover:text-fg">
                  <LinkedinIcon className="size-4" /> LinkedIn
                </a>
              </li>
            </motion.ul>
          </motion.div>

          {/* ---------- portrait ---------- */}
          <motion.figure
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: fade }}
            className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-mr-6 lg:h-[min(80vh,46rem)]"
          >
            <motion.div style={{ x: imageX, y: imageY }} className="relative h-full">
              <motion.div
                style={{ y: scrollY }}
                className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
              >
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  fetchPriority="high"
                  className="size-full object-cover object-[50%_28%] grayscale-[35%] contrast-[1.05] lg:object-[60%_50%]"
                />
                {/* Racing-green tint and a shadow for the overlapping name */}
                <div aria-hidden="true" className="absolute inset-0 bg-green/35 mix-blend-multiply" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-bg/80 via-transparent to-transparent" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg/80 to-transparent" />
              </motion.div>

              {/* Frame labels */}
              <figcaption className="label-tech absolute bottom-4 right-4 flex items-center gap-3 text-[10px] text-fg/80">
                <span className="h-px w-8 bg-lime" aria-hidden="true" />
                {profile.name}
              </figcaption>
              <span aria-hidden="true" className="label-tech absolute right-4 top-4 text-[10px] text-lime">
                IMG / 01
              </span>
            </motion.div>
          </motion.figure>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          aria-label="Scroll to the next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="label-tech mb-8 flex w-fit items-center gap-3 text-[10px] text-dim transition-colors hover:text-lime"
        >
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-scroll-hint bg-lime" />
          </span>
          Scroll
          <ArrowDown className="size-3" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  )
}
