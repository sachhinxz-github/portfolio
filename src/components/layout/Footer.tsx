import { ArrowUp } from 'lucide-react'
import { profile, sections } from '../../data/portfolio'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-bg text-fg">
      <div className="container-page">
        <div className="flex flex-col gap-10 border-t border-line py-12 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="display-wide text-2xl">
              Sachin<span className="text-lime">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Software engineer in the making — full-stack web, IoT and machine learning. Based in {profile.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="label-tech link-draw text-[12px] text-muted transition-colors hover:text-fg">
                    <span className="mr-2 font-mono tracking-normal text-lime">0{index + 1}</span>
                    {section.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resume} target="_blank" rel="noreferrer" className="label-tech link-draw text-[12px] text-muted transition-colors hover:text-fg">
                  <span className="mr-2 font-mono tracking-normal text-lime">PDF</span>Résumé
                </a>
              </li>
            </ul>
          </nav>

          <ul className="flex items-center gap-5">
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="label-tech link-draw flex items-center gap-2 text-[12px] text-muted hover:text-fg">
                <GithubIcon className="size-4" /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="label-tech link-draw flex items-center gap-2 text-[12px] text-muted hover:text-fg">
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-end justify-between gap-6 pb-6">
          <p className="font-mono text-[11px] text-dim">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="label-tech flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-lime"
          >
            Top <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Oversized outlined wordmark bleeding off the bottom edge */}
      <p
        aria-hidden="true"
        className="display-wide text-outline pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center text-[clamp(5rem,19vw,20rem)] leading-none opacity-60"
      >
        Sachin S.S
      </p>
    </footer>
  )
}
