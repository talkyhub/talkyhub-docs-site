import { useId } from 'react'

type LogoProps = {
  /** rendered height in px (width follows the mark's natural ratio) */
  size?: number
  /** kept for call-site compatibility; the mascot renders the same on any surface */
  onDark?: boolean
  badge?: 'ink' | 'lime' | 'cream' | null
  shape?: 'circle' | 'square'
}

// TalkyHub mark: a violet chat-bubble mascot (two eyes + a smile), mirroring the
// landing site (talkyhub.ru) exactly. viewBox + paths taken from the landing.
const VB = '113.452 79.399 299.937 265.304'
const ASPECT = 299.937 / 265.304

export function Logo({ size = 30 }: LogoProps) {
  const gid = useId()
  return (
    <svg
      width={Math.round(size * ASPECT)}
      height={size}
      viewBox={VB}
      fill="none"
      role="img"
      aria-label="TalkyHub"
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#6a4ce0" />
          <stop offset="1" stopColor="#4a2fc4" />
        </linearGradient>
      </defs>
      <path
        d="M 113.452 163.096 C 113.452 123.249 183.929 79.399 261.712 79.399 C 343.929 79.399 413.389 122.79 413.389 163.096 L 413.389 325.071 C 413.389 338.404 405.616 344.703 392.283 344.703 C 392.283 344.703 261.712 344.703 243.904 344.703 C 214.025 344.703 190.265 325.003 183.929 325.071 C 177.332 325.142 149.882 344.703 132.831 344.703 C 128.469 344.703 113.452 342.522 113.452 325.071"
        fill={`url(#${gid})`}
      />
      <circle cx="203.929" cy="194.493" r="20" fill="#fff" />
      <circle cx="323.929" cy="194.493" r="20" fill="#fff" />
      <path
        d="M 223.929 252.663 C 250.595 272.663 277.262 272.663 303.929 252.663"
        stroke="#fff"
        strokeWidth="20"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
