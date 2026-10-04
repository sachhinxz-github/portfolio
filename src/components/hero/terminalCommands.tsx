import { Fragment, type ReactNode, type RefObject } from 'react'
import type { Theme } from '../../context/theme'
import {
  achievements,
  education,
  experience,
  featuredProject,
  languages,
  profile,
  programmingLanguages,
  projects,
  sections,
  skillGroups,
} from '../../data/portfolio'
import { openExternal, scrollToSection } from '../../lib/dom'

export type Command = {
  name: string
  /** How the command is shown in `help`, when it takes arguments. */
  usage?: string
  summary: string
  /** Hidden commands work but are not listed by `help`. */
  hidden?: boolean
  run: (args: string[]) => ReactNode
}

type CommandContext = {
  setTheme: (theme: Theme) => void
  history: RefObject<string[]>
}

/** `cat <file>` prints the same thing as the command on the right. */
const FILES: Record<string, string> = {
  'about.md': 'whoami',
  'now.txt': 'now',
  'experience.log': 'experience',
  'projects.md': 'projects',
  'skills.json': 'skills',
  'education.md': 'education',
  'achievements.txt': 'achievements',
  'contact.vcf': 'contact',
  'resume.pdf': 'resume',
}

const ALIASES: Record<string, string> = {
  about: 'whoami',
  work: 'experience',
  jobs: 'experience',
  certs: 'achievements',
  cv: 'resume',
  cls: 'clear',
  cd: 'goto',
  open: 'goto',
  '?': 'help',
  hi: 'hello',
  hey: 'hello',
}

const sectionIds: string[] = sections.map((section) => section.id)

/* ---------- small output helpers ---------- */

function Dim({ children }: { children: ReactNode }) {
  return <span className="text-dim">{children}</span>
}

