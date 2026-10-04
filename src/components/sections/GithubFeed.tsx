import { ArrowUpRight, Star } from 'lucide-react'
import { github, profile } from '../../data/portfolio'
import { useGithubRepos } from '../../hooks/useGithubRepos'
import { cn } from '../../lib/cn'
import { timeAgo } from '../../lib/format'
import { GithubIcon } from '../ui/BrandIcons'

/** GitHub's own language colours, for the ones that show up on this profile. */
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#663399',
  'Jupyter Notebook': '#da5b0b',
}

const STATUS = {
  loading: { label: 'fetching', dot: 'bg-amber animate-pulse' },
  live: { label: 'live from GitHub', dot: 'bg-accent' },
  snapshot: { label: 'saved snapshot', dot: 'bg-dim' },
}

/** The most recently updated public repositories, pulled from the GitHub API at view time. */
export function GithubFeed() {
  const { repos, source } = useGithubRepos()
  const status = STATUS[source]

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/70">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <p className="min-w-0 truncate font-mono text-xs text-muted sm:text-sm">
          <span className="text-accent">$</span> gh repo list {github.user} <span className="text-dim">--limit {github.limit}</span>
        </p>
        <span className="flex items-center gap-2 font-mono text-[11px] text-dim">
          <span className={cn('size-1.5 rounded-full', status.dot)} aria-hidden="true" />
          {status.label}
        </span>
      </div>

      <ul>
        {repos.map((repo) => (
          <li key={repo.name} className="border-t border-line">
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-fg/[0.03] sm:px-6"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-fg transition-colors group-hover:text-accent" title={repo.name}>
                  {repo.name}
                </p>
                {repo.description && <p className="mt-0.5 truncate text-sm text-muted">{repo.description}</p>}
              </div>
              {repo.language && (
                <span className="hidden shrink-0 items-center gap-2 font-mono text-xs text-muted sm:flex">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? 'var(--dim)' }}
                    aria-hidden="true"
                  />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted sm:flex">
                  <Star className="size-3" aria-hidden="true" />
                  {repo.stars}
                </span>
              )}
              <span className="w-28 shrink-0 text-right font-mono text-xs text-dim">{timeAgo(repo.pushedAt)}</span>
              <ArrowUpRight
                className="size-4 shrink-0 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>

      <a
        href={profile.links.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 border-t border-line px-5 py-4 font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        <GithubIcon className="size-4" />
        See everything on GitHub
      </a>
    </div>
  )
}
