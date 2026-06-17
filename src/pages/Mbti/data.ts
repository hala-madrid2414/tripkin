import type { Persona, PersonaId, Question } from '@/types/mbti'

/**
 * 平局裁决优先级：计分相同时靠前者胜出，保证结果确定性、可复现。
 */
export const TIE_PRIORITY: PersonaId[] = [
  'Cyber-Raider',
  'Budget-Architect',
  'Zen-Capybara',
  'Romantic-Observer',
]

/** 欢迎首屏人格芯片展示顺序 */
export const WELCOME_ORDER: PersonaId[] = [
  'Cyber-Raider',
  'Zen-Capybara',
  'Budget-Architect',
  'Romantic-Observer',
]

/**
 * 四种旅行人格（新型旅行 MBTI）。
 * accent 为形象主色（暖色 / 大地色点缀）。
 */
export const PERSONALITIES: Record<PersonaId, Persona> = {
  'Cyber-Raider': {
    id: 'Cyber-Raider',
    titleCn: '赛博特种兵',
    titleEn: 'CYBER-RAIDER',
    emoji: '🎒',
    accent: '#e0a02a',
    tagline: '高能量 · 疯狂打卡 · 行程拉满',
    description:
      '行程塞满、步数拉满，打卡点一个不落。你是旅行里的行动派，效率与战绩就是最好的纪念品。',
    tags: ['高能量', '疯狂打卡', '行程拉满', '行动派', '出片狂魔'],
    traits: { energy: '高', plan: '随性拓展', style: '战绩导向' },
    intentLine: '寻找能跟上我节奏的特种兵搭子',
    avatarPath: 'assets/avatars/cyber-raider.svg',
    nicknamePool: [
      '电量满格的特种兵',
      '日行三万步的冲浪手',
      '卡点狂魔',
      '火力全开的探索者',
    ],
  },
  'Zen-Capybara': {
    id: 'Zen-Capybara',
    titleCn: '精神卡皮巴拉',
    titleEn: 'ZEN-CAPYBARA',
    emoji: '🛀',
    accent: '#6fa05f',
    tagline: '低能量 · 松弛感 · 摆烂度假',
    description:
      '随遇而安、不争不抢。一杯咖啡一场发呆就是完美一天，你在旅行里只做一件事——松弛。',
    tags: ['松弛感', '情绪稳定', '摆烂度假', '随遇而安', '发呆高手'],
    traits: { energy: '低', plan: '随性', style: '体验优先' },
    intentLine: '寻找一起发呆泡汤的松弛搭子',
    avatarPath: 'assets/avatars/zen-capybara.svg',
    nicknamePool: [
      '松弛的卡皮巴拉',
      '泡在水里的佛系旅人',
      '发呆冠军',
      '情绪稳定的泡汤家',
    ],
  },
  'Budget-Architect': {
    id: 'Budget-Architect',
    titleCn: '精算系旅行家',
    titleEn: 'BUDGET-ARCHITECT',
    emoji: '🧮',
    accent: '#c2652f',
    tagline: '重度计划 · 高性价比 · 严丝合缝',
    description:
      '攻略背得比导游还熟，预算精确到小数点。你的旅行像精密齿轮，每一步都在计划之内、性价比之上。',
    tags: ['重度计划', '性价比之王', '攻略达人', '严丝合缝', '理性消费'],
    traits: { energy: '中', plan: '重度计划', style: '性价比导向' },
    intentLine: '寻找攻略互补、AA 制清晰的搭子',
    avatarPath: 'assets/avatars/budget-architect.svg',
    nicknamePool: [
      '精算到小数点的旅行家',
      '攻略倒背如流',
      '预算掌控者',
      '严丝合缝的规划师',
    ],
  },
  'Romantic-Observer': {
    id: 'Romantic-Observer',
    titleCn: '人文浪漫主义',
    titleEn: 'ROMANTIC-OBSERVER',
    emoji: '🌹',
    accent: '#b08345',
    tagline: '注重体验 · 情绪价值 · 重度审美',
    description:
      '一座博物馆、一个故事、一束光，都值得你停留。你为情绪价值与审美而旅行，感受比打卡更重要。',
    tags: ['注重体验', '情绪价值', '重度审美', '人文控', '慢旅行'],
    traits: { energy: '中', plan: '主题路线', style: '审美导向' },
    intentLine: '寻找愿意慢慢逛、爱拍照的搭子',
    avatarPath: 'assets/avatars/romantic-observer.svg',
    nicknamePool: [
      '追光的浪漫观察者',
      '故事收集家',
      '审美在线的漫游者',
      '情绪价值型旅人',
    ],
  },
}

/**
 * 极简趣味题库（共 3 题，二选一）。
 */
export const QUESTIONS: Question[] = [
  {
    title: '明天一早就要出发去目的地了，今晚的你在做什么？',
    options: {
      A: '疯狂核对物品清单，把交通票据和未来几天的行程单再对一遍。',
      B: '甚至还没开始收拾行李。无所谓，只要带上手机和身份证，剩下的到地方再说。',
    },
    scores: {
      A: ['Budget-Architect', 'Cyber-Raider'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
  {
    title: '好不容易到达网红打卡点，却发现现场遭遇暴雨且人山人海，此时你会？',
    options: {
      A: '来都来了！套上雨衣直接冲进人流，必须按原计划把卡打了，拍照发个朋友圈。',
      B: '果断放弃。转头钻进旁边没人的小咖啡馆，点杯热饮听雨发呆，享受意外的松弛。',
    },
    scores: {
      A: ['Cyber-Raider', 'Budget-Architect'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
  {
    title: '如果兜里还有最后一笔预算，你更愿意把它花在哪里？',
    options: {
      A: '去吃一顿当地评价最高、仪式感拉满的特色大餐，或者住一晚推窗见景的景观房。',
      B: '去租一辆小摩托去没有游客的荒野探索，或者买一张小众博物馆的门票听故事。',
    },
    scores: {
      A: ['Cyber-Raider', 'Zen-Capybara'],
      B: ['Budget-Architect', 'Romantic-Observer'],
    },
  },
]
