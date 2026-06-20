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
  'sichuan-chengdu': '成都',
  'sichuan-chuanxi': '川西',
  'sichuan-daocheng': '稻城',
  'sichuan-jiuzhaigou': '九寨沟',
  'sichuan-luguhu': '泸沽湖',
  xizang: '西藏',
  'xizang-lhasa': '拉萨',
  'xizang-linzhi': '林芝',
  qinghai: '青海',
  'qinghai-qinghaihu': '青海湖',
  xinjiang: '新疆',
  'xinjiang-ili': '伊犁',
  'xinjiang-altay': '阿勒泰',
  heilongjiang: '黑龙江',
  'heilongjiang-harbin': '哈尔滨',
  'heilongjiang-xuexiang': '雪乡',
  guangxi: '广西',
  'guangxi-guilin': '桂林',
  guangdong: '广东',
  'guangdong-guangzhou': '广州',
  jiangsu: '江苏',
  'jiangsu-nanjing': '南京',
}

const parentDestinationIds: Record<string, string | undefined> = {
  'yunnan-dali': 'yunnan',
  'yunnan-lijiang': 'yunnan',
  'sichuan-chengdu': 'sichuan',
  'sichuan-chuanxi': 'sichuan',
  'sichuan-daocheng': 'sichuan',
  'sichuan-jiuzhaigou': 'sichuan',
  'sichuan-luguhu': 'sichuan',
  'xizang-lhasa': 'xizang',
  'xizang-linzhi': 'xizang',
  'qinghai-qinghaihu': 'qinghai',
  'xinjiang-ili': 'xinjiang',
  'xinjiang-altay': 'xinjiang',
  'heilongjiang-harbin': 'heilongjiang',
  'heilongjiang-xuexiang': 'heilongjiang',
  'guangxi-guilin': 'guangxi',
  'guangdong-guangzhou': 'guangdong',
  'jiangsu-nanjing': 'jiangsu',
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
  'yunnan-lijiang': [
    {
      id: 'bottle-lijiang-1',
      type: 'story',
      content:
        '清晨的丽江古城还没热闹起来，石板路有点潮，远处传来店家开门的声音，整座城像刚刚醒来。',
      tags: ['丽江', '古城', '清晨'],
      from: '清晨散步的人',
      destinationName: '丽江',
      createdAt: '1 小时前',
    },
    {
      id: 'bottle-lijiang-2',
      type: 'guide',
      content:
        '如果想在丽江拍到空一点的古城街景，建议七点前出门，白沙古镇也很适合留半天慢慢逛。',
      tags: ['丽江', '白沙', '拍照'],
      from: '胶片旅人',
      destinationName: '丽江',
      createdAt: '今天上午',
    },
    {
      id: 'bottle-lijiang-3',
      type: 'partner',
      content:
        '6 月底在丽江待 4 天，想找一个能一起逛古城、喝咖啡、看日落的搭子，不赶景点。',
      tags: ['丽江', '约伴', '慢旅行'],
      from: '云边小店',
      destinationName: '丽江',
      createdAt: '今天',
    },
  ],
  'sichuan-chengdu': [
    {
      id: 'bottle-chengdu-1',
      type: 'guide',
      content:
        '来成都别只排满景点，找个茶馆坐一下午就很值。人民公园适合第一次来，社区老茶馆更适合慢慢体验。',
      tags: ['成都', '茶馆', '慢生活'],
      from: '盖碗茶选手',
      destinationName: '成都',
      createdAt: '40 分钟前',
    },
    {
      id: 'bottle-chengdu-2',
      type: 'wish',
      content:
        '想在成都认真吃两天，不赶路，只把火锅、冒菜、甜水面和夜晚的街边小店都吃一遍。',
      tags: ['成都', '美食', '心愿'],
      from: '热锅爱好者',
      destinationName: '成都',
      createdAt: '2 小时前',
    },
    {
      id: 'bottle-chengdu-3',
      type: 'partner',
      content:
        '周末在成都，想找饭搭子一起从午后茶馆坐到晚上火锅，顺便散步看锦江夜景。',
      tags: ['成都', '饭搭子', '夜游'],
      from: '吃货小满',
      destinationName: '成都',
      createdAt: '今天',
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
  'sichuan-daocheng': [
    {
      id: 'bottle-daocheng-1',
      type: 'story',
      content:
        '从洛绒牛场往牛奶海走的那段路很累，但抬头看到雪山和风吹过草坡的时候，会突然觉得值得。',
      tags: ['稻城亚丁', '牛奶海', '徒步'],
      from: '高原行者',
      destinationName: '稻城',
      createdAt: '3 小时前',
    },
    {
      id: 'bottle-daocheng-2',
      type: 'guide',
      content:
        '去稻城亚丁前最好先给自己留适应海拔的时间，水、糖和保暖层都别省，景区里节奏一定要放慢。',
      tags: ['稻城亚丁', '高反', '攻略'],
      from: '氧气瓶队长',
      destinationName: '稻城',
      createdAt: '今天上午',
    },
    {
      id: 'bottle-daocheng-3',
      type: 'partner',
      content:
        '6 月下旬想去稻城亚丁，计划自驾 6-7 天，想找能一起拼车拼房、也能接受高原慢节奏的搭子。',
      tags: ['稻城亚丁', '约伴', '自驾'],
      from: '阿策',
      destinationName: '稻城',
      createdAt: '今天',
    },
  ],
  'sichuan-jiuzhaigou': [
    {
      id: 'bottle-jiuzhaigou-1',
      type: 'story',
      content:
        '九寨沟的水颜色真的像开了滤镜，站在栈道边看五花海的时候，很难不把脚步放慢。',
      tags: ['九寨沟', '五花海', '风景'],
      from: '彩林观察员',
      destinationName: '九寨沟',
      createdAt: '5 小时前',
    },
    {
      id: 'bottle-jiuzhaigou-2',
      type: 'guide',
      content:
        '如果想拍到人少一点的九寨沟，建议尽量早入园，先走热门海子，后面再慢慢补栈道。',
      tags: ['九寨沟', '拍照', '错峰'],
      from: '光影捕手',
      destinationName: '九寨沟',
      createdAt: '今天上午',
    },
    {
      id: 'bottle-jiuzhaigou-3',
      type: 'wish',
      content:
        '一直想在天气好的时候去九寨沟看看水的颜色变化，最好能等到下午那束最透的光。',
      tags: ['九寨沟', '心愿', '摄影'],
      from: '等光的人',
      destinationName: '九寨沟',
      createdAt: '今天',
    },
  ],
  'sichuan-luguhu': [
    {
      id: 'bottle-luguhu-1',
      type: 'story',
      content:
        '晚上坐在泸沽湖边发呆，湖面一点点暗下来，远处星星亮起来的时候，会觉得整个人都安静了。',
      tags: ['泸沽湖', '星空', '湖边'],
      from: '湖风旅人',
      destinationName: '泸沽湖',
      createdAt: '昨天晚上',
    },
    {
      id: 'bottle-luguhu-2',
      type: 'partner',
      content:
        '明天准备租车环湖，节奏很慢，想找个愿意一起停下来拍照和喝咖啡的搭子。',
      tags: ['泸沽湖', '环湖', '约伴'],
      from: '单车少年',
      destinationName: '泸沽湖',
      createdAt: '2 小时前',
    },
    {
      id: 'bottle-luguhu-3',
      type: 'wish',
      content: '想在泸沽湖住进湖边小客栈，清晨推门就能看到风吹过湖面。',
      tags: ['泸沽湖', '客栈', '心愿'],
      from: '湖边来信',
      destinationName: '泸沽湖',
      createdAt: '今天',
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
  'xizang-linzhi': [
    {
      id: 'bottle-linzhi-1',
      type: 'story',
      content:
        '林芝的山谷云雾来得很快，车开在路上像在一层一层云里穿行，风景很温柔。',
      tags: ['林芝', '山谷', '云雾'],
      from: '山谷来客',
      destinationName: '林芝',
      createdAt: '昨天',
    },
    {
      id: 'bottle-linzhi-2',
      type: 'guide',
      content:
        '林芝更适合留白一点的路线，不要把每天排满，天气好的时候随时都值得停车看山。',
      tags: ['林芝', '公路', '攻略'],
      from: '看山的人',
      destinationName: '林芝',
      createdAt: '今天上午',
    },
    {
      id: 'bottle-linzhi-3',
      type: 'wish',
      content:
        '希望下次去林芝时能刚好遇到南迦巴瓦露脸，哪怕只是几分钟也想认真看完。',
      tags: ['林芝', '南迦巴瓦', '心愿'],
      from: '等云散开',
      destinationName: '林芝',
      createdAt: '今天',
    },
  ],
  qinghai: [
    {
      id: 'bottle-qinghai-1',
      type: 'wish',
      content:
        '想把下一次高原旅行留给青海，最好有湖、有风，也有一段能慢慢发呆的公路。',
      tags: ['青海', '高原', '心愿'],
      from: '远方收集者',
      destinationName: '青海',
      createdAt: '刚刚',
    },
    {
      id: 'bottle-qinghai-2',
      type: 'guide',
      content:
        '青海适合把路线拉开一点，留出充足路程和休息时间，沿途风景本身就是很大的奖励。',
      tags: ['青海', '公路', '灵感'],
      from: '高原地图',
      destinationName: '青海',
      createdAt: '今天',
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
    {
      id: 'bottle-qinghaihu-2',
      type: 'story',
      content:
        '青海湖边的风比想象中更大，但湖面颜色也更干净，傍晚站着不说话都觉得很舒服。',
      tags: ['青海湖', '湖风', '日落'],
      from: '牧云的人',
      destinationName: '青海湖',
      createdAt: '昨天',
    },
    {
      id: 'bottle-qinghaihu-3',
      type: 'guide',
      content:
        '青海湖早晚温差明显，骑行的话一定带防风层和补水，清晨光线最好，也最容易出片。',
      tags: ['青海湖', '骑行', '攻略'],
      from: '高原追风者',
      destinationName: '青海湖',
      createdAt: '今天上午',
    },
  ],
  'xinjiang-altay': [
    {
      id: 'bottle-altay-1',
      type: 'story',
      content:
        '秋天的喀纳斯像一整块被风吹开的调色盘，白桦林和湖水的颜色在同一个画面里特别不真实。',
      tags: ['阿勒泰', '喀纳斯', '秋色'],
      from: '秋色猎人',
      destinationName: '阿勒泰',
      createdAt: '8 小时前',
    },
    {
      id: 'bottle-altay-2',
      type: 'guide',
      content:
        '阿勒泰秋冬温差大，去喀纳斯或禾木记得把保暖、防风和清晨机位都提前准备好，路上补给点也要先看。',
      tags: ['阿勒泰', '禾木', '攻略'],
      from: '雪场老手',
      destinationName: '阿勒泰',
      createdAt: '昨天',
    },
    {
      id: 'bottle-altay-3',
      type: 'partner',
      content:
        '计划 12 月去阿勒泰滑雪，想找能一起拼住宿和雪场交通的雪友，节奏轻松但每天都想多滑几趟。',
      tags: ['阿勒泰', '滑雪', '约伴'],
      from: '雪友集合',
      destinationName: '阿勒泰',
      createdAt: '2天前',
    },
  ],
  'heilongjiang-xuexiang': [
    {
      id: 'bottle-xuexiang-1',
      type: 'story',
      content:
        '雪乡傍晚灯一亮，屋檐上的厚雪像奶油一样，主街再热闹一点也还是有很强的冬夜童话感。',
      tags: ['雪乡', '蘑菇屋', '雪夜'],
      from: '雪夜记录',
      destinationName: '雪乡',
      createdAt: '9 小时前',
    },
    {
      id: 'bottle-xuexiang-2',
      type: 'guide',
      content:
        '去雪乡最好先确认住宿位置、接送和早餐，夜拍特别冷，三脚架、电池和保暖层都不能少。',
      tags: ['雪乡', '住宿', '攻略'],
      from: '冬游参谋',
      destinationName: '雪乡',
      createdAt: '昨天',
    },
  ],
  'guangxi-guilin': [
    {
      id: 'bottle-guilin-1',
      type: 'story',
      content:
        '漓江竹筏慢慢往前漂的时候，两岸山峰和水面的倒影会让人自动安静下来，很像走进水墨画里。',
      tags: ['桂林', '漓江', '竹筏'],
      from: '山水慢客',
      destinationName: '桂林',
      createdAt: '7 小时前',
    },
    {
      id: 'bottle-guilin-2',
      type: 'guide',
      content:
        '桂林到阳朔别只赶景点，遇龙河和沿路骑行本身就很值得，最好把一天的一半时间留给路上风景。',
      tags: ['桂林', '阳朔', '攻略'],
      from: '路线小本',
      destinationName: '桂林',
      createdAt: '昨天',
    },
    {
      id: 'bottle-guilin-3',
      type: 'partner',
      content:
        '周末想去桂林拍一组山水和老街照片，想找一个不赶时间、愿意互相拍照的搭子。',
      tags: ['桂林', '拍照', '约伴'],
      from: '快门小鱼',
      destinationName: '桂林',
      createdAt: '2天前',
    },
  ],
  'guangdong-guangzhou': [
    {
      id: 'bottle-guangzhou-1',
      type: 'story',
      content:
        '广州早茶真的可以慢慢吃一上午，旁边的人在看报聊天，整座城市的节奏突然就慢了下来。',
      tags: ['广州', '早茶', '慢生活'],
      from: '早茶巡游',
      destinationName: '广州',
      createdAt: '8 小时前',
    },
    {
      id: 'bottle-guangzhou-2',
      type: 'guide',
      content:
        '沙面、荔湾、永庆坊到珠江夜游这条线很适合第一次逛广州，一天不算太赶，也能看见老城和夜景。',
      tags: ['广州', '沙面', '攻略'],
      from: '城市场记',
      destinationName: '广州',
      createdAt: '昨天',
    },
    {
      id: 'bottle-guangzhou-3',
      type: 'partner',
      content:
        '今晚想去珠江夜游顺手拍广州塔，想找个搭子一起坐船，结束后再去附近吃碗糖水。',
      tags: ['广州', '珠江夜游', '约伴'],
      from: '夜景收集',
      destinationName: '广州',
      createdAt: '2天前',
    },
  ],
  'jiangsu-nanjing': [
    {
      id: 'bottle-nanjing-1',
      type: 'story',
      content:
        '秦淮河夜里比白天更有味道，画舫一开，灯影在水面晃起来，南京的历史感会突然变得很具体。',
      tags: ['南京', '秦淮河', '夜游'],
      from: '秦淮夜游',
      destinationName: '南京',
      createdAt: '9 小时前',
    },
    {
      id: 'bottle-nanjing-2',
      type: 'guide',
      content:
        '南京两天的人文路线很好排，中山陵、总统府、颐和路和秦淮河可以串起来，但不要把每段都塞太满。',
      tags: ['南京', '中山陵', '攻略'],
      from: '金陵路线',
      destinationName: '南京',
      createdAt: '昨天',
    },
    {
      id: 'bottle-nanjing-3',
      type: 'partner',
      content:
        '想早起去南京拍梧桐大道和老街区，找一个愿意互相拍照、拍完再去吃鸭血粉丝汤的搭子。',
      tags: ['南京', '梧桐', '约伴'],
      from: '梧桐影子',
      destinationName: '南京',
      createdAt: '2天前',
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
