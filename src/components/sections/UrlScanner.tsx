import { LockKeyhole, ScanSearch, ShieldAlert, ShieldCheck, TriangleAlert, type LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../../lib/cn'
import { analyseUrl, type Verdict } from '../../lib/urlScanner'

const SAMPLES = [
  { label: 'look-alike', url: 'http://paypa1-secure-login.verify-account.xyz/update?id=8842' },
  { label: 'raw IP', url: 'http://192.168.4.21/bank/signin.php' },
  { label: 'ordinary site', url: 'https://sachin-techfolio.netlify.app/' },
  { label: 'allow-listed', url: 'https://accounts.google.com/signin' },
]

const VERDICTS: Record<Verdict, { label: string; icon: LucideIcon; level: 1 | 2 | 3; text: string; bar: string; border: string }> = {
  trusted: { label: 'Allow-listed domain', icon: LockKeyhole, level: 1, text: 'text-accent', bar: 'bg-accent', border: 'border-accent/40' },
  low: { label: 'Low risk', icon: ShieldCheck, level: 1, text: 'text-accent', bar: 'bg-accent', border: 'border-accent/40' },
  suspicious: { label: 'Suspicious', icon: TriangleAlert, level: 2, text: 'text-amber', bar: 'bg-amber', border: 'border-amber/50' },
  high: { label: 'High risk', icon: ShieldAlert, level: 3, text: 'text-danger', bar: 'bg-danger', border: 'border-danger/50' },
}

/**
 * Hands-on demo for the Shield-AI card: type a URL and see the structural
 * signals a phishing detector looks at. Everything runs locally in the browser.
 */
export function UrlScanner() {
  const [url, setUrl] = useState(SAMPLES[0].url)
  const analysis = useMemo(() => analyseUrl(url), [url])
  const verdict = analysis && VERDICTS[analysis.verdict]

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Try it — URL scanner</p>
        <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-dim">
          demo
        </span>
      </div>

      <label className="relative mt-4 flex items-center gap-2.5 overflow-hidden rounded-xl border border-line-strong bg-bg px-3.5 transition-colors focus-within:border-accent">
        <ScanSearch className="size-4 shrink-0 text-dim" aria-hidden="true" />
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste or type a URL…"
          aria-label="URL to scan"
          inputMode="url"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="h-12 w-full min-w-0 bg-transparent font-mono text-base text-fg outline-none placeholder:text-dim sm:text-sm"
        />
        {/* A scan line sweeps under the field each time the URL changes. */}
        <span key={url} aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-1/4 animate-scan bg-accent" />
      </label>

      <div className="mt-3 flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => setUrl(sample.url)}
            aria-pressed={url === sample.url}
            className={cn(
              'rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors',
              url === sample.url ? 'border-accent/60 text-accent' : 'border-line text-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {sample.label}
          </button>
        ))}
      </div>

      {analysis && verdict ? (
        <>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {analysis.features.map((feature) => (
              <div key={feature.label} className="bg-surface px-3 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-dim">{feature.label}</dt>
                <dd className="mt-0.5 font-mono text-base text-fg">{feature.value}</dd>
              </div>
            ))}
          </dl>

          <div aria-live="polite" className={cn('mt-4 rounded-xl border bg-surface p-4', verdict.border)}>
            <div className="flex items-center justify-between gap-3">
              <p className={cn('flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider', verdict.text)}>
                <verdict.icon className="size-4" aria-hidden="true" />
                {verdict.label}
              </p>
              <span className="flex gap-1" aria-hidden="true">
                {[1, 2, 3].map((step) => (
                  <span key={step} className={cn('h-1.5 w-7 rounded-full', step <= verdict.level ? verdict.bar : 'bg-line-strong')} />
                ))}
              </span>
            </div>
            {analysis.flags.length > 0 ? (
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {analysis.flags.map((flag) => (
                  <li key={flag} className="flex gap-2.5">
                    <span className={cn('mt-[0.55em] size-1.5 shrink-0 rounded-full', verdict.bar)} aria-hidden="true" />
                    {flag}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">
                {analysis.verdict === 'trusted'
                  ? 'This domain is on the allow-list, so it is never flagged as a false positive.'
                  : 'No red flags in the structure of this URL.'}
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-line-strong p-4 text-sm text-muted">
          Enter a full address such as <span className="font-mono text-fg">example.com/login</span> to see its signals.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-dim">
        Illustrative heuristic that runs entirely in your browser. The Shield-AI extension itself scores URLs with a
        trained Random Forest model.
      </p>
    </div>
  )
}
