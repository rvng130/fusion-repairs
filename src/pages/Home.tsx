import { site } from '../site.config'
import { areaText, featuredService, formatPrice, serviceMessage, visibleServices } from '../lib/sms'
import { Link } from '../lib/router'
import { TextButton } from '../components/TextButton'
import { IconArrow } from '../components/icons'
import { BookingNotes, Steps, usePageTitle } from './shared'

export function Home() {
  usePageTitle(`${site.name} | PC repair & tech support in ${areaText}, ${site.state}`)
  const offer = featuredService
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {areaText}, {site.state}
            </p>
            <h1>PC repair and tech support in Norwalk &amp; Stamford.</h1>
            <p className="lede">
              We troubleshoot PCs, build custom computers, help with phone transfers, and clean PS5 and Xbox consoles.
            </p>
            <div className="cta-row">
              <TextButton message={site.messages.default} className="btn-lg" />
              <Link to="/services" className="text-link">
                See Services &amp; Pricing <IconArrow size={18} />
              </Link>
            </div>
            <BookingNotes />
          </div>
          <figure className="hero-media reveal">
            <img
              src={site.hero.image.src}
              alt={site.hero.image.alt}
              width={1600}
              height={1067}
              fetchPriority="high"
              onError={(e) => e.currentTarget.parentElement?.classList.add('img-failed')}
            />
          </figure>
        </div>
      </section>

      {offer && (
        <section className="section" aria-labelledby="offer-title">
          <div className="wrap">
            <div className="offer reveal">
              <div className="offer-price" aria-hidden>
                {formatPrice(offer)}
              </div>
              <div className="offer-body">
                <p className="eyebrow">Flat price</p>
                <h2 id="offer-title">
                  {offer.name} — <span className="price">{formatPrice(offer)}</span>
                </h2>
                <p className="muted">{offer.description}</p>
                <div className="cta-row">
                  <TextButton message={serviceMessage(offer)} ariaLabel={`Text us to book ${offer.name}`}>
                    Book a cleaning
                  </TextButton>
                  <Link to={`/services#${offer.id}`} className="text-link">
                    All services &amp; pricing <IconArrow size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="svc-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="svc-title">What we do</h2>
            <Link to="/services" className="text-link">
              Services &amp; Pricing <IconArrow size={18} />
            </Link>
          </div>
          <ul className="price-list reveal">
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

      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="how-title">How booking works</h2>
            <Link to="/how-it-works" className="text-link">
              The details <IconArrow size={18} />
            </Link>
          </div>
          <Steps compact />
        </div>
      </section>

      <section className="section" aria-labelledby="sell-title">
        <div className="wrap">
          <div className="sell reveal">
            <div>
              <p className="eyebrow">Also</p>
              <h2 id="sell-title">Sell your electronics</h2>
              <p className="muted">
                Have a console, PC, phone, or other device you don't use anymore? Text us the model, its condition, and
                a few photos. We'll take a look and make an offer if we're interested.
              </p>
            </div>
            <TextButton message={site.messages.buyback} variant="secondary" ariaLabel="Text us about selling a device">
              Text us about a device
            </TextButton>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="wrap">
          <h2>Tell us what's going on.</h2>
          <p className="muted">Send the device model and a quick description. We'll reply with pricing or next steps.</p>
          <div className="cta-row center">
            <TextButton message={site.messages.default} className="btn-lg" />
          </div>
          <BookingNotes center />
        </div>
      </section>
    </>
  )
}
