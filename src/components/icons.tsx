type P = { size?: number }
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
})

export const IconText = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12Z" />
  </svg>
)
export const IconArrow = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconCopy = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)
export const IconCheck = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="m5 12 5 5 9-10" />
  </svg>
)
export const IconMenu = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const IconClose = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

/** Fusion Repairs mark: a sage green and a white circle, fused */
export const Mark = ({ size = 30 }: P) => (
  <svg width={Math.round((size * 54) / 38)} height={size} viewBox="5 13 54 38" aria-hidden focusable={false} className="mark">
    <circle cx="24" cy="32" r="17" fill="#8fb39d" />
    <circle cx="40" cy="32" r="17" fill="#fffdf8" fillOpacity="0.82" stroke="#2f2a24" strokeWidth="2.5" />
    <circle cx="24" cy="32" r="17" fill="none" stroke="#2f2a24" strokeWidth="2.5" />
  </svg>
)

export const IconMail = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
)
