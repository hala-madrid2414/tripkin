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
    {
      name: '海盐入梦',
      mbti: 'INFP',
      avatarEmoji: '🌊',
      lastInteraction: '5小时前',
    },
    {
      name: '宫墙研究员',
      mbti: 'INTJ',
      avatarEmoji: '🏮',
      lastInteraction: '上周',
    },
    {
      name: '紫色风路',
      mbti: 'ENFP',
      avatarEmoji: '🪻',
      lastInteraction: '刚刚',
    },
  ],
  bottleStats: {
    sent: 21,
    replies: 16,
    saved: 12,
  },
  tripStats: {
    inProgress: 4,
    completed: 11,
    nextDeparture: '7月3日',
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
      {
        title: '杭州周末 citywalk',
        destination: '杭州',
        dateRange: '3.22 - 3.23',
        status: 'done',
      },
      {
        title: '哈尔滨亮灯夜游',
        destination: '哈尔滨',
        dateRange: '1.12 - 1.16',
        status: 'done',
      },
    ],
  },
  footprintStats: {
    cities: [
      '大理',
      '稻城',
      '四姑娘山',
      '新都桥',
      '理塘',
      '康定',
      '杭州',
      '哈尔滨',
      '三亚',
    ],
    cityCount: 21,
    travelDays: 104,
  },
  collectionStats: {
    destinations: 16,
    bottles: 14,
    companions: 6,
  },
  settingsItems: [
    { icon: '👤', title: '账号设置' },
    { icon: '🔒', title: '隐私设置' },
    { icon: '🔔', title: '通知设置' },
    { icon: '🧭', title: '旅行偏好管理' },
    { icon: '🪪', title: '身份卡展示设置' },
    { icon: 'ℹ️', title: '关于我们' },
  ],
}
