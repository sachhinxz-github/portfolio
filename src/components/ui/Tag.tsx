import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-fg/[0.03] px-2.5 py-1 font-mono text-xs text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
