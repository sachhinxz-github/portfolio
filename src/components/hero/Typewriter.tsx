import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 26
const HOLD_MS = 1900
const GAP_MS = 320

/** Types each phrase, holds it, deletes it, then moves on to the next one. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const reduceMotion = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    const phrase = phrases[phraseIndex]
    const finishedTyping = !deleting && text === phrase
    const finishedDeleting = deleting && text === ''

    const delay = finishedTyping ? HOLD_MS : finishedDeleting ? GAP_MS : deleting ? DELETE_MS : TYPE_MS
    const timer = window.setTimeout(() => {
      if (finishedTyping) setDeleting(true)
      else if (finishedDeleting) {
        setDeleting(false)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
      } else setText(phrase.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [deleting, phraseIndex, phrases, reduceMotion, text])

  return (
    <>
      {/* Screen readers get the first phrase once instead of a stream of single letters. */}
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true">
        {reduceMotion ? phrases[0] : text}
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-accent" />
      </span>
    </>
  )
}
