import type { MockFootprintStats } from '../../mock'
import styles from './FootprintSection.module.less'

interface FootprintSectionProps {
  footprintStats: MockFootprintStats
}

function formatDistance(km: number): string {
  if (km >= 10000) return `${(km / 10000).toFixed(1)}万`
  return km.toLocaleString()
}

export function FootprintSection({ footprintStats }: FootprintSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>👣</span>
          旅行足迹
        </h2>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <strong className={styles.statValue}>
            {footprintStats.cityCount}
          </strong>
          <span className={styles.statLabel}>旅行城市</span>
        </div>
        <div className={styles.statCard}>
          <strong className={styles.statValue}>
            {footprintStats.travelDays}
          </strong>
          <span className={styles.statLabel}>旅行天数</span>
        </div>
        <div className={styles.statCard}>
          <strong className={styles.statValue}>
            {formatDistance(footprintStats.totalDistance)}
          </strong>
          <span className={styles.statLabel}>累计行程 km</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.cityRow}>
        <span className={styles.cityLabel}>最近城市</span>
        <div className={styles.cityCloud}>
          {footprintStats.cities.map((city) => (
            <span key={city} className={styles.cityChip}>
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
