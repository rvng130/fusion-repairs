import { site } from '../site.config'
import { areaText, featuredService, formatPrice, serviceMessage, serviceSubject, visibleServices } from '../lib/sms'
import { Link } from '../lib/router'
import { TextButton } from '../components/TextButton'
import { PhotoSlot, shownPhotos } from '../components/PhotoSlot'
import { IconArrow } from '../components/icons'
import { YouTubeSection } from '../components/YouTube'
import { BookingNotes, Steps, TeamGrid, BenchGallery, usePageTitle } from './shared'

export function Home() {
  usePageTitle(`${site.name} | PC repair & tech support in Fairfield County, ${site.state}`)
  const offer = featuredService
  const builds = shownPhotos(site.photos.builds)
  const bench = shownPhotos(site.photos.bench)
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Serving {areaText}</p>
            <h1>{site.bio.headline}</h1>
            <p className="lede">{site.bio.intro}</p>
            <div className="cta-row">
              <TextButton message={site.messages.default} className="btn-lg" />
              <Link to="/services" className="text-link">
                See Services &amp; Pricing <IconArrow size={18} />
              </Link>
            </div>
            <BookingNotes />
          </div>
          <PhotoSlot photo={site.photos.hero} placeholder="Hero photo: a PC open on your bench" ratio="4 / 5" priority />
        </div>
      </section>

      <section className="tagline" aria-label="What we stand for">
        <div className="wrap tagline-row">
          {site.bio.tagline.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="svc-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="svc-title">Our services</h2>
            <p className="muted">Email us the model and the problem. We'll quote it before any work starts.</p>
            <Link to="/services" className="text-link">
              Services &amp; Pricing <IconArrow size={18} />
            </Link>
          </div>
          <ul className="price-list">
            {visibleServices.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>
                  <span>{s.name}</span>
                  <span className={s.price === null ? 'quote' : 'price'}>{formatPrice(s)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {offer && (
        <section className="section flush" aria-labelledby="offer-title">
          <div className="wrap">
            <div className="offer">
              <p className="offer-price">{formatPrice(offer)}</p>
              <div>
                <h2 id="offer-title">{offer.name}</h2>
                <p className="muted">{offer.description}</p>
                <div className="cta-row">
                  <TextButton message={serviceMessage(offer)} subject={serviceSubject(offer)} ariaLabel={`Email us to book ${offer.name}`}>
                    Book a cleaning
                  </TextButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {builds.length > 0 && (
        <section className="section" aria-labelledby="builds-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="builds-title">PCs we've built</h2>
              <TextButton
                message={visibleServices.find((s) => s.id === 'upgrades-builds')?.message ?? site.messages.default}
                subject="Custom PC build"
                variant="secondary"
              >
                Ask about a build
              </TextButton>
            </div>
            <div className="gallery">
              {builds.map((p, i) => (
                <PhotoSlot key={i} photo={p} placeholder={`Build photo ${i + 1}`} ratio="1 / 1" />
              ))}
            </div>
          </div>
        </section>
      )}

      <YouTubeSection />

      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="how-title">How booking works</h2>
            <Link to="/how-it-works" className="text-link">
              The details <IconArrow size={18} />
            </Link>
          </div>
          <Steps />
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="team-title">Who you'll be working with</h2>
            <Link to="/about" className="text-link">
              About us <IconArrow size={18} />
            </Link>
          </div>
          <TeamGrid />
        </div>
      </section>

      {(bench.length > 0 || site.photos.video.src) && (
        <section className="section" aria-labelledby="bench-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="bench-title">On the bench</h2>
            </div>
            <BenchGallery />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="sell-title">
        <div className="wrap">
          <div className="sell">
            <div>
              <h2 id="sell-title">Sell your electronics</h2>
              <p className="muted">
                Have a console, PC, phone, or other device you don't use anymore? Email us the model, its condition, and
                a few photos. We'll take a look and make an offer if we're interested.
              </p>
            </div>
            <TextButton message={site.messages.buyback} subject={site.subjects.buyback} variant="secondary" ariaLabel="Email us about selling a device">
              Email us about a device
            </TextButton>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="wrap">
          <h2>{site.bio.closing}</h2>
          <div className="cta-row center">
            <TextButton message={site.messages.default} className="btn-lg" />
          </div>
          <BookingNotes center />
        </div>
      </section>
    </>
  )
}
