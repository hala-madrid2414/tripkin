import type { MatchChipIcon } from '../../types'

type ExtendedIcon =
  | MatchChipIcon
  | 'back'
  | 'filter'
  | 'close'
  | 'heart'
  | 'pin'
  | 'send'

interface MatchIconProps {
  name: ExtendedIcon
  className?: string
}

const iconPaths: Record<ExtendedIcon, string[]> = {
  back: ['M15 18l-6-6 6-6'],
  filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  calendar: [
    'M7 3v4',
    'M17 3v4',
    'M4 9h16',
    'M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2z',
  ],
  car: ['M5 16h14', 'M7 16l1.5-6h7L17 16', 'M8 18h.01', 'M16 18h.01'],
  camera: [
    'M5 7h3l1.5-2h5L16 7h3v11H5z',
    'M12 10.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  ],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 21a8 8 0 0 1 16 0'],
  walk: [
    'M13 5a2 2 0 1 0-2 0 2 2 0 0 0 2 0z',
    'M11 8l-2 5 4 2 2 6',
    'M12 9l4 2',
    'M9 13l-3 6',
  ],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
  people: [
    'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M3 20a5 5 0 0 1 10 0',
    'M11 20a5 5 0 0 1 10 0',
  ],
  mountain: ['M3 19l6-10 4 6 3-4 5 8z'],
  wallet: ['M4 7h16v12H4z', 'M16 12h4', 'M6 7V5h10v2'],
  heart: [
    'M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5z',
  ],
  pin: [
    'M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11z',
    'M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  ],
  send: ['M21 3L10 14', 'M21 3l-7 18-4-7-7-4z'],
}

function MatchIcon({ name, className }: MatchIconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}

export default MatchIcon
