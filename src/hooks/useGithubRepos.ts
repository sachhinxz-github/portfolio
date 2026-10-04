import { useEffect, useState } from 'react'
import { github, type RepoSummary } from '../data/portfolio'

type ApiRepo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

export type RepoFeed = {
  repos: RepoSummary[]
  /** live = fresh from the GitHub API, snapshot = the bundled fallback list. */
  source: 'loading' | 'live' | 'snapshot'
}

const CACHE_KEY = 'github-repos:v1'
const CACHE_MS = 30 * 60 * 1000

/** The unauthenticated GitHub API allows 60 requests/hour per visitor, so cache per session. */
function readCache(): RepoSummary[] | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as { savedAt: number; repos: RepoSummary[] } | null
    return cached && Date.now() - cached.savedAt < CACHE_MS ? cached.repos : null
  } catch {
    return null
  }
}

function writeCache(repos: RepoSummary[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }))
  } catch {
    // Storage unavailable — the feed still works, it just refetches next time.
  }
}

/** Most recently pushed public repositories, live from GitHub with a bundled fallback. */
export function useGithubRepos(): RepoFeed {
  const [feed, setFeed] = useState<RepoFeed>(() => {
    const cached = readCache()
    return cached ? { repos: cached, source: 'live' } : { repos: github.fallback, source: 'loading' }
  })

  useEffect(() => {
    if (feed.source !== 'loading') return
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${github.user}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`)
        return response.json() as Promise<ApiRepo[]>
      })
      .then((data) => {
        const repos = data
          .filter((repo) => !repo.fork && !repo.archived && !github.exclude.includes(repo.name))
          .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
          .slice(0, github.limit)
          .map((repo) => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            pushedAt: repo.pushed_at,
          }))
        if (repos.length === 0) throw new Error('GitHub returned no repositories')
        writeCache(repos)
        setFeed({ repos, source: 'live' })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setFeed({ repos: github.fallback, source: 'snapshot' })
      })

    return () => controller.abort()
  }, [feed.source])

  return feed
}
