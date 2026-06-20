import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import type { MockTrip } from '../../mock'
import styles from './TripListPage.module.less'

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

/* ---- extended mock trip data ---- */
const MOCK_ALL_TRIPS: (MockTrip & { distance?: string })[] = [
  {
    title: '川西环线自驾',
    destination: '稻城亚丁',
    dateRange: '6.15 - 6.20',
    status: 'progress',
    distance: '1800km',
  },
  {
    title: '大理发呆之旅',
    destination: '大理',
    dateRange: '5.01 - 5.05',
    status: 'done',
    distance: '600km',
  },
  {
    title: '四姑娘山轻徒',
    destination: '四姑娘山',
    dateRange: '4.10 - 4.15',
    status: 'done',
    distance: '400km',
  },
  {
    title: '成都美食周末',
    destination: '成都',
    dateRange: '3.22 - 3.24',
    status: 'done',
    distance: '300km',
  },
  {
    title: '新都桥光影行',
    destination: '新都桥',
    dateRange: '3.08 - 3.12',
    status: 'done',
    distance: '800km',
  },
  {
    title: '康定情歌之旅',
    destination: '康定',
    dateRange: '2.14 - 2.18',
    status: 'done',
    distance: '500km',
  },
  {
    title: '理塘高城探秘',
    destination: '理塘',
    dateRange: '1.25 - 1.30',
    status: 'done',
    distance: '1200km',
  },
  {
    title: '洱海环湖骑行',
    destination: '大理',
    dateRange: '1.10 - 1.13',
    status: 'done',
    distance: '120km',
  },
]

function StatusBadge({ status }: { status: MockTrip['status'] }) {
  return (
    <span
      className={`${styles.badge} ${status === 'progress' ? styles.badgeProgress : styles.badgeDone}`}
    >
      {status === 'progress' ? '进行中' : '已完成'}
    </span>
  )
}

interface TripListPageProps {
  visible: boolean
  onClose: () => void
}

export function TripListPage({ visible, onClose }: TripListPageProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* ---- top bar ---- */}
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'我的行程'}</span>
          <div className={styles.topSpacer} />
        </div>

        {/* ---- stats header ---- */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <strong className={styles.statNum}>
              {MOCK_ALL_TRIPS.filter((t) => t.status === 'progress').length}
            </strong>
            <span className={styles.statText}>{'进行中'}</span>
          </div>
          <div className={styles.statItem}>
            <strong className={styles.statNum}>
              {MOCK_ALL_TRIPS.filter((t) => t.status === 'done').length}
            </strong>
            <span className={styles.statText}>{'已完成'}</span>
          </div>
          <div className={styles.statItem}>
            <strong className={styles.statNum}>{MOCK_ALL_TRIPS.length}</strong>
            <span className={styles.statText}>{'全部行程'}</span>
          </div>
        </div>

        {/* ---- trip list ---- */}
        <div className={styles.body}>
          {MOCK_ALL_TRIPS.map((trip, i) => (
            <article key={i} className={styles.card}>
              <span
                className={`${styles.dot} ${trip.status === 'progress' ? styles.dotProgress : styles.dotDone}`}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{trip.title}</h3>
                  <StatusBadge status={trip.status} />
                </div>
                <p className={styles.cardMeta}>
                  {trip.destination} · {trip.dateRange}
                  {trip.distance ? ` · ${trip.distance}` : ''}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
