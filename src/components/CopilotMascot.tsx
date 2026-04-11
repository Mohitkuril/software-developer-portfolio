import { useId } from 'react'

type Props = {
  size?: number
  className?: string
}

/** Simple “friendly bot” mark — purple tile + face (matches reference vibe). */
export function CopilotMascot({ size = 40, className }: Props) {
  const raw = useId()
  const gid = `cmg-${raw.replace(/:/g, '')}`

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>
      <rect width={40} height={40} rx={10} fill={`url(#${gid})`} />
      <circle cx={14} cy={17} r={2.4} fill="#fff" />
      <circle cx={26} cy={17} r={2.4} fill="#fff" />
      <path
        d="M 13.5 24.5 Q 20 30.5 26.5 24.5"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
