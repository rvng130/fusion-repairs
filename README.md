# Fusion Repair website

React + Vite + TypeScript. Five pages (Home, Services & Pricing, How It Works, About, Contact Us). Every booking button opens the visitor's Messages app with a prefilled text.

## Preview it

```bash
npm install
npm run dev        # http://localhost:5173, live-reloads while you edit
```

To test on your phone, run `npm run dev -- --host` and open the "Network" URL it prints (your phone needs to be on the same Wi-Fi).

## Where to edit things

**Everything lives in `src/site.config.ts`.**

| What | Setting |
|---|---|
| Business number | `phone: ''`: enter it like `'203-555-0123'` |
| Services, descriptions, prices | `services: [...]`: `price: 50` shows "$50", `price: null` shows "Request a quote" |
| Show or hide a service | `visible: true / false` (Wi-Fi/printer house call, PS5 HDMI repair, and phone repair are in there, hidden) |
| Text drafts | `messages` (default, Spanish, buyback) plus each service's `message`. `{price}` fills in that service's price |
| Payment methods | `payments: ['Cash', 'Venmo', 'Zelle']` |
| Promo banner | `promo` (see below) |
| Team / photos | `team`: put photos in `public/team/` and set `photo: '/team/andrew.jpg'` |
| Hero photo | `hero.image.src`: put your own bench photo in `public/hero.jpg` and set `src: '/hero.jpg'` |
| Spanish | `spanish: false` hides "Se habla español" and the Spanish buttons |

### Business number
While `phone` is empty, the site runs in **preview mode**: a yellow strip says the number isn't set, and text buttons open a preview of the draft instead of Messages. The site never makes up a number. Once you add a valid 10-digit number, the buttons become real `sms:` links and the Contact page shows the number with a "Copy number" button.

### Promotions
1. Open `promo.drafts` and fill in every `[EDIT …]` field (eligibility, ID requirement, end date, amount).
2. Set `promo.activeId` to the draft's id (`'first-service'` or `'holiday'`).
3. Set `promo.enabled: true`.

The banner **won't appear while any field still contains `[EDIT`**, so a half-finished promo can't go live by accident (the browser console says why). Leave `idVerification` or `ends` as `''` if you don't need them.

## Deploy

```bash
npm run build      # creates dist/
```

Upload `dist/` to any static host. The site uses clean URLs (`/services`), so the host must send unknown paths to `index.html`. That's already set up for:

- **Netlify**: drag `dist/` onto app.netlify.com/drop, or connect the repo (build `npm run build`, publish `dist`). `public/_redirects` handles routing.
- **Vercel**: import the repo; `vercel.json` handles routing.
- **Cloudflare Pages**: build `npm run build`, output `dist`; it handles SPA routing automatically.

If your host can't do rewrites (e.g. GitHub Pages), build with hash URLs instead:
```bash
VITE_HASH_ROUTER=1 npm run build
```

## What's been checked
- Phone (390px) and desktop (1440px) layouts, with no sideways scrolling
- Every nav link, service anchor, and text button (service-specific, Spanish, buyback, promo), in both preview mode and with a number set
- Mobile menu: Escape closes it, focus stays inside while it's open, and it closes on navigation
- Skip link, visible focus rings, AA color contrast, and `prefers-reduced-motion` (no fade-in or hover motion)
