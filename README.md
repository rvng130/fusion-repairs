# Fusion Repair website

React + Vite + TypeScript. Five pages (Home, Services & Pricing, How It Works, About, Contact Us). Every booking button opens the visitor's email app with a subject line and a prefilled message to the booking email.

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
| Booking email | `email: 'fusionrepairshelp@gmail.com'` |
| Phone (optional, shown on Contact) | `phone: ''`: enter it like `'203-555-0123'` |
| Looping video | `photos.video` (muted MP4 in `public/photos/`; set `src: ''` to hide) |
| Services, descriptions, prices | `services: [...]`: `price: 50` shows "$50", `price: null` shows "Request a quote" |
| Show or hide a service | `visible: true / false` (Wi-Fi/printer house call, PS5 HDMI repair, and phone repair are in there, hidden) |
| Email drafts | `messages` and `subjects` (default, Spanish, buyback) plus each service's `message`. `{price}` fills in that service's price |
| Payment methods | `payments: ['Cash', 'Venmo', 'Zelle']` |
| Promo banner | `promo` (see below) |
| Bio copy (headline, intro, tagline, closing line) | `bio` |
| Photos (hero, builds, bench) | `photos`: see "Adding photos" below |
| Team photos | `team`: `photo: '/photos/andrew.jpg'` |
| Spanish | `spanish: false` hides "Se habla español" and the Spanish buttons |

### Adding photos
1. Put your image files in `public/photos/` (create the folder). Phone photos are fine. Around 1600px wide keeps the site fast.
2. In `site.config.ts`, set the slot's `src` to the path, e.g. `src: '/photos/build-1.jpg'`, and write a short `alt` describing it (screen readers read this aloud).
3. Build captions (e.g. `'White mini-ITX build, Ryzen 7 / RTX 4070'`) show under each photo once it's filled.

Slots:
- `photos.hero`: the big photo at the top of the home page
- `photos.builds`: "PCs we've built" gallery (6 slots; add or delete entries freely)
- `photos.bench`: "On the bench" gallery for parts boxes, tools, consoles (4 slots)
- `team[].photo`: you two, shown on Home and About

Empty slots show a dashed "photo coming soon" box. Before launch, either fill them or set `showPhotoPlaceholders: false` to hide any you haven't filled.

### Booking email
All booking buttons open an email to `site.email` with a subject line (e.g. "Quote request: Custom PC builds") and a prefilled message. The Contact page also shows the address with a "Copy email" button for people whose email app doesn't open.

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

- **GitHub Pages (free)**: push this folder to a GitHub repo, then go to Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
  - With a custom domain: Settings → Pages → Custom domain. At your domain registrar (e.g. GoDaddy), add four A records for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a CNAME for `www` → `<username>.github.io`.
  - Without a custom domain (site at `<username>.github.io/<repo>/`): set `VITE_HASH_ROUTER: '1'` in the workflow file so links work from the sub-folder.
- **GoDaddy cPanel hosting**: upload the contents of `dist/` into `public_html`. The included `.htaccess` handles routing.

## What's been checked
- Phone (390px) and desktop (1440px) layouts, with no sideways scrolling
- Every nav link, service anchor, and email button (service-specific, Spanish, buyback, promo): correct address, subject, and message
- Mobile menu: Escape closes it, focus stays inside while it's open, and it closes on navigation
- Skip link, visible focus rings, AA color contrast, and `prefers-reduced-motion` (no fade-in or hover motion)
