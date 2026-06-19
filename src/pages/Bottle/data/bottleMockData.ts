export type BottleType = 'story' | 'wish' | 'guide' | 'partner'

export type BottleMessage = {
  id: string
  type: BottleType
  content: string
  tags: string[]
  from: string
  destinationName: string
  createdAt: string
  imageUrl?: string
}

export type BottleListSource = 'exact' | 'parent' | 'fallback'

export type BottleListResult = {
  items: BottleMessage[]
  source: BottleListSource
  sourceName?: string
}

export const bottleTypeOptions: Array<{ value: BottleType; label: string }> = [
  { value: 'story', label: '故事' },
  { value: 'wish', label: '心愿' },
  { value: 'guide', label: '攻略' },
  { value: 'partner', label: '约伴' },
]

export const typeLabels: Record<BottleType, string> = {
  story: '故事',
  wish: '心愿',
  guide: '攻略',
  partner: '约伴',
}

export const createMockImage = (
  primary: string,
  secondary: string,
  accent: string,
) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${primary}" />
          <stop offset="1" stop-color="${secondary}" />
        </linearGradient>
        <linearGradient id="path" x1="0" x2="1" y1="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.35" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="34" fill="url(#bg)" />
      <circle cx="112" cy="88" r="58" fill="#ffffff" opacity="0.2" />
      <circle cx="540" cy="82" r="82" fill="${accent}" opacity="0.38" />
      <path d="M72 292 C172 198 248 348 352 234 S502 168 586 248" fill="none" stroke="url(#path)" stroke-width="18" stroke-linecap="round" />
      <path d="M0 330 C120 288 220 356 340 314 S526 284 640 328 V420 H0 Z" fill="#ffffff" opacity="0.28" />
      <path d="M84 128 L194 106 L210 214 L102 238 Z" fill="#ffffff" opacity="0.78" />
      <path d="M112 156 H184 M118 184 H176 M124 210 H164" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.78" />
      <circle cx="456" cy="244" r="16" fill="#ffffff" opacity="0.75" />
      <circle cx="492" cy="218" r="9" fill="#ffffff" opacity="0.62" />
    </svg>
  `)}`

export const defaultBottleImage = createMockImage(
  '#f0edff',
  '#d9d2ff',
  '#6c5cf6',
)

const bottleMockByDest: Record<string, BottleMessage[]> = {
  yunnan: [
    {
      id: 'bottle-yunnan-1',
      type: 'wish',
      content:
        '想在云南看一次日落，从古城慢慢走到风里，再把今天寄给未来的自己。',
      tags: ['日落', '慢旅行', '古城'],
      from: '匿名旅人',
      destinationName: '云南',
      createdAt: '刚刚',
      imageUrl: createMockImage('#8f82ff', '#f3f0ff', '#6c5cf6'),
    },
    {
      id: 'bottle-yunnan-2',
      type: 'story',
      content:
        '在雨后的石板路上遇到一家小店，老板说旅行不用赶路，先喝完这杯茶。',
      tags: ['雨后', '茶馆', '松弛感'],
      from: '云朵收集者',
      destinationName: '云南',
      createdAt: '18 分钟前',
      imageUrl: createMockImage('#7a6cff', '#fff3f7', '#6c5cf6'),
    },
  ],
  'yunnan-dali': [
    {
      id: 'bottle-dali-1',
      type: 'story',
      content: '洱海边骑车真的很舒服，风从耳边穿过去，连发呆都像一段路线。',
      tags: ['洱海', '骑行', '风景'],
      from: '风里的旅人',
      destinationName: '大理',
      createdAt: '2 小时前',
      imageUrl: createMockImage('#c3b8ff', '#f7f8fc', '#7d6bff'),
    },
    {
      id: 'bottle-dali-2',
      type: 'partner',
      content: '想找一个不赶路的人，一起在古城晒太阳，晚上去听一场小小的现场。',
      tags: ['约伴', '古城', 'Live'],
      from: '海边的风',
      destinationName: '大理',
      createdAt: '今天下午',
      imageUrl: createMockImage('#6e5bff', '#d9e6ff', '#5146d9'),
    },
  ],
  'sichuan-chuanxi': [
    {
      id: 'bottle-chuanxi-1',
      type: 'guide',
      content: '川西天气变化很快，外套、防晒和热水都别省，日照金山值得早起。',
      tags: ['川西', '自驾', '雪山'],
      from: '攻略控 INTJ',
      destinationName: '川西',
      createdAt: '35 分钟前',
      imageUrl: createMockImage('#5146d9', '#a79cff', '#f0edff'),
    },
    {
      id: 'bottle-chuanxi-2',
      type: 'wish',
      content: '想在山口等一次云开，看雪山从灰蓝色里慢慢亮起来。',
      tags: ['日照金山', '摄影', '清晨'],
      from: '山间旅人',
      destinationName: '川西',
      createdAt: '1 小时前',
      imageUrl: createMockImage('#8f82ff', '#eef2ff', '#5d52e8'),
    },
  ],
  'xizang-lhasa': [
    {
      id: 'bottle-lhasa-1',
      type: 'story',
      content: '八廓街的脚步声很轻，转角处的阳光落下来，整个人都会安静。',
      tags: ['拉萨', '八廓街', '日光'],
      from: '日光旅人',
      destinationName: '拉萨',
      createdAt: '昨天',
      imageUrl: createMockImage('#745dff', '#fff5df', '#e6b75c'),
    },
  ],
  'qinghai-qinghaihu': [
    {
      id: 'bottle-qinghaihu-1',
      type: 'partner',
      content: '想环湖骑一段，不追速度，只追风和湖面的颜色。',
      tags: ['青海湖', '骑行', '约伴'],
      from: '拿铁加冰',
      destinationName: '青海湖',
      createdAt: '3 小时前',
      imageUrl: createMockImage('#5f8cff', '#eaf3ff', '#6c5cf6'),
    },
  ],
}

function createFallbackBottle(
  destinationId: string,
  destinationName: string,
): BottleMessage[] {
  return [
    {
      id: `bottle-${destinationId}-fallback-1`,
      type: 'wish',
      content: `想把下一段旅程留给 ${destinationName}，不赶路，只认真记住这里的风景和声音。`,
      tags: [destinationName, '精选', '慢旅行'],
      from: '匿名旅人',
      destinationName,
      createdAt: '刚刚',
      imageUrl: defaultBottleImage,
    },
    {
      id: `bottle-${destinationId}-fallback-2`,
      type: 'guide',
      content: `${destinationName} 适合先选一个想停留的角落，再把路线交给当天的天气和心情。`,
      tags: [destinationName, '攻略', '灵感'],
      from: '地图边的旅人',
      destinationName,
      createdAt: '今天',
      imageUrl: createMockImage('#8f82ff', '#eef2ff', '#5d52e8'),
    },
  ]
}

export function getBottleListByDest(options: {
  destId: string
  destName: string
  parentId?: string
  parentName?: string
}): BottleListResult {
  const exactItems = bottleMockByDest[options.destId]

  if (exactItems) {
    return {
      items: exactItems,
      source: 'exact',
    }
  }

  const parentItems = options.parentId
    ? bottleMockByDest[options.parentId]
    : undefined

  if (parentItems) {
    return {
      items: parentItems.map((item) => ({
        ...item,
        destinationName: options.destName,
        tags: Array.from(new Set([options.destName, ...item.tags])),
      })),
      source: 'parent',
      sourceName: options.parentName,
    }
  }

  return {
    items: createFallbackBottle(options.destId, options.destName),
    source: 'fallback',
  }
}
