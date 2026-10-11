import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('label-tech inline-flex items-center border border-line px-2.5 py-1.5 text-[11px] text-muted', className)}>
      {children}
    </span>
  )
}
