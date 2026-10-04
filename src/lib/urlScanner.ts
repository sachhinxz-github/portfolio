/*
 * A small, transparent URL heuristic for the Shield-AI demo on the page.
 * It looks only at the structure of the URL (nothing is fetched or sent anywhere)
 * and is NOT the real detector — the extension uses a trained Random Forest model.
 */

export type Verdict = 'trusted' | 'low' | 'suspicious' | 'high'

export type UrlAnalysis = {
  features: { label: string; value: string }[]
  flags: string[]
  score: number
  verdict: Verdict
}

/** Well-known domains that are allow-listed so they never show up as false positives. */
const TRUSTED_DOMAINS = new Set([
  'google.com',
  'github.com',
  'microsoft.com',
  'apple.com',
  'amazon.com',
  'amazon.in',
  'paypal.com',
  'linkedin.com',
  'netflix.com',
  'wikipedia.org',
  'youtube.com',
  'leetcode.com',
  'mozilla.org',
  'stackoverflow.com',
])

const RISKY_TLDS = new Set(['xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'zip', 'click', 'icu', 'cam', 'rest', 'buzz', 'loan'])
const SHORTENERS = new Set(['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'rb.gy', 'cutt.ly', 'ow.ly'])
const TWO_PART_SUFFIXES = new Set(['co.in', 'co.uk', 'com.au', 'co.jp', 'com.br', 'ac.in', 'gov.in', 'org.in', 'net.in', 'co.nz'])
const BAIT_WORDS = [
  'login',
  'signin',
  'verify',
  'secure',
  'account',
  'update',
  'confirm',
  'bank',
  'wallet',
  'password',
  'billing',
  'unlock',
  'suspend',
]

const count = (text: string, pattern: RegExp): number => text.match(pattern)?.length ?? 0

/** Returns null when the input is not something that parses as a URL. */
export function analyseUrl(input: string): UrlAnalysis | null {
  const raw = input.trim()
  if (!raw || /\s/.test(raw)) return null

  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
  let url: URL
  try {
    url = new URL(hasScheme ? raw : `https://${raw}`)
  } catch {
    return null
  }

  const host = url.hostname.toLowerCase()
  if (!host.includes('.')) return null

  const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  const labels = host.split('.')
  const suffixLabels = !isIpAddress && TWO_PART_SUFFIXES.has(labels.slice(-2).join('.')) ? 3 : 2
  const domain = isIpAddress ? host : labels.slice(-suffixLabels).join('.')
  const subdomains = isIpAddress ? 0 : Math.max(labels.length - suffixLabels, 0)
  const topLevel = labels[labels.length - 1]
  const hostHyphens = count(host, /-/g)
  const pathAndQuery = `${url.pathname}${url.search}`.toLowerCase()
  const hidesDestination = url.username !== ''

  const features = [
    { label: 'Length', value: String(raw.length) },
    { label: 'Dots', value: String(count(raw, /\./g)) },
    { label: 'Hyphens', value: String(count(raw, /-/g)) },
    { label: 'Slashes', value: String(count(raw, /\//g)) },
    { label: 'Digits', value: String(count(raw, /\d/g)) },
    { label: 'Subdomains', value: String(subdomains) },
    { label: '“@” signs', value: String(count(raw, /@/g)) },
    { label: 'HTTPS', value: hasScheme ? (url.protocol === 'https:' ? 'yes' : 'no') : '—' },
  ]

  if (TRUSTED_DOMAINS.has(domain) && !hidesDestination) {
    return { features, flags: [], score: 0, verdict: 'trusted' }
  }

  const flags: string[] = []
  let score = 0
  const flag = (points: number, message: string) => {
    score += points
    flags.push(message)
  }

  if (hidesDestination) flag(3, 'Text before “@” can disguise the real destination')
  if (isIpAddress) flag(3, 'Raw IP address instead of a domain name')
  if (host.includes('xn--')) flag(2, 'Punycode domain — possible look-alike characters')
  if (!isIpAddress && RISKY_TLDS.has(topLevel)) flag(2, `“.${topLevel}” is a frequently abused top-level domain`)
  if (subdomains >= 3) flag(2, 'Deeply nested subdomains')
  if (hostHyphens >= 2) flag(hostHyphens >= 4 ? 2 : 1, 'Several hyphens in the domain')
  if (!isIpAddress && labels.slice(0, -1).some((label) => /[a-z]\d|\d[a-z]/.test(label))) {
    flag(1, 'Digits mixed into the domain name')
  }

  const baitInHost = BAIT_WORDS.find((word) => host.includes(word))
  const baitInPath = BAIT_WORDS.find((word) => pathAndQuery.includes(word))
  if (baitInHost) flag(2, `Bait keyword in the domain (“${baitInHost}”)`)
  else if (baitInPath) flag(1, `Sensitive keyword in the path (“${baitInPath}”)`)

  if (hasScheme && url.protocol === 'http:') flag(1, 'No HTTPS')
  if (raw.length > 75) flag(raw.length > 120 ? 2 : 1, 'Unusually long URL')
  if (SHORTENERS.has(domain)) flag(1, 'Link shortener hides the destination')

  const verdict: Verdict = score >= 4 ? 'high' : score >= 2 ? 'suspicious' : 'low'
  return { features, flags, score, verdict }
}
