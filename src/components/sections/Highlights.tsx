import { stats, toolbox } from '../../data/portfolio'
import { Counter } from '../ui/Counter'

/** Headline numbers, followed by a slow ticker of the technologies used on this page. */
export function Highlights() {
  return (
    <section aria-label="Key numbers and technologies" className="border-y border-line bg-bg-soft/60">
      <div className="container-page">
        {/* 1px gaps over a line-coloured background draw the dividers between cells. */}
        <dl className="grid grid-cols-2 gap-px border-x border-line bg-line lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-bg px-5 py-8 sm:px-7 lg:py-10">
              <dt className="order-2 mt-2 text-sm text-fg">
                {stat.label}
                <span className="mt-0.5 block font-mono text-xs text-dim">{stat.hint}</span>
              </dt>
              <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {/* The list is rendered twice and slid left by exactly half its width, so the loop is seamless. */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...toolbox, ...toolbox].map((tool, index) => (
            <span key={index} className="flex items-center whitespace-nowrap font-mono text-sm text-muted">
              <span className="px-6">{tool}</span>
              <span className="text-accent/70">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
