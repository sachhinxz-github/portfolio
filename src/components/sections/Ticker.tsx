import { tickerItems } from '../../data/portfolio'

/** Lime band with a slow uppercase ticker — the "sponsor strip" between the hero and the story. */
export function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-black/20 bg-lime py-3 text-black [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      {/* The list is rendered twice and slid left by exactly half its width, so the loop is seamless. */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={index} className="label-tech flex items-center whitespace-nowrap text-sm">
            <span className="px-8">{item}</span>
            <span className="size-1.5 rotate-45 bg-black/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
