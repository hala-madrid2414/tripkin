export interface MockFavoriteDestination {
  id: string
  cityName: string
  coverEmoji: string
  reason: string
  collectedAt: string
}

export interface MockFavoriteBottle {
  id: string
  cityTag: string
  title: string
  snippet: string
  collectedAt: string
}

export interface MockFavoriteCompanion {
  id: string
  avatarEmoji: string
  nickname: string
  mbti: string
  personalityLabel: string
  tags: string[]
  travelStyle: string
  collectedAt: string
}

export const favoriteDestinations: MockFavoriteDestination[] = [
  {
    id: 'fd-1',
    cityName: '大理',
    coverEmoji: '🏔️',
    reason: '苍山洱海间的慢生活，最适合发呆和治愈',
    collectedAt: '2026-06-15',
  },
  {
    id: 'fd-2',
    cityName: '稻城亚丁',
    coverEmoji: '🏞️',
    reason: '蓝色星球上最后一片净土，灵魂的朝圣之地',
    collectedAt: '2026-06-10',
  },
  {
    id: 'fd-3',
    cityName: '四姑娘山',
    coverEmoji: '⛰️',
    reason: '东方阿尔卑斯，轻徒步爱好者的天堂',
    collectedAt: '2026-05-28',
  },
  {
    id: 'fd-4',
    cityName: '新都桥',
    coverEmoji: '🌅',
    reason: '摄影师的天堂，光影在这里会说话',
    collectedAt: '2026-05-20',
  },
  {
    id: 'fd-5',
    cityName: '康定',
    coverEmoji: '🏕️',
    reason: '跑马溜溜的山上，一曲情歌一座城',
    collectedAt: '2026-05-12',
  },
]

export const favoriteBottles: MockFavoriteBottle[] = [
  {
    id: 'fb-1',
    cityTag: '大理',
    title: '洱海边的日落诗',
    snippet:
      '那天傍晚，洱海的水面被染成金色，我突然明白了什么叫"此心安处是吾乡"...',
    collectedAt: '2026-06-08',
  },
  {
    id: 'fb-2',
    cityTag: '稻城',
    title: '牛奶海旁许下的愿望',
    snippet: '海拔4600米，空气稀薄，但那一刻我许下的愿望比任何时候都清晰...',
    collectedAt: '2026-05-25',
  },
  {
    id: 'fb-3',
    cityTag: '理塘',
    title: '世界高城的星空',
    snippet: '理塘的夜，银河像是触手可及。躺在草原上，整片宇宙都在对你眨眼...',
    collectedAt: '2026-05-18',
  },
]

export const favoriteCompanions: MockFavoriteCompanion[] = [
  {
    id: 'fc-1',
    avatarEmoji: '🦊',
    nickname: '山间小鹿',
    mbti: 'INFP',
    personalityLabel: '精神卡皮巴拉',
    tags: ['摄影', '徒步', '咖啡'],
    travelStyle: '慢节奏深度游',
    collectedAt: '2026-06-12',
  },
  {
    id: 'fc-2',
    avatarEmoji: '🐼',
    nickname: '流浪的熊猫',
    mbti: 'ENFP',
    personalityLabel: '人文浪漫主义',
    tags: ['美食', '人文', '摄影'],
    travelStyle: '随心所欲探索派',
    collectedAt: '2026-06-05',
  },
]