function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      {rows.map(([key, value]) => (
        <Fragment key={key}>
          <dt className="text-cyan">{key}</dt>
          <dd className="min-w-0 break-words text-fg/85">{value}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

function TermLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
    >
      {children}
    </a>
  )
}

/* ---------- commands ---------- */

export function createCommands({ setTheme, history }: CommandContext) {
  const commands: Command[] = [
    {
      name: 'help',
      summary: 'list the available commands',
      run: () => (
        <div>
          <Rows
            rows={commands
              .filter((command) => !command.hidden)
              .map((command) => [command.usage ?? command.name, <Dim>{command.summary}</Dim>])}
          />
          <p className="mt-2 text-dim">Tip: ↑ / ↓ recall history · Tab autocompletes</p>
        </div>
      ),
    },
    {
      name: 'whoami',
      summary: 'who is this?',
      run: () => (
        <div>
          <p className="text-fg">
            {profile.name} <Dim>—</Dim> {profile.role}
          </p>
          <p>Full-stack web · IoT · data analytics · machine learning</p>
        </div>
      ),
    },
    {
      name: 'now',
      summary: "what I'm doing right now",
      run: () => {
        const current = experience.find((job) => job.current) ?? experience[0]
        return (
          <p>
            <span className="text-accent">●</span> <span className="text-fg">{current.role}</span> @{' '}
            <span className="text-accent">{current.company}</span> <Dim>· {current.location}</Dim>
          </p>
        )
      },
    },
    {
      name: 'experience',
      summary: 'work history',
      run: () => (
        <ul className="space-y-1.5">
          {experience.map((job) => (
            <li key={job.id}>
              <span className="text-fg">{job.role}</span> @ <span className="text-accent">{job.company}</span>
              <br />
              <Dim>
                {job.period} · {job.location}
              </Dim>
            </li>
          ))}
        </ul>
      ),
    },
    {
      name: 'projects',
      summary: "things I've built",
      run: () => (
        <div>
          <ul className="space-y-1.5">
            {[featuredProject, ...projects].map((project) => (
              <li key={project.id}>
                <span className="text-accent">{project.title}</span> <Dim>—</Dim>{' '}
                <span className="text-fg/85">{project.subtitle}</span>
                <br />
                <Dim>{project.stack.join(' · ')}</Dim>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-dim">Run “goto projects” for the full story.</p>
        </div>
      ),
    },
    {
      name: 'skills',
      summary: 'languages, tools and strengths',
      run: () => (
        <Rows
          rows={[
            ['languages', programmingLanguages.map((skill) => `${skill.name} (${skill.level})`).join(' · ')],
            ...skillGroups.map((group): [string, ReactNode] => [group.id, group.items.join(' · ')]),
          ]}
        />
      ),
    },
    {
      name: 'education',
      summary: 'degree and spoken languages',
      run: () => (
        <div>
          <ul className="space-y-1.5">
            {education.map((item) => (
              <li key={item.id}>
                <span className="text-fg">{item.degree}</span>
                <br />
                <Dim>
                  {[item.school, item.period, ...item.facts.map((fact) => `${fact.label} ${fact.value}`)].join(' · ')}
                </Dim>
              </li>
            ))}
          </ul>
          <p className="mt-2">
            <span className="text-cyan">speaks</span>{' '}
            {languages.map((language) => `${language.name} (${language.level})`).join(' · ')}
          </p>
        </div>
      ),
    },
    {
      name: 'achievements',
      summary: 'certifications and wins',
      run: () => (
        <ul className="list-inside list-['›_'] space-y-1 marker:text-accent">
          <li>{achievements.problemSolving.text}</li>
          <li>
            {achievements.maiyyam.title} <Dim>— {achievements.maiyyam.issuer}</Dim>
          </li>
          <li>
            {achievements.iitWorkshop.title} <Dim>— {achievements.iitWorkshop.issuer}</Dim>
          </li>
          <li>
            {achievements.probe.title} <Dim>— {achievements.probe.issuer}</Dim>
          </li>
          <li>
            {achievements.wheelsOnBot.title} <Dim>— Arduino line-following robot course</Dim>
          </li>
        </ul>
      ),
    },
    {
      name: 'contact',
      summary: 'how to reach me',
      run: () => (
        <Rows
          rows={[
            ['email', <TermLink href={`mailto:${profile.email}`}>{profile.email}</TermLink>],
            ['phone', <TermLink href={profile.phone.href}>{profile.phone.display}</TermLink>],
            ['linkedin', <TermLink href={profile.links.linkedin}>{profile.links.linkedin.replace('https://www.', '')}</TermLink>],
            ['github', <TermLink href={profile.links.github}>{profile.links.github.replace('https://', '')}</TermLink>],
          ]}
        />
      ),
    },
    {
      name: 'resume',
      summary: 'open my résumé (PDF)',
      run: () => {
        openExternal(profile.resume)
        return <p>Opening the résumé in a new tab…</p>
      },
    },
    {
      name: 'goto',
      usage: 'goto <section>',
      summary: 'jump to a section of the page',
      run: ([target]) => {
        const id = target?.toLowerCase().replace(/^#/, '')
        if (!id || !sectionIds.includes(id)) {
          return (
            <p>
              Usage: goto &lt;section&gt; <Dim>— one of {sectionIds.join(', ')}</Dim>
            </p>
          )
        }
        scrollToSection(id)
        return (
          <p>
            <span className="text-accent">→</span> #{id}
          </p>
        )
      },
    },
    {
      name: 'theme',
      usage: 'theme [dark|light]',
      summary: 'switch the colour theme',
      run: ([wanted]) => {
        const current: Theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
        const next: Theme = wanted === 'dark' || wanted === 'light' ? wanted : current === 'dark' ? 'light' : 'dark'
        setTheme(next)
        return (
          <p>
            theme <Dim>→</Dim> <span className="text-accent">{next}</span>
          </p>
        )
      },
    },
    { name: 'clear', summary: 'clear the screen', run: () => null },

    /* ----- hidden extras ----- */
    {
      name: 'ls',
      summary: 'list files',
      hidden: true,
      run: () => <p className="text-cyan">{Object.keys(FILES).join('   ')}</p>,
    },
    {
      name: 'cat',
      summary: 'print a file',
      hidden: true,
      run: ([file]) => {
        const target = file && FILES[file.toLowerCase()]
        if (!target) {
          return (
            <p>
              cat: {file ?? ''}: No such file <Dim>— try “ls”</Dim>
            </p>
          )
        }
        return find(target)?.run([]) ?? null
      },
    },
    { name: 'pwd', summary: 'print working directory', hidden: true, run: () => <p>/home/sachin/portfolio</p> },
    { name: 'date', summary: 'print the date', hidden: true, run: () => <p>{new Date().toString()}</p> },
    { name: 'echo', summary: 'print text', hidden: true, run: (args) => <p>{args.join(' ')}</p> },
    {
      name: 'history',
      summary: 'show command history',
      hidden: true,
      run: () => (
        <ol>
          {history.current.map((entry, index) => (
            <li key={index}>
              <Dim>{String(index + 1).padStart(3, ' ')}</Dim> {entry}
            </li>
          ))}
        </ol>
      ),
    },
    {
      name: 'sudo',
      summary: 'nice try',
      hidden: true,
      run: () => <p>Permission denied — but “contact” works without root.</p>,
    },
    {
      name: 'github',
      summary: 'open GitHub',
      hidden: true,
      run: () => {
        openExternal(profile.links.github)
        return <p>Opening GitHub…</p>
      },
    },
    {
      name: 'linkedin',
      summary: 'open LinkedIn',
      hidden: true,
      run: () => {
        openExternal(profile.links.linkedin)
        return <p>Opening LinkedIn…</p>
      },
    },
    {
      name: 'email',
      summary: 'write an email',
      hidden: true,
      run: () => {
        window.location.href = `mailto:${profile.email}`
        return <p>Opening your mail app…</p>
      },
    },
    {
      name: 'hello',
      summary: 'say hi',
      hidden: true,
      run: () => <p>Hello! Type “help” to see what I can do.</p>,
    },
    {
      name: 'exit',
      summary: 'leave',
      hidden: true,
      run: () => <p>This terminal is part of the page — it isn't going anywhere.</p>,
    },
  ]

  const byName = new Map(commands.map((command) => [command.name, command]))

  function find(name: string): Command | undefined {
    const key = name.toLowerCase()
    return byName.get(ALIASES[key] ?? key)
  }

  return { find, names: commands.map((command) => command.name) }
}

/* ---------- Tab completion ---------- */

function completeFrom(partial: string, options: string[]): string | null {
  const matches = options.filter((option) => option.startsWith(partial.toLowerCase()))
  if (matches.length === 0) return null
  // Extend to the longest prefix shared by every match.
  let prefix = matches[0]
  for (const match of matches) {
    while (!match.startsWith(prefix)) prefix = prefix.slice(0, -1)
  }
  return prefix.length > partial.length || matches.length === 1 ? prefix : null
}

/** Returns the completed input line, or null when there is nothing to complete. */
export function complete(input: string, commandNames: string[]): string | null {
  const parts = input.trimStart().split(/\s+/)
  if (parts.length === 1 && parts[0]) {
    const match = completeFrom(parts[0], commandNames)
    return match && (commandNames.includes(match) ? `${match} ` : match)
  }
  if (parts.length === 2) {
    const [head, partial] = parts
    const command = ALIASES[head.toLowerCase()] ?? head.toLowerCase()
    const options =
      command === 'goto' ? sectionIds : command === 'cat' ? Object.keys(FILES) : command === 'theme' ? ['dark', 'light'] : []
    const match = completeFrom(partial, options)
    return match ? `${head} ${match}` : null
  }
  return null
}
