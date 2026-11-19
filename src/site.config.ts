/**
 * ============================================================
 *  FUSION REPAIR — SITE SETTINGS
 *  Everything you'd normally want to change lives in this file:
 *  business number, services, prices, promos, payment methods,
 *  team, and the prefilled text messages.
 *
 *  After editing, run `npm run dev` to preview or `npm run build`
 *  to make a deployable copy. See README.md.
 * ============================================================
 */

export type Service = {
  /** Unique id, used in links like /services#console-cleaning */
  id: string
  name: string
  /** One-line description used on cards */
  description: string
  /** Number in dollars, or null to show "Request a quote" */
  price: number | null
  /** Optional small note shown next to the price, e.g. "local house call" */
  priceNote?: string
  /**
   * Prefilled text message for this service's button.
   * Use {price} to insert the price automatically.
   */
  message: string
  /** false = hidden from the site (kept here so you can turn it on later) */
  visible: boolean
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
  /** Prefilled text when someone taps the banner */
  message: string
}

export const site = {
  name: 'Fusion Repair',

  /**
   * BUSINESS NUMBER — the only place the number lives.
   * Enter it like "203-555-0123" (10 digits, US). Leave "" until it's ready:
   * the site then shows a "preview only" notice instead of working text links.
   */
  phone: '',

  serviceArea: ['Norwalk', 'Stamford'] as const,
  state: 'CT',

  /** Show "Se habla español" and the Spanish text button */
  spanish: true,

  hero: {
    /**
     * Swap in your own bench photo: drop a file in /public (e.g. public/hero.jpg)
     * and set src: '/hero.jpg'. Your real bench beats any stock photo.
     */
    image: {
      src: 'https://images.pexels.com/photos/6754846/pexels-photo-6754846.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'A technician working on the inside of a computer at a repair bench',
      credit: 'Photo: Tima Miroshnichenko / Pexels',
    },
  },

  /** Prefilled text drafts. Brackets are for the customer to fill in. */
  messages: {
    default:
      "Hi Fusion Repair, I'd like help with my [device/model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
    spanish:
      'Hola Fusion Repair, me gustaría ayuda con mi [dispositivo/modelo]. El problema es [descripción breve]. Estoy cerca de [Norwalk/Stamford].',
    buyback:
      "Hi Fusion Repair, I have a [device/model] I'd like to sell. Condition: [condition]. I'll send a few photos.",
  },

  payments: ['Cash', 'Venmo', 'Zelle'],

  /** id of the service featured on the home page */
  featuredServiceId: 'console-cleaning',

  services: [
    {
      id: 'pc-repair',
      name: 'PC troubleshooting & repair',
      description:
        "Hardware or software — won't boot, crashing, running slow, strange noises. We find the cause and fix it.",
      price: null,
      message:
        "Hi Fusion Repair, I'd like help with my PC. Model/specs: [model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'custom-pc',
      name: 'Custom PC builds',
      description:
        'Tell us your budget and what you want to run. We help pick the parts and build it for you.',
      price: null,
      message:
        "Hi Fusion Repair, I'm interested in a custom PC build. Budget: [budget]. I'll mainly use it for [gaming/work/streaming]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'console-cleaning',
      name: 'PS5 & Xbox cleaning',
      description:
        'Dust buildup makes consoles run hot and loud. We open it up and clean it out.',
      price: 50,
      message:
        "Hi Fusion Repair, I'd like to book a ${price} console cleaning for my [PS5/Xbox model]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'phone-transfer',
      name: 'Phone data transfer',
      description:
        'Moving to a new phone? We help bring over your photos, contacts, and messages.',
      price: null,
      message:
        "Hi Fusion Repair, I'd like help moving my data from my [old phone model] to my [new phone model]. I'm near [Norwalk/Stamford].",
      visible: true,
    },
    {
      id: 'phone-troubleshooting',
      name: 'Phone troubleshooting',
      description:
        'Settings, apps, storage, or something just acting weird. Tell us what\'s happening and we\'ll take a look.',
      price: null,
      message:
        "Hi Fusion Repair, I'd like help with my [phone model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
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
        "Hi Fusion Repair, I'd like a house call for [Wi-Fi/printer] setup. I'm in [Norwalk/Stamford].",
      visible: false,
    },
    {
      id: 'ps5-hdmi',
      name: 'PS5 HDMI port repair',
      description: 'No picture? A damaged HDMI port is a common cause. Text us and we\'ll take a look.',
      price: null,
      message:
        "Hi Fusion Repair, I think my PS5 HDMI port needs repair. Model: [disc/digital/slim]. What's happening: [short description]. I'm near [Norwalk/Stamford].",
      visible: false,
    },
    {
      id: 'phone-repair',
      name: 'Phone repair',
      description: 'Tell us the model and what\'s broken.',
      price: null,
      message:
        "Hi Fusion Repair, I need my [phone model] repaired. The issue is [short description]. I'm near [Norwalk/Stamford].",
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
        details: 'Mention this offer when you text us to book.',
        eligibility: '[EDIT: e.g. New customers only. One per customer. Not combinable with other offers.]',
        idVerification: '[EDIT: e.g. "No ID needed" or "Valid ID required at pickup" — or leave empty]',
        ends: '',
        message:
          "Hi Fusion Repair, I'd like to use the 10% off first service offer. I need help with my [device/model]. The issue is [short description]. I'm near [Norwalk/Stamford].",
      },
      {
        id: 'holiday',
        title: 'Holiday deal: [EDIT: amount] off custom PCs & console cleaning',
        details: 'Text us before [EDIT: end date] to lock it in.',
        eligibility: '[EDIT: who qualifies]',
        idVerification: '',
        ends: '[EDIT: e.g. Ends Dec 31]',
        message:
          "Hi Fusion Repair, I saw the holiday deal. I'm interested in [custom PC build/console cleaning]. I'm near [Norwalk/Stamford].",
      },
    ] satisfies Promo[] as Promo[],
  },

  team: [
    // To add a photo: put the file in /public (e.g. public/team/andrew.jpg) and set photo: '/team/andrew.jpg'
    { name: 'Andrew Ishikawa', role: 'CEO', photo: '' },
    { name: 'Daniel Sarria', role: 'Head Technician', photo: '' },
  ],
}

export type Site = typeof site
