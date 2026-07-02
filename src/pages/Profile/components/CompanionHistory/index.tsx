import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import styles from './CompanionHistory.module.less'

function IconBack(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

/* ---- mock companion history ---- */
export interface CompanionHistoryItem {
  id: number | string
  name: string
  avatarEmoji: string
  mbti: string
  persona: string
  matchDate: string
  tripTogether: string
  status: string
}

const MOCK_COMPANION_HISTORY: CompanionHistoryItem[] = [
  {
    id: 1,
    name: '山间小鹿',
    avatarEmoji: '🦌',
    mbti: 'ENFP',
    persona: '人文浪漫主义',
    matchDate: '2026-06-15',
    tripTogether: '川西环线自驾',
    status: '同行中',
  },
  {
    id: 2,
    name: '风的旅人',
    avatarEmoji: '🍃',
    mbti: 'INTJ',
    persona: '精算系旅行家',
    matchDate: '2026-05-20',
    tripTogether: '四姑娘山轻徒',
    status: '已完成',
  },
  {
    id: 3,
    name: '云朵收集者',
    avatarEmoji: '☁️',
    mbti: 'INFP',
    persona: '精神卡皮巴拉',
    matchDate: '2026-05-08',
    tripTogether: '大理发呆之旅',
    status: '已完成',
  },
  {
    id: 4,
    name: '星夜探险家',
    avatarEmoji: '🌙',
    mbti: 'INTP',
    persona: '赛博特种兵',
    matchDate: '2026-04-22',
    tripTogether: '稻城亚丁',
    status: '已完成',
  },
  {
    id: 5,
    name: '海风旅人',
    avatarEmoji: '🌊',
    mbti: 'ENFP',
    persona: '人文浪漫主义',
    matchDate: '2026-04-10',
    tripTogether: '洱海骑行',
    status: '已完成',
  },
  {
    id: 6,
    name: '山居隐士',
    avatarEmoji: '🏡',
    mbti: 'INFP',
    persona: '精神卡皮巴拉',
    matchDate: '2026-03-18',
    tripTogether: '康定木格措',
    status: '已完成',
  },
  {
    id: 7,
    name: '城市漫游者',
    avatarEmoji: '🏙️',
    mbti: 'INTJ',
    persona: '精算系旅行家',
    matchDate: '2026-03-05',
    tripTogether: '成都美食之旅',
    status: '已完成',
  },
  {
    id: 8,
    name: '极光猎人',
    avatarEmoji: '🌌',
    mbti: 'ENFP',
    persona: '人文浪漫主义',
    matchDate: '2026-02-14',
    tripTogether: '新都桥星空',
    status: '已完成',
  },
]

function StatusBadge({ status }: { status: string }) {
  const isActive = status === '同行中' || status === '邀请中'
  return (
    <span
      className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusDone}`}
    >
      {status}
    </span>
  )
}

interface CompanionHistoryProps {
  visible: boolean
  items?: CompanionHistoryItem[]
  onClose: () => void
}

export function CompanionHistory({
  visible,
  items = MOCK_COMPANION_HISTORY,
  onClose,
}: CompanionHistoryProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* ---- top bar ---- */}
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'同行记录'}</span>
          <div className={styles.topSpacer} />
        </div>

        {/* ---- summary ---- */}
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <strong className={styles.summaryValue}>{items.length}</strong>
            <span className={styles.summaryLabel}>{'历史搭子'}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong className={styles.summaryValue}>
              {items.filter((c) => c.status === '同行中').length}
            </strong>
            <span className={styles.summaryLabel}>{'同行中'}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong className={styles.summaryValue}>
              {items.filter((c) => c.status === '已完成').length}
            </strong>
            <span className={styles.summaryLabel}>{'已完成'}</span>
          </div>
        </div>

        {/* ---- list ---- */}
        <div className={styles.body}>
          <div className={styles.list}>
            {items.map((item) => (
              <article key={item.id} className={styles.card}>
                <span className={styles.cardEmoji}>{item.avatarEmoji}</span>
                <div className={styles.cardInfo}>
                  <div className={styles.cardNameRow}>
                    <h3 className={styles.cardName}>{item.name}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className={styles.cardMeta}>
                    {item.mbti} · {item.persona}
                  </p>
                  <p className={styles.cardTrip}>
                    {'🧳 '}
                    {item.tripTogether}
                  </p>
                </div>
                <span className={styles.cardDate}>{item.matchDate}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
