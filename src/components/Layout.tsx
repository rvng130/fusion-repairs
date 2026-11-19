import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../site.config'
import { activePromo, areaText, emailReady } from '../lib/sms'
import { Link, useRouter } from '../lib/router'
import { TextButton } from './TextButton'
import { IconClose, IconMenu, Mark } from './icons'

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services & Pricing' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact Us' },
]

function SetupStrip() {
  if (emailReady) return null
  return (
    <div className="setup-strip" role="note">
      <strong>Preview mode:</strong> the booking email isn't set, so booking buttons show a preview. Add it in{' '}
      <code>src/site.config.ts</code>.
    </div>
  )
}

function PromoBanner() {
  const promo = activePromo()
  if (!promo) return null
  const fine = [promo.eligibility, promo.idVerification, promo.ends].filter(Boolean).join(' · ')
  return (
    <aside className="promo" aria-label="Current offer">
      <div className="wrap promo-inner">
        <div>
          <strong>{promo.title}</strong> <span>{promo.details}</span>
          {fine && <small className="promo-fine">{fine}</small>}
        </div>
        <TextButton message={promo.message} subject={`Offer: ${promo.title}`} variant="ghost" ariaLabel={`Email us about: ${promo.title}`}>
          Claim by email
        </TextButton>
      </div>
    </aside>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { loc } = useRouter()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on route change
  useEffect(() => setOpen(false), [loc.path])

  // Escape to close, lock scroll, move focus into menu
  useEffect(() => {
    if (!open) return
    document.body.classList.add('no-scroll')
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      // Keep Tab inside the open menu
      if (e.key === 'Tab' && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
          Boolean,
        ) as HTMLElement[]
        const i = items.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) {
          e.preventDefault()
          items[items.length - 1].focus()
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault()
          items[0].focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link to="/" className="logo" aria-label={`${site.name} home`}>
          <Mark />
          <span>{site.name}</span>
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          {NAV.slice(1).map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-cta">
          <TextButton message={site.messages.default} />
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconMenu />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" data-open={open} inert={!open} aria-hidden={!open}>
        <div className="mobile-menu-clip">
          <div ref={menuRef} className="mobile-menu-inner">
            <nav aria-label="Mobile">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <TextButton message={site.messages.default} className="btn-block" />
            {site.spanish && (
              <TextButton
                message={site.messages.spanish}
                subject={site.subjects.spanish}
                variant="secondary"
                lang="es"
                className="btn-block"
              >
                Enviar correo · Se habla español
              </TextButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileBar() {
  return (
    <div className="mobile-bar">
      <TextButton message={site.messages.default} className="btn-block" />
      {site.spanish && (
        <TextButton message={site.messages.spanish} subject={site.subjects.spanish} variant="secondary" lang="es" ariaLabel="Enviar correo en español">
          ES
        </TextButton>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link to="/" className="logo">
            <Mark />
            <span>{site.name}</span>
          </Link>
          <p className="muted">
            {site.bio.headline}
            <br />
            Serving {areaText}, {site.state}.
            <br />
            Local pickup and drop-off by appointment.
            {site.spanish && (
              <>
                <br />
                <span lang="es">Se habla español.</span>
              </>
            )}
          </p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="label">Email</p>
          <p>
            <a href={`mailto:${site.email}`} className="footer-email">
              {site.email}
            </a>
          </p>
          <p className="label">We accept</p>
          <p>{site.payments.join(' · ')}</p>
          <TextButton message={site.messages.default} variant="secondary" />
        </div>
      </div>
      <div className="wrap footer-base">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.bio.tagline.join(' ')}</span>
      </div>
    </footer>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault() // don't touch the URL (matters for hash routing)
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>
      <SetupStrip />
      <PromoBanner />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
