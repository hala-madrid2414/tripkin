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
 * accent 为形象主色（统一为品牌紫 --color-brand-primary #6d5df6）。
 */
export const PERSONALITIES: Record<PersonaId, Persona> = {
  'Cyber-Raider': {
    id: 'Cyber-Raider',
    titleCn: '赛博特种兵',
    titleEn: 'CYBER-RAIDER',
    emoji: '🎒',
    accent: '#6d5df6',
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
    details: {
      strengths: [
        '执行力超强',
        '时间利用率高',
        '善于发现隐藏打卡点',
        '社交活跃',
      ],
      considerations: [
        '容易忽略休息',
        '可能错过慢节奏的美好',
        '需注意行程不要太赶',
      ],
      travelStyle: { energy: 90, planning: 60, social: 75, adventure: 85 },
      matchAdvice: '寻找同样高能量、能跟上节奏的搭子，或者互补型的摄影搭子',
      destTypes: ['热门打卡地', '网红景点', '徒步线路', '极限运动目的地'],
    },
  },
  'Zen-Capybara': {
    id: 'Zen-Capybara',
    titleCn: '精神卡皮巴拉',
    titleEn: 'ZEN-CAPYBARA',
    emoji: '🛀',
    accent: '#6d5df6',
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
    details: {
      strengths: ['情绪稳定', '善于发现生活小确幸', '适应力强', '善于倾听'],
      considerations: ['可能错过预订', '需注意时间安排', '偶尔需要推一把'],
      travelStyle: { energy: 30, planning: 20, social: 50, adventure: 40 },
      matchAdvice: '寻找同样松弛、不赶时间的搭子，或互补型的规划搭子',
      destTypes: ['温泉小镇', '咖啡之城', '海边民宿', '古镇村落'],
    },
  },
  'Budget-Architect': {
    id: 'Budget-Architect',
    titleCn: '精算系旅行家',
    titleEn: 'BUDGET-ARCHITECT',
    emoji: '🧮',
    accent: '#6d5df6',
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
    details: {
      strengths: [
        '预算控制精准',
        '行程安排合理',
        '善于发现优惠',
        '风险预判能力强',
      ],
      considerations: ['可能过于紧张', '需留出弹性空间', '偶尔也要随性一次'],
      travelStyle: { energy: 60, planning: 95, social: 55, adventure: 50 },
      matchAdvice: '寻找同样有规划意识的搭子，或互补型的体验派搭子',
      destTypes: ['文化遗产', '美食之都', '博物馆之城', '历史古迹'],
    },
  },
  'Romantic-Observer': {
    id: 'Romantic-Observer',
    titleCn: '人文浪漫主义',
    titleEn: 'ROMANTIC-OBSERVER',
    emoji: '🌹',
    accent: '#6d5df6',
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
    details: {
      strengths: ['审美敏锐', '善于发现细节之美', '情感丰富', '善于记录和分享'],
      considerations: [
        '可能忽略实用性',
        '需注意时间管理',
        '偶尔也要照顾同行者',
      ],
      travelStyle: { energy: 50, planning: 45, social: 65, adventure: 55 },
      matchAdvice: '寻找同样注重体验、愿意慢慢逛的搭子，或互补型的行动派搭子',
      destTypes: ['艺术之都', '小众秘境', '古镇村落', '自然光影圣地'],
    },
  },
}

/**
 * 趣味题库（共 8 题，二选一）。
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
  {
    title: '旅行住宿你更看重什么？',
    options: {
      A: '位置便利、交通方便的酒店，行程效率最重要。',
      B: '有特色、有氛围的民宿，住宿本身也是体验。',
    },
    scores: {
      A: ['Cyber-Raider', 'Budget-Architect'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
  {
    title: '一天的行程结束后，你会？',
    options: {
      A: '整理照片、更新社交媒体，分享今天的精彩瞬间。',
      B: '安静休息，或者随意逛逛，享受夜晚的宁静。',
    },
    scores: {
      A: ['Cyber-Raider', 'Budget-Architect'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
  {
    title: '面对当地美食，你会？',
    options: {
      A: '提前做好攻略，打卡评分最高的餐厅。',
      B: '随缘遇到什么吃什么，街边小摊也有惊喜。',
    },
    scores: {
      A: ['Budget-Architect', 'Cyber-Raider'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
  {
    title: '旅行中拍照，你更倾向于？',
    options: {
      A: '记录风景和地标，留下「到此一游」的证明。',
      B: '捕捉光影、细节和情绪，每张照片都要有故事。',
    },
    scores: {
      A: ['Cyber-Raider', 'Budget-Architect'],
      B: ['Romantic-Observer', 'Zen-Capybara'],
    },
  },
  {
    title: '如果可以选择搭子，你更希望对方？',
    options: {
      A: '和我节奏一致，能一起冲、一起打卡。',
      B: '和我兴趣相投，能一起慢慢感受、深入体验。',
    },
    scores: {
      A: ['Cyber-Raider', 'Budget-Architect'],
      B: ['Zen-Capybara', 'Romantic-Observer'],
    },
  },
]
