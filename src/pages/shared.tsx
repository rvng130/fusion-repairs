import { useEffect } from 'react'
import { site } from '../site.config'
import { areaText } from '../lib/sms'
import { PhotoSlot, shownPhotos } from '../components/PhotoSlot'

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
    title: 'Email us',
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
    <ol className={`steps ${compact ? 'compact' : ''}`}>
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
        <p className="eyebrow">{eyebrow ?? `Serving ${areaText}`}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export function TeamGrid() {
  return (
    <ul className="team">
      {site.team.map((m) => (
        <li key={m.name} className="member">
          <PhotoSlot
            photo={{ src: m.photo, alt: m.name }}
            placeholder={`Photo of ${m.name.split(' ')[0]}`}
            ratio="4 / 5"
            showCaption={false}
          />
          <h3>{m.name}</h3>
          {m.role && <p className="muted">{m.role}</p>}
        </li>
      ))}
    </ul>
  )
}

/** Muted looping clip. Paused (with controls) for people who prefer reduced motion. */
export function LoopVideo() {
  const v = site.photos.video
  if (!v.src) return null
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return (
    <figure className="photo video">
      <div className="photo-frame" style={{ aspectRatio: '4 / 5' }}>
        <video
          src={v.src}
          poster={v.poster}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          controls={reduce}
          preload="metadata"
          aria-label={v.label}
        />
      </div>
    </figure>
  )
}

/** Big looping video on the left, bench photos beside it (stacks on phones). */
export function BenchGallery() {
  const bench = shownPhotos(site.photos.bench)
  const hasVideo = !!site.photos.video.src
  return (
    <div className={`bench ${hasVideo ? '' : 'no-video'}`}>
      {hasVideo && <LoopVideo />}
      {bench.length > 0 && (
        <div className="bench-photos">
          {bench.map((p, i) => (
            <PhotoSlot key={i} photo={p} placeholder="Tech photo" ratio="auto" />
          ))}
        </div>
      )}
    </div>
  )
}
