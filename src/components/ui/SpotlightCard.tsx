import type { HTMLAttributes, PointerEvent } from 'react'
import { cn } from '../../lib/cn'

/** Card with a soft accent glow that follows the pointer (styles in index.css). */
export function SpotlightCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
  }

  return (
    <div
      onPointerMove={trackPointer}
      className={cn(
        'spotlight relative overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors duration-300 hover:border-line-strong',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
