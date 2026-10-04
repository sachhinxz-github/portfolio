import { ArrowRight, Award, Bot, Cpu, Trophy, Wrench, type LucideIcon } from 'lucide-react'
import { achievements } from '../../data/portfolio'
import { Counter } from '../ui/Counter'
import { GalleryThumb } from '../ui/GalleryThumb'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SpotlightCard } from '../ui/SpotlightCard'

function CardHeading({ icon: Icon, eyebrow, title }: { icon: LucideIcon; eyebrow: string; title: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-fg/[0.03]">
        <Icon className="size-5 text-accent" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h3 className="mt-1.5 text-balance font-display text-xl font-semibold leading-snug tracking-tight">{title}</h3>
      </div>
    </div>
  )
}

export function Achievements() {
  const { problemSolving, maiyyam, iitWorkshop, probe, wheelsOnBot } = achievements

  return (
    <Section id="achievements" index="06" label="Achievements" title="Certifications & achievements">
      <div className="grid gap-6 lg:grid-cols-6">
        {/* Competitive programming */}
        <Reveal className="lg:col-span-2">
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
            <CardHeading icon={Trophy} eyebrow="Problem solving" title={problemSolving.title} />
            <dl className="mt-7 grid flex-1 grid-cols-2 content-center gap-4 lg:grid-cols-1">
              {problemSolving.numbers.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="order-2 mt-1 font-mono text-xs uppercase tracking-widest text-muted">{item.label}</dt>
                  <dd className="order-1 font-display text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
                    <Counter value={item.value} suffix={item.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">{problemSolving.text}</p>
          </SpotlightCard>
        </Reveal>

        {/* Maiyyam traineeships */}
        <Reveal delay={0.06} className="lg:col-span-4">
          <SpotlightCard className="grid h-full gap-7 p-6 sm:grid-cols-2 sm:p-7">
            <div>
              <CardHeading icon={Award} eyebrow={maiyyam.issuer} title={maiyyam.title} />
              <p className="mt-5 text-sm leading-relaxed text-muted">{maiyyam.text}</p>
              <ul className="mt-5 space-y-3">
                {maiyyam.credentials.map((credential) => (
                  <li key={credential.id} className="border-l-2 border-accent/50 pl-3.5">
                    <p className="text-sm font-medium text-fg">{credential.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-dim">
                      Issued {credential.issued} · ID {credential.id}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-4">
              {maiyyam.gallery.map((image, position) => (
                <GalleryThumb key={image.src} images={maiyyam.gallery} index={position} className="aspect-[10/7]" />
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* IIT workshop */}
        <Reveal className="lg:col-span-4">
          <SpotlightCard className="h-full p-6 sm:p-7">
            <CardHeading icon={Cpu} eyebrow={`${iitWorkshop.issuer} · ${iitWorkshop.date}`} title={iitWorkshop.title} />
            <p className="mt-5 text-sm leading-relaxed text-muted">{iitWorkshop.text}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {iitWorkshop.gallery.map((image, position) => (
                <GalleryThumb key={image.src} images={iitWorkshop.gallery} index={position} className="aspect-[4/3]" />
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Workshops and courses without photos */}
        <div className="grid gap-6 lg:col-span-2">
          <Reveal delay={0.06}>
            <SpotlightCard className="h-full p-6 sm:p-7">
              <CardHeading icon={Bot} eyebrow={probe.issuer} title={probe.title} />
              <p className="mt-5 text-sm leading-relaxed text-muted">{probe.text}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.12}>
            <SpotlightCard className="h-full p-6 sm:p-7">
              <CardHeading icon={Wrench} eyebrow={wheelsOnBot.issuer} title={wheelsOnBot.title} />
              <p className="mt-5 text-sm leading-relaxed text-muted">{wheelsOnBot.text}</p>
              <a
                href="#project-line-follower"
                className="group mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-fg transition-colors hover:text-accent"
              >
                See the robot
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
