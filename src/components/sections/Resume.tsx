import { ArrowUpRight, Download, FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { achievements, education, experience, languages, profile } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { primaryButton } from '../ui/buttonStyles'
import { GalleryThumb } from '../ui/GalleryThumb'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

/** Sub-heading inside the résumé section. */
function Block({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className="min-w-0 lg:col-span-3">
        <p className="label-tech text-[10px] text-dim">{code}</p>
        <h3 className="display-wide mt-3 text-3xl">{title}</h3>
      </Reveal>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </div>
  )
}

/** A timeline row: strong date on the left, content on the right. */
function Row({ period, current, children, delay = 0 }: { period: string; current?: boolean; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="grid grid-cols-1 gap-4 border-b border-line py-8 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
        <div>
          <p className={cn('display-wide text-xl', current ? 'text-accent' : 'text-fg')}>{period}</p>
          {current && (
            <p className="label-tech mt-2 flex items-center gap-2 text-[10px] text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Current
            </p>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </Reveal>
  )
}

export function Resume() {
  const { problemSolving, maiyyam, iitWorkshop, probe, wheelsOnBot } = achievements

  return (
    <Section
      id="resume"
      index="04"
      label="Résumé"
      title={['Experience &', 'education']}
      aside={
        <a href={profile.resume} target="_blank" rel="noreferrer" className={primaryButton}>
          Download résumé (PDF)
          <Download className="size-4" aria-hidden="true" />
        </a>
      }
    >
      <div className="space-y-20">
        <Block code="R/01" title="Experience">
          {experience.map((job, position) => (
            <Row key={job.id} period={job.period} current={job.current} delay={0.06 * position}>
              <h4 className="font-display text-2xl font-bold tracking-tight">{job.role}</h4>
              <p className="mt-1 text-muted">
                <span className="font-medium text-fg">{job.company}</span> · {job.location}
              </p>
              {job.summary && <p className="mt-4 leading-relaxed text-muted">{job.summary}</p>}
              {job.highlights.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-[0.7em] size-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {job.quote && (
                <blockquote className="mt-5 border-l-2 border-accent/60 pl-4">
                  <p className="text-[15px] italic text-fg/90">“{job.quote.text}”</p>
                  <footer className="mt-1 font-mono text-xs text-dim">— {job.quote.source}</footer>
                </blockquote>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {job.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {job.link && (
                  <a
                    href={job.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group label-tech ml-auto inline-flex items-center gap-1.5 text-[11px] text-fg transition-colors hover:text-accent"
                  >
                    <FileText className="size-3.5" aria-hidden="true" />
                    {job.link.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </Row>
          ))}
        </Block>

        <Block code="R/02" title="Education">
          {education.map((item, position) => (
            <Row key={item.id} period={item.period.replace('Expected graduation · ', '')} delay={0.06 * position}>
              <h4 className="font-display text-2xl font-bold tracking-tight">{item.degree}</h4>
              <p className="mt-1 text-muted">
                <span className="font-medium text-fg">{item.school}</span>
                {item.location && ` · ${item.location}`}
              </p>
              {item.period.startsWith('Expected') && <p className="label-tech mt-2 text-[10px] text-dim">Expected graduation</p>}
              {item.facts.length > 0 && (
                <dl className="mt-4 flex flex-wrap gap-3">
                  {item.facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline gap-2.5 border border-line px-4 py-2">
                      <dt className="label-tech text-[10px] text-dim">{fact.label}</dt>
                      <dd className="display-wide text-xl">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Row>
          ))}
        </Block>

        <Block code="R/03" title="Certifications & achievements">
          <ul className="divide-y divide-line">
            <li className="py-8 first:pt-0">
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="label-tech text-[10px] text-dim">{problemSolving.title}</p>
                    <p className="mt-3 text-lg text-fg">{problemSolving.text}</p>
                  </div>
                  <dl className="flex gap-8">
                    {problemSolving.numbers.map((number) => (
                      <div key={number.label} className="flex flex-col">
                        <dt className="order-2 label-tech mt-1 text-[10px] text-dim">{number.label}</dt>
                        <dd className="display-wide order-1 text-4xl text-accent">
                          {number.value}
                          {number.suffix}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </li>

            <li className="py-8">
              <Reveal>
                <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
                  <div>
                    <p className="label-tech text-[10px] text-dim">{maiyyam.issuer}</p>
                    <h4 className="mt-3 font-display text-xl font-bold tracking-tight">{maiyyam.title}</h4>
                    <p className="mt-3 leading-relaxed text-muted">{maiyyam.text}</p>
                    <ul className="mt-4 space-y-2">
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
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                    {maiyyam.gallery.map((image, position) => (
                      <GalleryThumb key={image.src} images={maiyyam.gallery} index={position} className="aspect-[10/7]" />
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>

            <li className="py-8">
              <Reveal>
                <p className="label-tech text-[10px] text-dim">
                  {iitWorkshop.issuer} · {iitWorkshop.date}
                </p>
                <h4 className="mt-3 font-display text-xl font-bold tracking-tight">{iitWorkshop.title}</h4>
                <p className="mt-3 leading-relaxed text-muted">{iitWorkshop.text}</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {iitWorkshop.gallery.map((image, position) => (
                    <GalleryThumb key={image.src} images={iitWorkshop.gallery} index={position} className="aspect-[4/3]" />
                  ))}
                </div>
              </Reveal>
            </li>

            {[probe, wheelsOnBot].map((item, position) => (
              <li key={item.title} className="py-8 last:pb-0">
                <Reveal delay={0.05 * position}>
                  <p className="label-tech text-[10px] text-dim">{item.issuer}</p>
                  <h4 className="mt-3 font-display text-xl font-bold tracking-tight">{item.title}</h4>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                  {item === wheelsOnBot && (
                    <a href="#project-line-follower" className="label-tech link-draw mt-3 inline-block text-[11px] text-fg hover:text-accent">
                      See the robot →
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </Block>

        <Block code="R/04" title="Languages">
          <Reveal>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {languages.map((language) => (
                <li key={language.name} className="bg-bg p-6">
                  <p className="display-wide text-3xl text-accent">{language.level}</p>
                  <p className="mt-3 font-display text-lg font-bold">{language.name}</p>
                  <p className="label-tech mt-1 text-[10px] text-dim">{language.label}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[11px] text-dim">Levels on the CEFR scale, A1 (beginner) to C2 (proficient).</p>
          </Reveal>
        </Block>
      </div>
    </Section>
  )
}
