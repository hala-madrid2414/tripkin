import { useMemo, useState } from 'react'
import styles from './Match.module.less'
import MatchFilterChips from './components/MatchFilterChips'
import MatchHeroHeader from './components/MatchHeroHeader'
import MatchModeSwitch from './components/MatchModeSwitch'
import PartnerMatchCard from './components/PartnerMatchCard'
import TripMatchCard from './components/TripMatchCard'
import type {
  MatchMode,
  MatchModeContent,
  MatchModeOption,
  PartnerMatchCardData,
  TripMatchCardData,
} from './types'

const modeOptions: MatchModeOption[] = [
  { key: 'partner', label: '搭子匹配' },
  { key: 'trip', label: '行程匹配' },
]

const partnerCards: PartnerMatchCardData[] = [
  {
    id: 'partner-01',
    name: '安然',
    avatarLabel: 'AR',
    matchScore: '默契 92%',
    personality: 'ENFP / 热爱拍照',
    interests: ['轻徒步', '日落营地', '寺庙打卡'],
    destination: '稻城亚丁 + 新都桥',
    departure: '6 月 21 日 - 6 月 25 日',
    summary:
      '节奏轻松，愿意一起拍照和找小众观景位，想找会沟通、愿意拼车的同行搭子。',
    actionLabel: '去认识',
  },
  {
    id: 'partner-02',
    name: '周周',
    avatarLabel: 'ZZ',
    matchScore: '默契 88%',
    personality: 'ISFP / 喜欢慢慢逛',
    interests: ['咖啡探店', '山野发呆', '氛围民宿'],
    destination: '四姑娘山双桥沟',
    departure: '6 月 24 日 - 6 月 27 日',
    summary: '希望行程不要太赶，白天看风景晚上聊聊天，偏好安静但不冷场的搭子。',
    actionLabel: '聊一聊',
  },
  {
    id: 'partner-03',
    name: 'Lin',
    avatarLabel: 'LN',
    matchScore: '默契 84%',
    personality: 'INTJ / 攻略控',
    interests: ['自驾路线', '雪山机位', '高原安全'],
    destination: '川西环线 5 天',
    departure: '6 月 28 日 - 7 月 2 日',
    summary: '已经整理了住宿和拍照点位，希望队友时间观念强，能接受早起追光。',
    actionLabel: '看资料',
  },
  {
    id: 'partner-04',
    name: '小棠',
    avatarLabel: 'XT',
    matchScore: '默契 81%',
    personality: 'ESFJ / 会照顾人',
    interests: ['公路音乐', '藏式甜茶', '轻社交'],
    destination: '康定 + 塔公草原',
    departure: '7 月 1 日 - 7 月 4 日',
    summary:
      '想要有共同审美和基本规划感的旅伴，一起把这趟川西行过得松弛又不失控。',
    actionLabel: '发邀请',
  },
]

const tripCards: TripMatchCardData[] = [
  {
    id: 'trip-01',
    organizerName: '阿曲',
    organizerAvatar: 'AQ',
    title: '周末 2.5 天康定追云海',
    location: '康定机场路 + 鱼子西',
    schedule: '6 月 22 日出发 / 6 月 24 日返程',
    travelStyle: '拼车 + 轻徒步',
    groupStatus: '现 2 人，还差 2 人',
    summary:
      '路线轻松，安排了两个日落点和一晚露营，适合第一次去川西又想拍到风景的人。',
    actionLabel: '申请加入',
  },
  {
    id: 'trip-02',
    organizerName: 'Mia',
    organizerAvatar: 'MI',
    title: '稻城亚丁慢节奏散心局',
    location: '理塘 - 亚丁村 - 冲古寺',
    schedule: '6 月 25 日出发 / 6 月 29 日返程',
    travelStyle: '包车 + 民宿',
    groupStatus: '现 3 人，还差 1 人',
    summary:
      '整体偏慢节奏，预留了高反适应时间和拍照空档，欢迎愿意共同分担预算的女生同行。',
    actionLabel: '申请加入',
  },
  {
    id: 'trip-03',
    organizerName: 'Ken',
    organizerAvatar: 'KE',
    title: '川西公路巡礼摄影拼队',
    location: '新都桥 - 塔公 - 墨石公园',
    schedule: '6 月 30 日出发 / 7 月 3 日返程',
    travelStyle: '自驾 + 摄影点打卡',
    groupStatus: '现 1 人，还差 3 人',
    summary:
      '偏向日出日落机位和沿途公路氛围，适合会简单拍照或愿意互相出片的旅伴。',
    actionLabel: '申请加入',
  },
  {
    id: 'trip-04',
    organizerName: '初七',
    organizerAvatar: 'CQ',
    title: '四姑娘山治愈系避暑计划',
    location: '双桥沟 + 猫鼻梁观景台',
    schedule: '7 月 2 日出发 / 7 月 5 日返程',
    travelStyle: '高铁 + 打车',
    groupStatus: '现 2 人，还差 1 人',
    summary:
      '主打轻松吸氧、风景和好好休息，预算透明，适合想在假期里短暂逃离工作的同频搭子。',
    actionLabel: '申请加入',
  },
]

