export interface MockCompanion {
  name: string
  mbti: string
  avatarEmoji: string
  lastInteraction: string
}

export interface MockBottleStats {
  sent: number
  replies: number
  saved: number
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
  cities: string[]
  cityCount: number
  travelDays: number
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

export interface MockProfileData {
  companions: MockCompanion[]
  bottleStats: MockBottleStats
  tripStats: MockTripStats
  footprintStats: MockFootprintStats
  collectionStats: MockCollectionStats
  settingsItems: MockSettingsItem[]
}

export const mockProfileData: MockProfileData = {
  companions: [
    {
      name: '山间小鹿',
      mbti: 'ENFP',
      avatarEmoji: '🦌',
      lastInteraction: '3小时前',
    },
    {
      name: '风的旅人',
      mbti: 'INTJ',
      avatarEmoji: '🍃',
      lastInteraction: '昨天',
    },
    {
      name: '云朵收集者',
      mbti: 'INFP',
      avatarEmoji: '☁️',
      lastInteraction: '2天前',
    },
  ],
  bottleStats: {
    sent: 12,
    replies: 8,
    saved: 5,
  },
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
    cities: ['大理', '稻城', '四姑娘山', '新都桥', '理塘', '康定'],
    cityCount: 14,
    travelDays: 68,
  },
  collectionStats: {
    destinations: 9,
    bottles: 5,
    companions: 3,
  },
  settingsItems: [
    { icon: '👤', title: '账号设置' },
    { icon: '🔒', title: '隐私设置' },
    { icon: '🔔', title: '通知设置' },
    { icon: 'ℹ️', title: '关于我们' },
  ],
}
