/**
 * 旅行 MBTI 跨页面共享类型。
 *
 * 放在 src/types 是因为 Map / Match 等页面也需要消费 MBTI 结果
 * （见 docs/coding-guide.md：跨页面复用的 TypeScript 类型放 src/types）。
 */

/** 四种旅行人格 ID（新型旅行 MBTI） */
export type PersonaId =
  | 'Cyber-Raider'
  | 'Zen-Capybara'
  | 'Budget-Architect'
  | 'Romantic-Observer'

/** 二选一选项字母 */
export type ChoiceLetter = 'A' | 'B'

export interface PersonaTraits {
  energy: string
  plan: string
  style: string
}

/** 人格详情数据 */
export interface PersonaDetails {
  strengths: string[]
  considerations: string[]
  travelStyle: {
    energy: number
    planning: number
    social: number
    adventure: number
  }
  matchAdvice: string
  destTypes: string[]
}

/** 单个人格定义 */
export interface Persona {
  id: PersonaId
  titleCn: string
  titleEn: string
  emoji: string
  /** 形象主色（暖色 / 大地点缀色） */
  accent: string
  tagline: string
  description: string
  tags: string[]
  traits: PersonaTraits
  intentLine: string
  /** 对外承诺的卡通形象资产路径（正式交付再落地真实素材） */
  avatarPath: string
  nicknamePool: string[]
  details: PersonaDetails
}

/** 单道趣味题（二选一） */
export interface Question {
  title: string
  options: Record<ChoiceLetter, string>
  /** 选择某字母时，给哪些人格加分 */
  scores: Record<ChoiceLetter, PersonaId[]>
}

/** MBTI 计分结果 */
export interface ScoreResult {
  result: PersonaId
  scores: Record<PersonaId, number>
}

/**
 * 跨页面共享的旅行会话状态。
 * MBTI 完成后写入，供 /map（读 destination）、/match（读 personaId 做匹配）消费。
 */
export interface TripSession {
  personaId: PersonaId | null
  mbtiTypeCn: string | null
  mbtiTypeEn: string | null
  tagline: string | null
  tags: string[]
  nickname: string | null
  /** 目的地，默认「西藏」，可由 URL ?dest= 覆盖 */
  destination: string
  avatarKey: PersonaId | null
  accent: string | null
  socialIntent: {
    dest: string
    style: string
    intent: string
  } | null
  moduleStatus: 'idle' | 'completed' | null
  skipped: boolean
  rawScores: Partial<Record<PersonaId, number>>
}
