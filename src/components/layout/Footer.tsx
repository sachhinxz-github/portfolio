import { ArrowUp, Mail } from 'lucide-react'
import { profile, sections } from '../../data/portfolio'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { iconButton } from '../ui/buttonStyles'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#home" className="font-mono text-sm font-semibold text-fg">
            <span className="text-accent">~/</span>sachin
          </a>
          <p className="mt-2 text-sm text-muted">
            © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript &amp; Vite
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="transition-colors hover:text-accent">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButton}>
            <GithubIcon className="size-[18px]" />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButton}>
            <LinkedinIcon className="size-[18px]" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={iconButton}>
            <Mail className="size-[18px]" aria-hidden="true" />
          </a>
          <a href="#home" aria-label="Back to top" className={iconButton}>
            <ArrowUp className="size-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
