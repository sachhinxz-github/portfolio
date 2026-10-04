import { ArrowUpRight, Check, CircleAlert, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useEffect, useState, type ComponentType, type FormEvent, type ReactNode } from 'react'
import { profile } from '../../data/portfolio'
import { useCopy } from '../../hooks/useCopy'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { primaryButton, secondaryButton } from '../ui/buttonStyles'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'

const fieldStyle =
  'w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-dim focus:border-accent focus:ring-2 focus:ring-accent/25'

/** Current time in the given zone, refreshed a few times a minute. */
function useLocalTime(timeZone: string): string {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(timer)
  }, [])
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(now)
}

function ContactRow({
  icon: Icon,
  label,
  children,
  action,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <li className="flex items-center gap-4 border-b border-line py-4 last:border-b-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-fg/[0.03]">
        <Icon className="size-[18px] text-accent" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-widest text-dim">{label}</p>
        <div className="mt-0.5 truncate text-fg">{children}</div>
      </div>
      {action}
    </li>
  )
}

function CopyButton({ value, label, message }: { value: string; label: string; message: string }) {
  const copy = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value, message)}
      aria-label={label}
      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Copy className="size-4" aria-hidden="true" />
    </button>
  )
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    // Honeypot: real visitors never see this field, so a value means a bot filled it in.
    if (data.get('_gotcha')) return

    setStatus('sending')
    try {
      const response = await fetch(profile.contactForm, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <SpotlightCard className="flex h-full min-h-80 flex-col items-center justify-center p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-solid text-on-accent">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight" role="status">
          Message sent — thank you!
        </h3>
        <p className="mt-2 max-w-sm text-muted">I'll get back to you as soon as I can.</p>
        <button type="button" onClick={() => setStatus('idle')} className={`${secondaryButton} mt-7`}>
          Send another message
        </button>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard className="p-6 sm:p-8">
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={`${fieldStyle} mt-2`} />
        </label>
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`${fieldStyle} mt-2`} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Message</span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="What would you like to talk about?"
            className={`${fieldStyle} mt-2 resize-y`}
          />
        </label>

        <input type="hidden" name="_subject" value="New message from your portfolio" />
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button type="submit" disabled={status === 'sending'} className={primaryButton}>
            {status === 'sending' ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>
          {status === 'error' && (
            <p role="alert" className="flex items-center gap-2 text-sm text-danger">
              <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
              <span>
                Couldn't send right now — please email me at{' '}
                <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                  {profile.email}
                </a>
                .
              </span>
            </p>
          )}
        </div>
      </form>
    </SpotlightCard>
  )
}

export function Contact() {
  const localTime = useLocalTime(profile.timeZone)

  return (
    <Section
      id="contact"
      index="07"
      label="Contact"
      title="Let's build something together"
      intro="I'm always open to discussing new opportunities, interesting ideas, or anything tech. Send a message — I'd love to hear from you."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ul className="rounded-2xl border border-line bg-surface/70 px-5 sm:px-6">
            <ContactRow
              icon={Mail}
              label="Email"
              action={<CopyButton value={profile.email} label="Copy email address" message="Email copied to clipboard" />}
            >
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">
                {profile.email}
              </a>
            </ContactRow>
            <ContactRow
              icon={Phone}
              label="Phone"
              action={<CopyButton value={profile.phone.display} label="Copy phone number" message="Phone number copied" />}
            >
              <a href={profile.phone.href} className="transition-colors hover:text-accent">
                {profile.phone.display}
              </a>
            </ContactRow>
            <ContactRow icon={LinkedinIcon} label="LinkedIn">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                Connect on LinkedIn <ArrowUpRight className="size-4 text-dim group-hover:text-accent" aria-hidden="true" />
              </a>
            </ContactRow>
            <ContactRow icon={GithubIcon} label="GitHub">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                {profile.links.github.replace('https://github.com/', '@')}{' '}
                <ArrowUpRight className="size-4 text-dim group-hover:text-accent" aria-hidden="true" />
              </a>
            </ContactRow>
            <ContactRow icon={MapPin} label="Based in">
              {profile.location}
              <span className="ml-2 font-mono text-xs text-dim">{localTime} IST</span>
            </ContactRow>
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
