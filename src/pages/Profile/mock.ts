export interface MockCompanion {
  name: string
  mbti: string
  personaLabel: string
  avatarEmoji: string
  lastInteraction: string
}

export interface MockBottleStats {
  sent: number
  replies: number
  featured: number
}

export interface MockFeaturedStory {
  title: string
  destination: string
  snippet: string
}

export interface MockTrip {
  title: string
  destination: string
  dateRange: string
  status: 'progress' | 'done'
}

export interface MockTripStats {
  inProgress: number
  completed: number
  nextDeparture: string
  recentTrips: MockTrip[]
}

export interface MockFootprintStats {
  cityCount: number
  travelDays: number
  totalDistance: number
  cities: string[]
}

export interface MockCollectionStats {
  destinations: number
  bottles: number
  companions: number
}

export interface MockSettingsItem {
  icon: string
  title: string
}

export interface MockAchievement {
  icon: string
  title: string
  subtitle: string
  unlocked: boolean
}

export interface MockMatchingProfile {
  totalMatches: number
  activeCompanions: number
  matchBreakdown: {
    label: string
    mbti: string
    emoji: string
    count: number
  }[]
}

export interface MockTravelLevel {
  level: number
  title: string
  exp: number
  nextExp: number
}

export interface MockTravelIndices {
  cityExplore: number
  culture: number
  social: number
}

export interface MockProfileData {
  travelLevel: MockTravelLevel
  matchingProfile: MockMatchingProfile
  bottleStats: MockBottleStats
  featuredStories: MockFeaturedStory[]
  tripStats: MockTripStats
  footprintStats: MockFootprintStats
  collectionStats: MockCollectionStats
  achievements: MockAchievement[]
  settingsItems: MockSettingsItem[]
  travelIndices: MockTravelIndices
}

export const mockProfileData: MockProfileData = {
  travelLevel: {
    level: 12,
    title: '资深旅行者',
    exp: 2840,
    nextExp: 3200,
  },
  matchingProfile: {
    totalMatches: 24,
    activeCompanions: 3,
    matchBreakdown: [
      { label: '精神卡皮巴拉', mbti: 'INFP', emoji: '🦫', count: 8 },
      { label: '人文浪漫主义', mbti: 'ENFP', emoji: '🌿', count: 6 },
      { label: '赛博特种兵', mbti: 'INTP', emoji: '🎯', count: 5 },
      { label: '精算系旅行家', mbti: 'INTJ', emoji: '📊', count: 5 },
    ],
  },
  bottleStats: {
    sent: 12,
    replies: 8,
    featured: 2,
  },
  featuredStories: [
    {
      title: '在稻城亚丁捡到的一封信',
      destination: '稻城亚丁',
      snippet: '那天下午，我在冲古寺的石阶上发现了一个泛黄的信封...',
    },
    {
      title: '大理的云知道答案',
      destination: '大理',
      snippet: '洱海边的老奶奶说，这里的每一朵云都有自己的名字...',
    },
  ],
  tripStats: {
    inProgress: 2,
    completed: 7,
    nextDeparture: '6月28日',
    recentTrips: [
      {
        title: '川西环线自驾',
        destination: '稻城亚丁',
        dateRange: '6.15 - 6.20',
        status: 'progress',
      },
      {
        title: '大理发呆之旅',
        destination: '大理',
        dateRange: '5.01 - 5.05',
        status: 'done',
      },
      {
        title: '四姑娘山轻徒',
        destination: '四姑娘山',
        dateRange: '4.10 - 4.15',
        status: 'done',
      },
    ],
  },
  footprintStats: {
    cityCount: 14,
    travelDays: 68,
    totalDistance: 12400,
    cities: ['大理', '稻城', '四姑娘山', '新都桥', '理塘', '康定'],
  },
  collectionStats: {
    destinations: 9,
    bottles: 5,
    companions: 3,
  },
  achievements: [
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
  ],
  settingsItems: [
    { icon: '👤', title: '账号设置' },
    { icon: '🔒', title: '隐私设置' },
    { icon: '🔔', title: '通知设置' },
    { icon: 'ℹ️', title: '关于我们' },
  ],
  travelIndices: {
    cityExplore: 82,
    culture: 74,
    social: 65,
  },
}
