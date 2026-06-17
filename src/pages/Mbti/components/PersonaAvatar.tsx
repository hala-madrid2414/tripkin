import type { ReactElement } from 'react'
import type { PersonaId } from '@/types/mbti'
import { PERSONALITIES } from '../data'

/**
 * 四种旅行人格的内联 SVG 形象（Demo 即时渲染）。
 * 正式交付可替换为 avatarPath 指向的真实素材文件。
 */

// SVG 细节暗色：在浅色背景 + 暖色 accent 填充上保证对比
const DARK = '#3a2a10'

function CyberRaider(accent: string): ReactElement {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="32"
        cy="32"
        r="25"
        stroke={accent}
        strokeWidth="2"
        opacity="0.4"
      />
      <circle
        cx="32"
        cy="32"
        r="25"
        stroke={accent}
        strokeWidth="2.4"
        opacity="0.9"
        strokeDasharray="1.5 7"
        strokeLinecap="round"
      />
      <path d="M36 9 L19 35 H30 L27 55 L47 29 H35 Z" fill={accent} />
      <circle cx="32" cy="32" r="3" fill={DARK} />
    </svg>
  )
}

function ZenCapybara(accent: string): ReactElement {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 13 q3 -4 0 -7"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M41 13 q-3 -4 0 -7"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <ellipse cx="20" cy="26" rx="5" ry="5" fill={accent} />
      <ellipse cx="44" cy="26" rx="5" ry="5" fill={accent} />
      <ellipse cx="32" cy="34" rx="17" ry="13" fill={accent} />
      <ellipse cx="20" cy="27" rx="2.1" ry="2.1" fill={DARK} opacity="0.45" />
      <ellipse cx="44" cy="27" rx="2.1" ry="2.1" fill={DARK} opacity="0.45" />
      <path
        d="M24 33 q3 2.6 5 0"
        stroke={DARK}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M35 33 q3 2.6 5 0"
        stroke={DARK}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="29.5" cy="41" rx="1.1" ry="1.5" fill={DARK} />
      <ellipse cx="34.5" cy="41" rx="1.1" ry="1.5" fill={DARK} />
      <path
        d="M6 49 q6 -3 12 0 t12 0 t12 0 t12 0 V60 H6 Z"
        fill={accent}
        opacity="0.28"
      />
    </svg>
  )
}

function BudgetArchitect(accent: string): ReactElement {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="14" width="34" height="42" rx="5" fill={accent} />
      <rect x="26" y="9" width="12" height="8" rx="2.5" fill={DARK} />
      <g
        stroke={DARK}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M21 27 l2.6 2.6 l4.2 -5.2" />
        <path d="M21 37 l2.6 2.6 l4.2 -5.2" />
        <path d="M21 47 l2.6 2.6 l4.2 -5.2" />
      </g>
      <g stroke={DARK} strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <line x1="33" y1="28" x2="43" y2="28" />
        <line x1="33" y1="38" x2="43" y2="38" />
        <line x1="33" y1="48" x2="40" y2="48" />
      </g>
    </svg>
  )
}

function RomanticObserver(accent: string): ReactElement {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="19" r="7" fill={accent} />
      <g stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="32" y1="5" x2="32" y2="9" />
        <line x1="44" y1="7" x2="42" y2="10" />
        <line x1="20" y1="7" x2="22" y2="10" />
        <line x1="47" y1="19" x2="51" y2="19" />
        <line x1="13" y1="19" x2="17" y2="19" />
      </g>
      <path
        d="M10 37 Q22 32 31 36 V53 Q22 49 10 53 Z"
        fill={accent}
        opacity="0.85"
      />
      <path d="M54 37 Q42 32 33 36 V53 Q42 49 54 53 Z" fill={accent} />
      <g stroke={DARK} strokeWidth="1.4" opacity="0.4" strokeLinecap="round">
        <line x1="16" y1="42" x2="26" y2="41" />
        <line x1="16" y1="47" x2="26" y2="46" />
        <line x1="38" y1="41" x2="48" y2="42" />
        <line x1="38" y1="46" x2="48" y2="47" />
      </g>
    </svg>
  )
}

const renderers: Record<PersonaId, (accent: string) => ReactElement> = {
  'Cyber-Raider': CyberRaider,
  'Zen-Capybara': ZenCapybara,
  'Budget-Architect': BudgetArchitect,
  'Romantic-Observer': RomanticObserver,
}

interface PersonaAvatarProps {
  id: PersonaId
  className?: string
}

export function PersonaAvatar({ id, className }: PersonaAvatarProps) {
  const accent = PERSONALITIES[id].accent
  return <span className={className}>{renderers[id](accent)}</span>
}
