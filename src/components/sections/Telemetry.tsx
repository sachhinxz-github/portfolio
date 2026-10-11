import { stats } from '../../data/portfolio'
import { Terminal } from '../hero/Terminal'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'

/** The numbers, pit-wall style, next to the interactive console. */
export function Telemetry() {
  return (
    <section data-theme="dark" aria-label="Key numbers and interactive terminal" className="speed-lines relative bg-bg py-24 text-fg sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label-tech flex items-center gap-4 text-xs text-lime">
              <span>Telemetry</span>
              <span className="h-px w-8 bg-lime" aria-hidden="true" />
              <span>Season to date</span>
            </p>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12">
            {stats.map((stat, position) => (
              <Reveal key={stat.label} delay={0.07 * position}>
                <div className="flex flex-col border-t border-line pt-5">
                  <dt className="order-2 mt-3 label-tech text-[11px] text-fg">
                    {stat.label}
                    <span className="mt-1 block font-mono text-[11px] font-normal tracking-normal normal-case text-dim">{stat.hint}</span>
                  </dt>
                  <dd className="display-wide order-1 text-[clamp(3.4rem,8vw,7.5rem)] text-fg">
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-5">
          <p className="label-tech mb-4 text-[11px] text-dim">
            Pit wall console — type <span className="text-lime">help</span>
          </p>
          <Terminal />
        </Reveal>
      </div>
    </section>
  )
}
