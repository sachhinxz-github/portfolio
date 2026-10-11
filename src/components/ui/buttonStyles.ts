/*
 * Shared class strings for links and buttons that should look the same everywhere.
 * Each export is complete on its own: don't layer another padding/size/display
 * utility on top, because two conflicting utilities resolve by stylesheet order.
 */

const shape =
  'group items-center justify-center gap-3 label-tech text-[13px] transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'
const primary = 'bg-accent-solid text-on-accent hover:shadow-[0_0_0_4px_var(--glow)]'
const secondary = 'border border-line-strong text-fg hover:border-accent hover:text-accent'
const icon = 'shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent'

export const primaryButton = `inline-flex ${shape} ${primary} px-6 py-4`
export const secondaryButton = `inline-flex ${shape} ${secondary} px-6 py-4`

/** Compact primary button; the caller decides when it is displayed (e.g. "hidden md:inline-flex"). */
export const primaryButtonCompact = `${shape} ${primary} h-10 px-4`

export const iconButton = `flex size-11 ${icon}`
export const iconButtonLarge = `flex size-12 ${icon}`

/** Icon button whose visibility is controlled by the caller. */
export const iconButtonBare = `size-11 ${icon}`
