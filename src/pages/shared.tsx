import { useEffect } from 'react'
import { site } from '../site.config'
import { areaText } from '../lib/sms'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

export function BookingNotes({ center = false }: { center?: boolean }) {
  return (
    <ul className={`notes ${center ? 'center' : ''}`}>
      <li>Local pickup and drop-off available by appointment</li>
      {site.spanish && <li lang="es">Se habla español</li>}
    </ul>
  )
}

export const STEPS = [
  {
    title: 'Text us',
    body: "Send the device model and describe what's going on. Photos help.",
  },
  {
    title: 'We confirm the price',
    body: 'We confirm pricing, or explain what we need to diagnose first.',
  },
  {
    title: 'Pickup or drop-off',
    body: `If you approve, we arrange local pickup or drop-off by appointment in ${site.serviceArea.join(' or ')}.`,
  },
  {
    title: 'Done & returned',
    body: 'We update you when the work is done and arrange the return.',
  },
]

export function Steps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`steps reveal ${compact ? 'compact' : ''}`}>
      {STEPS.map((s, i) => (
        <li key={s.title}>
          <span className="step-num" aria-hidden>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3>{s.title}</h3>
          <p className="muted">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="eyebrow">{eyebrow ?? `${areaText}, ${site.state}`}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
