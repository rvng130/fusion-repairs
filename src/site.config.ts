/**
 * ============================================================
 *  FUSION REPAIR — SITE SETTINGS
 *  Everything you'd normally want to change lives in this file:
 *  business number, services, prices, photos, promos, payment
 *  methods, team, and the prefilled text messages.
 *
 *  After editing, run `npm run dev` to preview or `npm run build`
 *  to make a deployable copy. See README.md.
 * ============================================================
 */

export type Service = {
  /** Unique id, used in links like /services#console-cleaning */
  id: string
  name: string
  /** One-line description */
  description: string
  /** Optional short list of what's included, shown under the description */
  includes?: string[]
  /** Number in dollars, or null to show "Request a quote" */
  price: number | null
  /** Optional small note shown next to the price, e.g. "local house call" */
  priceNote?: string
  /**
   * Prefilled email message for this service's button.
   * Use {price} to insert the price automatically.
   */
  message: string
  /** false = hidden from the site (kept here so you can turn it on later) */
  visible: boolean
}

export type Photo = {
  /** Path to the image, e.g. '/photos/build-1.jpg' (file goes in /public/photos). Leave '' for an empty slot. */
  src: string
  /** Describe the photo for screen readers, e.g. 'White mini-ITX build with RTX 4070' */
  alt: string
  /** Optional caption shown under the photo */
  caption?: string
}

export type Promo = {
  id: string
  /** Short headline shown in the banner */
  title: string
  /** One extra line of detail */
  details: string
  /** Who qualifies. Shown in the banner's fine print. */
  eligibility: string
  /** e.g. "Valid student ID required". Leave "" if none. */
  idVerification: string
  /** e.g. "Ends Dec 31". Leave "" if no end date. */
  ends: string
  /** Prefilled email when someone taps the banner */
  message: string
}

