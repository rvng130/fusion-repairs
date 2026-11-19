import { site } from '../site.config'
import { formatPrice, serviceMessage, serviceSubject, visibleServices } from '../lib/sms'
import { TextButton } from '../components/TextButton'
import { BookingNotes, PageHero, usePageTitle } from './shared'

export function Services() {
  usePageTitle(`Services & Pricing | ${site.name}`)
  return (
    <>
      <PageHero title="Services & Pricing">
        <p className="lede">{site.bio.intro}</p>
        <p className="muted about-more">
          Flat prices where we can. For everything else, email us the model and the problem and we'll quote it before any
          work starts.
        </p>
        <BookingNotes />
      </PageHero>

      <section className="section tight">
        <div className="wrap">
          <ul className="service-list">
            {visibleServices.map((s, i) => (
              <li key={s.id} id={s.id} className="service">
                <span className="service-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="service-body">
                  <h2>{s.name}</h2>
                  <p className="muted">{s.description}</p>
                </div>
                <p className={s.price === null ? 'quote' : 'price big'}>
                  {formatPrice(s)}
                  {s.priceNote && <small> · {s.priceNote}</small>}
                </p>
                <TextButton
                  message={serviceMessage(s)}
                  subject={serviceSubject(s)}
                  variant={s.price === null ? 'secondary' : 'primary'}
                  ariaLabel={`Email us about ${s.name}`}
                >
                  {s.price === null ? 'Email for a quote' : 'Email to book'}
                </TextButton>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="pay-title">
        <div className="wrap">
          <div className="pay">
            <h2 id="pay-title">We accept</h2>
            <ul className="chips" aria-label="Accepted payment methods">
              {site.payments.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
