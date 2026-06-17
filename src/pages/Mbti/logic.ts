import type {
  ChoiceLetter,
  Persona,
  PersonaId,
  ScoreResult,
} from '@/types/mbti'
import { QUESTIONS, TIE_PRIORITY } from './data'

/**
 * 计分：逐题按 scores 规则加分，取得分最高者；同分按 TIE_PRIORITY 裁决。
 * 纯函数，可单测。
 */
export function calculateResult(answers: ChoiceLetter[]): ScoreResult {
  const scores: Record<PersonaId, number> = {
    'Cyber-Raider': 0,
    'Budget-Architect': 0,
    'Zen-Capybara': 0,
    'Romantic-Observer': 0,
  }
  answers.forEach((choice, i) => {
    const hit = QUESTIONS[i]?.scores[choice] ?? []
    hit.forEach((pid) => {
      scores[pid] += 1
    })
  })
  let best: PersonaId = TIE_PRIORITY[0]
  TIE_PRIORITY.forEach((pid) => {
    if (scores[pid] > scores[best]) best = pid
  })
  return { result: best, scores }
}

/** 由人格昵称池 + 随机两位后缀，生成 Mock 昵称 */
export function makeNickname(persona: Persona): string {
  const base =
    persona.nicknamePool[
      Math.floor(Math.random() * persona.nicknamePool.length)
    ]
  const suffix = String(10 + Math.floor(Math.random() * 90))
  return `${base}${suffix}`
}

/** 生成证件编号，如 TSI-CR-4821 */
export function makeIdNum(personaId: PersonaId): string {
  const prefix = personaId
    .split('-')
    .map((s) => s[0])
    .join('')
  const n = String(1000 + Math.floor(Math.random() * 9000))
  return `TSI-${prefix}-${n}`
}

/** 单根条码（供组件渲染） */
export interface BarcodeBar {
  width: number
  opacity: number
}

/** 生成「条形码」数据（随机宽条 + 偶发空隙），纯视觉装饰 */
export function makeBarcodeBars(count = 30): BarcodeBar[] {
  return Array.from({ length: count }, () => ({
    width: Number((Math.random() * 2.6 + 0.8).toFixed(1)),
    opacity: Math.random() > 0.32 ? 1 : 0.2,
  }))
}

/** 读取 URL 目的地参数，缺省回退「西藏」 */
export function readDestParam(value: string | null): string {
  return value && value.trim() ? value.trim() : '西藏'
}