export const site = {
  name: 'Fusion Repairs',

  /**
   * BOOKING EMAIL — every "Email Us to Book" button opens a draft to this address.
   */
  email: 'fusionrepairshelp@gmail.com',

  /**
   * Optional business phone, e.g. "203-555-0123". If set, it's shown on the
   * Contact page as another way to reach you. Leave '' to hide it.
   */
  phone: '',

  serviceArea: ['Norwalk', 'Stamford'] as const,
  /** Shown wherever the site describes where you work */
  serviceAreaText: 'Stamford, Norwalk & surrounding areas',
  state: 'CT',

  /** Show "Se habla español" and the Spanish text button */
  spanish: true,

  /** Your bio copy */
  bio: {
    headline: 'Your local solution for all things tech.',
    intro: 'We specialize in computer repair, troubleshooting, upgrades, and custom PC builds.',
    tagline: ['Reliable Service.', 'Affordable Solutions.', 'Technology Made Simple.'],
    closing: 'Message us today for questions, service inquiries, or a quote!',
  },

  /**
   * PHOTOS — put image files in /public/photos and enter the path, e.g. '/photos/hero.jpg'.
   * Empty slots ('') show a labeled placeholder box while showPhotoPlaceholders is true.
   * Set showPhotoPlaceholders: false to hide any slots you haven't filled before launch.
   * Tip: square-ish photos (around 1600px wide) look best. Phone photos work fine.
   */
  showPhotoPlaceholders: true,
  photos: {
    hero: { src: '/photos/hero-open-pc.jpg', alt: 'A PC open on our workbench with the side panel off', caption: '' } as Photo,
    builds: [
      { src: '/photos/build-white.jpg', alt: 'White PC build with purple RGB lighting and a liquid cooler', caption: '' },
      { src: '/photos/build-open-air.jpg', alt: 'Open-air PC build with an RGB CPU cooler', caption: '' },
      { src: '/photos/build-black.jpg', alt: 'Black PC build with a tempered glass side panel', caption: '' },
    ] as Photo[],
    /** Parts boxes, the bench, tools, consoles — "tech stuff" */
    bench: [
      { src: '/photos/bench-parts.jpg', alt: 'PC parts boxes lined up on a desk before a build', caption: '' },
      { src: '/photos/bench-gpu.jpg', alt: 'Installing a graphics card into a PC case', caption: '' },
      { src: '/photos/bench-teardown.jpg', alt: 'A device taken apart for repair', caption: '' },
    ] as Photo[],
    /** Short looping clip (muted, no sound). Set src: '' to hide it. */
    video: {
      src: '/photos/opening-pc.mp4',
      poster: '/photos/opening-pc-poster.jpg',
      label: 'Video: opening up a PC on the bench',
    },
  },

  /** Email subject lines for the main buttons */
  subjects: {
    default: 'Repair request',
    spanish: 'Solicitud de reparación',
    buyback: 'Selling a device',
  },

  /**
   * YOUTUBE VIDEO — paste the link to your PC build video, e.g.
   * 'https://www.youtube.com/watch?v=XXXXXXXXXXX' or 'https://youtu.be/XXXXXXXXXXX'.
   * Leave '' to hide the section.
   */
  youtube: {
    url: '',
    title: 'Watch us build a PC',
    /** Optional line under the title, e.g. 'Ryzen 7 + RTX 4070 build, start to finish.' */
    description: '',
  },

  /** Prefilled email drafts. Brackets are for the customer to fill in. */
  messages: {
    default:
      "Hi Fusion Repairs, I'd like help with my [device/model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
    spanish:
      'Hola Fusion Repairs, me gustaría ayuda con mi [dispositivo/modelo]. El problema es [descripción breve]. Estoy cerca de [Norwalk/Stamford].',
    buyback:
      "Hi Fusion Repairs, I have a [device/model] I'd like to sell. Condition: [condition]. I've attached a few photos.",
  },

  payments: ['Cash', 'Venmo', 'Zelle'],

  /** id of the service featured on the home page */
  featuredServiceId: 'console-cleaning',

  services: [
    {
      id: 'computer-repair',
      name: 'Computer repair & troubleshooting',
      description: "PC or laptop acting up? Tell us what's going on and we'll find the cause and fix it.",
      includes: [
        'Hardware diagnostics',
        "Won't turn on / won't boot",
        'Virus & malware removal',
        'Windows installation & software support',
      ],
      price: null,
      message:
        "Hi Fusion Repairs, I need help with my [PC/laptop model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'remote-quick-assist',
      name: 'Remote Quick Assist computer help',
      description:
        "Quick fixes without leaving home. We connect to your Windows PC with Microsoft's built-in Quick Assist and fix it while you watch. You start the session, and we'll never call you first asking to connect.",
      includes: ['Software, settings & slow-computer fixes', 'Setup help & how-to questions'],
      price: null,
      message:
        "Hi Fusion Repairs, I'd like remote help with my Windows [PC/laptop]. The issue is [short description]. Good times to connect: [days/times].",
      visible: true,
    },
    {
      id: 'upgrades-builds',
      name: 'Upgrades & custom PC builds',
      description: 'Speed up what you have or get a new build. Tell us your budget and what you want to run.',
      includes: ['RAM, SSD & GPU upgrades', 'Part picking for your budget', 'Custom PC builds'],
      price: null,
      message:
        "Hi Fusion Repairs, I'm interested in [an upgrade/a custom PC build]. Budget: [budget]. I'll mainly use it for [gaming/work/streaming]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'phone-help',
      name: 'Phone help',
      description: 'New phone or one acting weird, we can help.',
      includes: ['Data transfer to a new phone (photos, contacts, messages)', 'Phone troubleshooting'],
      price: null,
      message:
        "Hi Fusion Repairs, I'd like help with my [phone model]. I need [data transfer/troubleshooting]: [short description]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'console-cleaning',
      name: 'PS5 & Xbox cleaning',
      description: 'Dust buildup makes consoles run hot and loud. We open it up and clean it out.',
      price: 50,
      message:
        "Hi Fusion Repairs, I'd like to book a ${price} console cleaning for my [PS5/Xbox model]. I'm near [Norwalk/Stamford].",
      visible: true,
    },

    // ---- Potential services: hidden until you set visible: true ----
    {
      id: 'wifi-printer',
      name: 'Wi-Fi or printer setup',
      description: 'We come to you and get your Wi-Fi or printer working.',
      price: 75,
      priceNote: 'local house call',
      message:
        "Hi Fusion Repairs, I'd like a house call for [Wi-Fi/printer] setup. I'm in [Norwalk/Stamford].",
      visible: false,
    },
    {
      id: 'ps5-hdmi',
      name: 'PS5 HDMI port repair',
      description: "No picture? A damaged HDMI port is a common cause. Email us and we'll take a look.",
      price: null,
      message:
        "Hi Fusion Repairs, I think my PS5 HDMI port needs repair. Model: [disc/digital/slim]. What's happening: [short description]. I'm near [Norwalk/Stamford].",
      visible: false,
    },
    {
      id: 'phone-repair',
      name: 'Phone repair',
      description: "Tell us the model and what's broken.",
      price: null,
      message:
        "Hi Fusion Repairs, I need my [phone model] repaired. The issue is [short description]. I'm near [Norwalk/Stamford].",
      visible: false,
    },
  ] satisfies Service[] as Service[],

  /**
   * PROMO BANNER — off by default.
   * To publish: fill in the [EDIT …] fields of a draft, set activeId to its id,
   * and set enabled: true. The banner refuses to show while any field
   * still contains "[EDIT", so a half-finished promo can't go live by accident.
   */
  promo: {
    enabled: false,
    activeId: 'first-service',
    drafts: [
      {
        id: 'first-service',
        title: '10% off your first service',
        details: 'Mention this offer when you email us to book.',
        eligibility: '[EDIT: e.g. New customers only. One per customer. Not combinable with other offers.]',
        idVerification: '[EDIT: e.g. "No ID needed" or "Valid ID required at pickup" — or leave empty]',
        ends: '',
        message:
          "Hi Fusion Repairs, I'd like to use the 10% off first service offer. I need help with my [device/model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
      },
      {
        id: 'holiday',
        title: 'Holiday deal: [EDIT: amount] off custom PCs & console cleaning',
        details: 'Email us before [EDIT: end date] to lock it in.',
        eligibility: '[EDIT: who qualifies]',
        idVerification: '',
        ends: '[EDIT: e.g. Ends Dec 31]',
        message:
          "Hi Fusion Repairs, I saw the holiday deal. I'm interested in [custom PC build/console cleaning]. I'm near [Norwalk/Stamford].",
      },
    ] satisfies Promo[] as Promo[],
  },

  team: [
    // role: optional title shown under the name (leave '' for none)
    // Photo: put the file in /public/photos (e.g. public/photos/andrew.jpg) and set photo: '/photos/andrew.jpg'
    { name: 'Andrew', role: '', photo: '/photos/andrew.jpg?v=2' },
    { name: 'Daniel', role: '', photo: '/photos/daniel.jpg' },
  ],
}

export type Site = typeof site
