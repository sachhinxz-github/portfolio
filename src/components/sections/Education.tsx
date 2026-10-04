import { GraduationCap, Languages as LanguagesIcon, School } from 'lucide-react'
import { motion } from 'motion/react'
import { cefrScale, education, languages } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'

export function Education() {
  return (
    <Section id="education" index="05" label="Education" title="Education & languages">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="grid gap-6 lg:col-span-7">
          {education.map((item, position) => {
            const Icon = position === 0 ? GraduationCap : School
            return (
              <Reveal key={item.id} delay={0.06 * position}>
                <SpotlightCard className="flex h-full gap-5 p-6 sm:p-7">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-fg/[0.03]">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.period}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{item.degree}</h3>
                    <p className="mt-1.5 text-muted">
                      {item.school}
                      {item.location && <span className="text-dim"> · {item.location}</span>}
                    </p>
                    {item.facts.length > 0 && (
                      <dl className="mt-5 flex flex-wrap gap-3">
                        {item.facts.map((fact) => (
                          <div key={fact.label} className="flex items-baseline gap-2.5 rounded-lg border border-line bg-fg/[0.03] px-4 py-2">
                            <dt className="font-mono text-[11px] uppercase tracking-widest text-dim">{fact.label}</dt>
                            <dd className="font-display text-xl font-semibold text-fg">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg border border-line bg-fg/[0.03]">
                <LanguagesIcon className="size-5 text-accent" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">Languages</h3>
            </div>

            <ul className="mt-6 space-y-5">
              {languages.map((language) => {
                const reached = cefrScale.indexOf(language.level)
                return (
                  <li key={language.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-fg">{language.name}</span>
                      <span className="font-mono text-xs text-muted">
                        {language.level} – {language.label}
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-6 gap-1.5" aria-hidden="true">
                      {cefrScale.map((step, position) => (
                        <span key={step} className="h-1.5 overflow-hidden rounded-full bg-line-strong">
                          {position <= reached && (
                            <motion.span
                              className="block h-full origin-left rounded-full bg-accent"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.35, delay: 0.08 * position, ease: 'easeOut' }}
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-3 grid grid-cols-6 gap-1.5 font-mono text-[10px] text-dim" aria-hidden="true">
              {cefrScale.map((step, position) => (
                <span key={step} className={cn('text-center', position === cefrScale.length - 1 && 'text-muted')}>
                  {step}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-dim">Levels on the CEFR scale, A1 (beginner) to C2 (proficient).</p>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  )
}