const matchContent: Record<MatchMode, MatchModeContent> = {
  partner: {
    title: '找旅行搭子',
    subtitle:
      '根据你对川西旅行节奏、兴趣和出发时间的偏好，为你挑出更同频的旅伴。',
    helperText: '更偏向轻松拍照、慢节奏发呆和愿意一起规划路线的人。',
    resultHint: '共为你整理 4 位同频旅行搭子，优先展示默契度更高的人选。',
    chips: [
      { id: 'partner-chip-01', label: '川西小环线', highlighted: true },
      { id: 'partner-chip-02', label: '6 月下旬出发' },
      { id: 'partner-chip-03', label: '喜欢拍照' },
      { id: 'partner-chip-04', label: '可接受拼车' },
      { id: 'partner-chip-05', label: '女生优先' },
    ],
  },
  trip: {
    title: '找可加入行程',
    subtitle:
      '把已经发布的川西行程按地点、时间和人数整理成更容易比较的加入列表。',
    helperText: '推荐你优先查看时间相近、风格偏松弛且人数尚未满员的队伍。',
    resultHint: '当前有 4 个可加入行程，已按时间和匹配偏好为你排序。',
    chips: [
      { id: 'trip-chip-01', label: '2 - 5 天短线', highlighted: true },
      { id: 'trip-chip-02', label: '可拼车' },
      { id: 'trip-chip-03', label: '预算友好' },
      { id: 'trip-chip-04', label: '风景向' },
      { id: 'trip-chip-05', label: '人数未满' },
    ],
  },
}

function Match() {
  const [activeMode, setActiveMode] = useState<MatchMode>('partner')
  const currentContent = matchContent[activeMode]
  const currentCards = useMemo(
    () => (activeMode === 'partner' ? partnerCards : tripCards),
    [activeMode],
  )

  return (
    <main className={styles.page} data-mode={activeMode}>
      <div className={styles.pageShell}>
        <MatchHeroHeader
          mode={activeMode}
          title={currentContent.title}
          subtitle={currentContent.subtitle}
          helperText={currentContent.helperText}
        />

        <MatchModeSwitch
          activeMode={activeMode}
          options={modeOptions}
          onChange={setActiveMode}
        />

        <MatchFilterChips items={currentContent.chips} />

        <section className={styles.resultPanel} aria-label="匹配结果列表">
          <div className={styles.resultHeading}>
            <p className={styles.resultEyebrow}>为你精选</p>
            <p className={styles.resultHint}>{currentContent.resultHint}</p>
          </div>

          <div className={styles.cardList}>
            {activeMode === 'partner'
              ? (currentCards as PartnerMatchCardData[]).map((item) => (
                  <PartnerMatchCard key={item.id} item={item} />
                ))
              : (currentCards as TripMatchCardData[]).map((item) => (
                  <TripMatchCard key={item.id} item={item} />
                ))}
          </div>
        </section>

        <footer className={styles.footerNote}>
          静态结果页仅用于当前 Demo 展示，后续将接入真实筛选与申请流程。
        </footer>
      </div>
    </main>
  )
}

export default Match
