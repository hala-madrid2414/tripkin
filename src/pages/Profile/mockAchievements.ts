import type { MockAchievement } from './mock'

export const allAchievements: MockAchievement[] = [
  { icon: '🏔️', title: '高原征服者', subtitle: '到达4500m+', unlocked: true },
  { icon: '🗺️', title: '10城旅人', subtitle: '探索10+城市', unlocked: true },
  {
    icon: '📜',
    title: '故事收集家',
    subtitle: '发布20+漂流瓶',
    unlocked: true,
  },
  { icon: '🤝', title: '社交达人', subtitle: '匹配50+搭子', unlocked: false },
  { icon: '🌍', title: '环球起航', subtitle: '跨越3大洲', unlocked: false },
]
