const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

/** "3 months ago", "yesterday", … */
export function timeAgo(iso: string, nowMs: number = Date.now()): string {
  const seconds = Math.round((new Date(iso).getTime() - nowMs) / 1000)
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relativeFormat.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}
