import { site } from '../site.config'
import { areaText, displayPhone, phoneReady } from '../lib/sms'
import { Link } from '../lib/router'
import { TextButton } from '../components/TextButton'
import { CopyButton } from '../components/CopyButton'
import { BookingNotes, PageHero, Steps, TeamGrid, usePageTitle } from './shared'
import { PhotoSlot, shownPhotos } from '../components/PhotoSlot'

export function HowItWorks() {
  usePageTitle(`How It Works | ${site.name}`)
  return (
    <>
      <PageHero title="How it works">
        <p className="lede">Everything happens by text, from the first question to the return.</p>
      </PageHero>
      <section className="section tight">
        <div className="wrap">
          <Steps />
          <div className="card privacy">
            <h2>Where's the handoff?</h2>
            <p className="muted">
              We don't post addresses online. Once you book, we text you the pickup or drop-off details for your
              appointment in {site.serviceArea.join(' or ')}.
            </p>
          </div>
          <div className="cta-row center spaced">
            <TextButton message={site.messages.default} className="btn-lg" />
          </div>
          <BookingNotes center />
        </div>
      </section>
    </>
  )
}

export function About() {
  usePageTitle(`About | ${site.name}`)
  const bench = shownPhotos(site.photos.bench)
  return (
    <>
      <PageHero title="About us">
        <p className="lede">
          {site.bio.headline} {site.bio.intro}
        </p>
        <p className="muted about-more">
          We're {site.name}, a local two-person business serving {areaText}. When you text us, you're talking to the
          people who will actually work on your device.
        </p>
      </PageHero>
      <section className="section tight">
        <div className="wrap">
          <TeamGrid />
        </div>
      </section>
      <section className="tagline" aria-label="What we stand for">
        <div className="wrap tagline-row">
          {site.bio.tagline.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>
      {bench.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="gallery four">
              {bench.map((p, i) => (
                <PhotoSlot key={i} photo={p} placeholder="Tech photo" ratio="4 / 5" />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section final-cta">
        <div className="wrap">
          <h2>{site.bio.closing}</h2>
          <div className="cta-row center">
            <TextButton message={site.messages.default} className="btn-lg" />
            <Link to="/services" className="text-link">
              See Services &amp; Pricing
            </Link>
          </div>
          <BookingNotes center />
        </div>
      </section>
    </>
  )
}

export function Contact() {
  usePageTitle(`Contact Us | ${site.name}`)
  return (
    <>
      <PageHero title="Text us">
        <p className="lede">Texting is the fastest way to reach us and the way we book every appointment.</p>
      </PageHero>
      <section className="section tight">
        <div className="wrap contact-grid">
          <div className="card contact-main">
            <p className="label">Business number (text)</p>
            {phoneReady ? (
              <p className="phone">{displayPhone()}</p>
            ) : (
              <div className="setup-box" role="note">
                <strong>Number not set — preview only.</strong>
                <p>
                  Add it in <code>src/site.config.ts</code> (<code>phone: ''</code>). Until then, text buttons show a
                  preview of the draft.
                </p>
              </div>
            )}
            <div className="row">
              <TextButton message={site.messages.default} className="btn-lg" />
              {phoneReady && <CopyButton text={displayPhone()} label="Copy number" />}
            </div>
            <p className="muted small">On a computer? Copy the number and the message below, then text from your phone.</p>
            <p className="label">Your message will start like this</p>
            <blockquote className="draft">{site.messages.default}</blockquote>
            <CopyButton text={site.messages.default} label="Copy message" />
          </div>

          <div className="stack">
            {site.spanish && (
              <div className="card" lang="es">
                <p className="eyebrow">Se habla español</p>
                <h2>¿Prefieres español?</h2>
                <p className="muted">Escríbenos en español. Abriremos un mensaje listo para enviar.</p>
                <blockquote className="draft">{site.messages.spanish}</blockquote>
                <div className="row">
                  <TextButton message={site.messages.spanish} variant="secondary">
                    Enviar mensaje
                  </TextButton>
                  <CopyButton text={site.messages.spanish} label="Copiar mensaje" lang="es" />
                </div>
              </div>
            )}
            <div className="card">
              <p className="eyebrow">Selling a device?</p>
              <h2>Electronics buyback</h2>
              <p className="muted">Text the model, condition, and a few photos. We'll make an offer if we're interested.</p>
              <blockquote className="draft">{site.messages.buyback}</blockquote>
              <TextButton message={site.messages.buyback} variant="secondary" ariaLabel="Text us about selling a device">
                Text about a device
              </TextButton>
            </div>
            <div className="card">
              <p className="label">Service area</p>
              <p>
                {areaText}, {site.state}. Local pickup and drop-off by appointment. We text you the handoff details
                after you book.
              </p>
              <p className="label">We accept</p>
              <p>{site.payments.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  usePageTitle(`Page not found | ${site.name}`)
  return (
    <PageHero eyebrow="404" title="That page doesn't exist.">
      <div className="cta-row">
        <Link to="/" className="btn btn-secondary">
          Go home
        </Link>
        <TextButton message={site.messages.default} />
      </div>
    </PageHero>
  )
}
