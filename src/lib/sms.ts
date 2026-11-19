import { site, type Service, type Promo } from '../site.config'

/** Digits-only E.164 for a US number, or null if missing/invalid. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return null
}

export const phoneE164 = normalizePhone(site.phone)
export const phoneReady = phoneE164 !== null

if (site.phone && !phoneReady) {
  console.error(
    `[Fusion Repair] site.phone "${site.phone}" isn't a valid 10-digit US number, so it's hidden.`,
  )
}

export function displayPhone(): string {
  if (!phoneE164) return ''
  const d = phoneE164.slice(2)
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

/**
 * sms: link that opens the Messages app with a draft.
 * "?&body=" works on both iOS and Android.
 */
export function smsHref(body: string): string | null {
  if (!phoneE164) return null
  return `sms:${phoneE164}?&body=${encodeURIComponent(body)}`
}

/* ---------- Email (main booking method) ---------- */
export const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email.trim())

/** mailto: link that opens the visitor's email app with a subject and draft. */
export function mailtoHref(subject: string, body: string): string | null {
  if (!emailReady) return null
  return `mailto:${site.email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function serviceSubject(s: Service): string {
  return s.price === null ? `Quote request: ${s.name}` : `Booking: ${s.name}`
}

export function formatPrice(s: Pick<Service, 'price'>): string {
  return s.price === null ? 'Request a quote' : `$${s.price}`
}

export function serviceMessage(s: Service): string {
  return s.message.replaceAll('{price}', String(s.price ?? ''))
}

export const visibleServices = site.services.filter((s) => s.visible)

export const featuredService =
  visibleServices.find((s) => s.id === site.featuredServiceId) ?? null

/** Active promo, only if enabled and fully filled in. */
export function activePromo(): Promo | null {
  if (!site.promo.enabled) return null
  const p = site.promo.drafts.find((d) => d.id === site.promo.activeId)
  if (!p) {
    console.warn(`[Fusion Repair] promo.activeId "${site.promo.activeId}" not found.`)
    return null
  }
  const unfinished = Object.values(p).some((v) => typeof v === 'string' && v.includes('[EDIT'))
  if (unfinished) {
    console.warn(
      `[Fusion Repair] Promo "${p.id}" still has [EDIT …] placeholders, so the banner is hidden. Fill them in to publish.`,
    )
    return null
  }
  return p
}

export const areaText = site.serviceAreaText
