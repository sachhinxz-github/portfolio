import { programmingLanguages, skillGroups, toolbox } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

const GROUP_CODES: Record<(typeof skillGroups)[number]['id'], string> = {
  web: 'SYS/02',
  data: 'SYS/03',
  other: 'SYS/04',
}

/** Engineering-dashboard panel: a technical label, a title, and a numbered list. */
function Panel({ code, title, children, delay = 0 }: { code: string; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full flex-col bg-bg p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="label-tech text-[10px] text-dim">{code}</span>
          <span className="size-1.5 bg-accent" aria-hidden="true" />
        </div>
        <h3 className="display-wide mt-8 text-2xl">{title}</h3>
        <div className="mt-6 flex-1">{children}</div>
      </div>
    </Reveal>
  )
}

export function Skills() {
  return (
    <Section id="skills" index="03" label="Skills" title={['Technical', 'setup']} scheme="light">
      <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        <Panel code="SYS/01" title="Languages">
          <ol className="divide-y divide-line">
            {programmingLanguages.map((skill, position) => (
              <li key={skill.name} className="flex items-center justify-between gap-4 py-3">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-dim">0{position + 1}</span>
                  <span className="font-medium">{skill.name}</span>
                </span>
                <span className="label-tech text-[10px] text-accent">{skill.level}</span>
              </li>
            ))}
          </ol>
        </Panel>

        {skillGroups.map((group, position) => (
          <Panel key={group.id} code={GROUP_CODES[group.id]} title={group.title} delay={0.06 * (position + 1)}>
            <ol className="divide-y divide-line">
              {group.items.map((item, index) => (
                <li key={item} className="flex items-baseline gap-3 py-3">
                  <span className="font-mono text-xs text-dim">0{index + 1}</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ol>
          </Panel>
        ))}
      </div>

      <Reveal className="mt-8">
        <div className="border border-line p-6 sm:p-8">
          <p className="label-tech text-[11px] text-accent">Toolbox — used across the projects, workshops and certifications on this page</p>
          <ul className="mt-5 flex flex-wrap gap-2">
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
