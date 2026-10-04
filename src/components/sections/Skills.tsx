import { Braces, ChartColumn, Globe, Sparkles, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { programmingLanguages, skillGroups, toolbox } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'
import { Tag } from '../ui/Tag'

const GROUP_ICONS: Record<(typeof skillGroups)[number]['id'], LucideIcon> = {
  web: Globe,
  data: ChartColumn,
  other: Sparkles,
}

const LEVEL_STEPS = [1, 2, 3]

function SkillCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <SpotlightCard className="h-full p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-fg/[0.03]">
          <Icon className="size-5 text-accent" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </SpotlightCard>
  )
}

export function Skills() {
  return (
    <Section id="skills" index="04" label="Skills" title="What I work with">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="h-full">
          <SkillCard icon={Braces} title="Programming Languages">
            <ul className="mt-6 space-y-5">
              {programmingLanguages.map((skill) => (
                <li key={skill.name} className="flex items-center justify-between gap-4">
                  <span className="font-medium text-fg">{skill.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                      {LEVEL_STEPS.map((step) => (
                        <span key={step} className="h-1.5 w-7 overflow-hidden rounded-full bg-line-strong sm:w-9">
                          {step <= skill.score && (
                            <motion.span
                              className="block h-full origin-left rounded-full bg-accent"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.15 * step, ease: 'easeOut' }}
                            />
                          )}
                        </span>
                      ))}
                    </span>
                    <span className="w-24 text-right font-mono text-xs text-muted">{skill.level}</span>
                  </span>
                </li>
              ))}
            </ul>
          </SkillCard>
        </Reveal>

        {skillGroups.map((group, position) => (
          <Reveal key={group.id} delay={0.06 * (position + 1)} className="h-full">
            <SkillCard icon={GROUP_ICONS[group.id]} title={group.title}>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-fg/[0.03] px-3.5 py-2 text-sm text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </SkillCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="rounded-2xl border border-dashed border-line-strong p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Used across my projects, workshops and certifications
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {toolbox.map((tool) => (
              <li key={tool}>
                <Tag>{tool}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
