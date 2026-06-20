import type {
  BottleListPayload,
  BottleMessage,
  BottleType,
} from '../types/bottle.js'

const bottleTypeLabels: Record<BottleType, string> = {
  story: '故事',
  wish: '心愿',
  guide: '攻略',
  partner: '约伴',
}

const destinationLabels: Record<string, string> = {
  yunnan: '云南',
  'yunnan-dali': '大理',
  'yunnan-lijiang': '丽江',
  sichuan: '四川',
  'sichuan-chuanxi': '川西',
  'sichuan-daocheng': '稻城',
  xizang: '西藏',
  'xizang-lhasa': '拉萨',
  'xizang-linzhi': '林芝',
  'qinghai-qinghaihu': '青海湖',
}

const parentDestinationIds: Record<string, string | undefined> = {
  'yunnan-dali': 'yunnan',
  'yunnan-lijiang': 'yunnan',
  'sichuan-chuanxi': 'sichuan',
  'sichuan-daocheng': 'sichuan',
  'xizang-lhasa': 'xizang',
  'xizang-linzhi': 'xizang',
}

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
    },
    {
      id: 'bottle-dali-2',
      type: 'partner',
      content: '想找一个不赶路的人，一起在古城晒太阳，晚上去听一场小小的现场。',
      tags: ['约伴', '古城', 'Live'],
      from: '海边的风',
      destinationName: '大理',
      createdAt: '今天下午',
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
    },
    {
      id: 'bottle-chuanxi-2',
      type: 'wish',
      content: '想在山口等一次云开，看雪山从灰蓝色里慢慢亮起来。',
      tags: ['日照金山', '摄影', '清晨'],
      from: '山间旅人',
      destinationName: '川西',
      createdAt: '1 小时前',
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
    },
  ],
}

const memoryBottleByDest: Record<string, BottleMessage[]> = {}

function getDestinationName(destinationId: string) {
  return destinationLabels[destinationId] ?? destinationId
}

function createFallbackBottle(destinationId: string): BottleMessage[] {
  const destinationName = getDestinationName(destinationId)

  return [
    {
      id: `bottle-${destinationId}-fallback-1`,
      type: 'wish',
      content: `想把下一段旅程留给 ${destinationName}，不赶路，只认真记住这里的风景和声音。`,
      tags: [destinationName, '精选', '慢旅行'],
      from: '匿名旅人',
      destinationName,
      createdAt: '刚刚',
    },
    {
      id: `bottle-${destinationId}-fallback-2`,
      type: 'guide',
      content: `${destinationName} 适合先选一个想停留的角落，再把路线交给当天的天气和心情。`,
      tags: [destinationName, '攻略', '灵感'],
      from: '地图边的旅人',
      destinationName,
      createdAt: '今天',
    },
  ]
}

export function getBottleListByDestinationId(
  destinationId: string,
): BottleListPayload {
  const userItems = memoryBottleByDest[destinationId] ?? []
  const exactItems = bottleMockByDest[destinationId]

  if (exactItems) {
    return {
      items: [...userItems, ...exactItems],
      source: 'exact',
    }
  }

  const parentId = parentDestinationIds[destinationId]
  const parentItems = parentId ? bottleMockByDest[parentId] : undefined

  if (parentId && parentItems) {
    return {
      items: [
        ...userItems,
        ...parentItems.map((item) => ({
          ...item,
          destinationName: getDestinationName(destinationId),
          tags: Array.from(
            new Set([getDestinationName(destinationId), ...item.tags]),
          ),
        })),
      ],
      source: 'parent',
      sourceName: getDestinationName(parentId),
    }
  }

  return {
    items: [...userItems, ...createFallbackBottle(destinationId)],
    source: 'fallback',
  }
}

export function createBottleMessage(input: {
  destinationId: string
  type: BottleType
  content: string
}): BottleMessage {
  const destinationName = getDestinationName(input.destinationId)
  const newBottle: BottleMessage = {
    id: `server-${input.destinationId}-${Date.now()}`,
    type: input.type,
    content: input.content,
    tags: [bottleTypeLabels[input.type], destinationName, '刚投出'],
    from: '我投出的瓶子',
    destinationName,
    createdAt: '刚刚',
  }

  memoryBottleByDest[input.destinationId] = [
    newBottle,
    ...(memoryBottleByDest[input.destinationId] ?? []),
  ]

  return newBottle
}
