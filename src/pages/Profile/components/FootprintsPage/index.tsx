import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import type { MockFootprintStats } from '../../mock'
import { footprintTimeline } from '../../mockFootprints'
import styles from './FootprintsPage.module.less'

interface FootprintsPageProps {
  visible: boolean
  stats: MockFootprintStats
  onClose: () => void
}

function formatDistance(km: number): string {
  if (km >= 10000) return (km / 10000).toFixed(1) + '万'
  return km.toLocaleString()
}

export function FootprintsPage({
  visible,
  stats,
  onClose,
}: FootprintsPageProps) {
  if (!visible) return null

  const years = [...new Set(footprintTimeline.map((e) => e.year))].sort(
    (a, b) => b - a,
  )

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>旅行足迹</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {/* stats */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <strong className={styles.statValue}>{stats.cityCount}</strong>
              <span className={styles.statLabel}>旅行城市</span>
            </div>
            <div className={styles.statCard}>
              <strong className={styles.statValue}>{stats.travelDays}</strong>
              <span className={styles.statLabel}>旅行天数</span>
            </div>
            <div className={styles.statCard}>
              <strong className={styles.statValue}>
                {formatDistance(stats.totalDistance)}
              </strong>
              <span className={styles.statLabel}>累计行程 km</span>
            </div>
          </div>

          {/* recent cities */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.blockTitle}>最近到访</h3>
            <div className={styles.cityCloud}>
              {stats.cities.map((city) => (
                <span key={city} className={styles.cityChip}>
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* timeline */}
          <div className={styles.timeline}>
            {years.map((year) => {
              const entries = footprintTimeline.filter((e) => e.year === year)
              return (
                <div key={year} className={styles.yearGroup}>
                  <div className={styles.yearMarker}>
                    <span className={styles.yearDot} />
                    <span className={styles.yearLabel}>{year}</span>
                  </div>
                  <div className={styles.yearEntries}>
                    {entries.map((entry) => (
                      <div key={entry.id} className={styles.timelineItem}>
                        <div className={styles.timelineDot} />
                        <div className={styles.timelineContent}>
                          <div className={styles.timelineHeader}>
                            <strong className={styles.timelineCity}>
                              {entry.city}
                            </strong>
                            <span className={styles.timelineDate}>
                              {entry.date.slice(5)}
                            </span>
                          </div>
                          <p className={styles.timelineNote}>{entry.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
