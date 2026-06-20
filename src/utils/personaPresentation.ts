import type { PersonaId } from '@/types/mbti'

export interface PersonaPresentation {
  personaId: PersonaId
  tripkinTitleCn: string
  tripkinTitleEn: string
  emoji: string
  classicMbti: string
  tagline: string
  tags: string[]
}

const personaPresentationMap: Record<PersonaId, PersonaPresentation> = {
  'Cyber-Raider': {
    personaId: 'Cyber-Raider',
    tripkinTitleCn: '赛博特种兵',
    tripkinTitleEn: 'CYBER-RAIDER',
    emoji: '🎯',
    classicMbti: 'INTP',
    tagline: '高能量 · 疯狂打卡 · 行程拉满',
    tags: ['高能量', '疯狂打卡', '行程拉满', '行动派'],
  },
  'Zen-Capybara': {
    personaId: 'Zen-Capybara',
    tripkinTitleCn: '精神卡皮巴拉',
    tripkinTitleEn: 'ZEN-CAPYBARA',
    emoji: '🛀',
    classicMbti: 'INFP',
    tagline: '低能量 · 松弛感 · 摆烂度假',
    tags: ['松弛感', '情绪稳定', '摆烂度假', '慢旅行'],
  },
  'Budget-Architect': {
    personaId: 'Budget-Architect',
    tripkinTitleCn: '精算系旅行家',
    tripkinTitleEn: 'BUDGET-ARCHITECT',
    emoji: '🧮',
    classicMbti: 'INTJ',
    tagline: '重度计划 · 高性价比 · 严丝合缝',
    tags: ['重度计划', '性价比之王', '攻略达人', '理性消费'],
  },
  'Romantic-Observer': {
    personaId: 'Romantic-Observer',
    tripkinTitleCn: '人文浪漫主义',
    tripkinTitleEn: 'ROMANTIC-OBSERVER',
    emoji: '🌹',
    classicMbti: 'ENFP',
    tagline: '注重体验 · 情绪价值 · 重度审美',
    tags: ['注重体验', '情绪价值', '重度审美', '人文控'],
  },
}

export function getPersonaPresentation(
  personaId: PersonaId,
): PersonaPresentation {
  return personaPresentationMap[personaId]
}
