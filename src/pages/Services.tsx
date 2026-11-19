import { site } from '../site.config'
import { formatPrice, serviceMessage, visibleServices } from '../lib/sms'
import { TextButton } from '../components/TextButton'
import { BookingNotes, PageHero, usePageTitle } from './shared'

export function Services() {
  usePageTitle(`Services & Pricing | ${site.name}`)
  return (
    <>
      <PageHero title="Services & Pricing">
        <p className="lede">
          Flat prices where we can. For everything else, text us the model and the problem and we'll quote it before any
          work starts.
        </p>
        <BookingNotes />
      </PageHero>

      <section className="section tight">
        <div className="wrap">
          <ul className="service-grid">
            {visibleServices.map((s) => (
              <li key={s.id} id={s.id} className="card service reveal">
                <div className="service-top">
                  <h2>{s.name}</h2>
                  <p className={s.price === null ? 'quote' : 'price big'}>
                    {formatPrice(s)}
                    {s.priceNote && <small> · {s.priceNote}</small>}
                  </p>
                </div>
                <p className="muted">{s.description}</p>
                <TextButton
                  message={serviceMessage(s)}
                  variant={s.price === null ? 'secondary' : 'primary'}
                  ariaLabel={`Text us about ${s.name}`}
                >
                  {s.price === null ? 'Text for a quote' : 'Text to book'}
                </TextButton>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="pay-title">
        <div className="wrap">
          <div className="card pay reveal">
            <h2 id="pay-title">Payment</h2>
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
