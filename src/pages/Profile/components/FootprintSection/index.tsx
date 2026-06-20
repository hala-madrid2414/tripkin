import type { MockFootprintStats } from '../../mock'
import styles from './FootprintSection.module.less'

interface FootprintSectionProps {
  footprintStats: MockFootprintStats
}

export function FootprintSection({ footprintStats }: FootprintSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{'\u6211\u7684\u8DB3\u8FF9'}</h2>
        <span className={styles.sectionCount}>
          {footprintStats.cityCount} {'\u5EA7\u57CE\u5E02'}
        </span>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <strong className={styles.statValue}>
            {footprintStats.cityCount}
          </strong>
          <span className={styles.statLabel}>{'\u57CE\u5E02\u6570\u91CF'}</span>
        </div>
        <div className={styles.statCard}>
          <strong className={styles.statValue}>
            {footprintStats.travelDays}
          </strong>
          <span className={styles.statLabel}>{'\u65C5\u884C\u5929\u6570'}</span>
        </div>
      </div>

      <div className={styles.cityCloud}>
        {footprintStats.cities.map((city) => (
          <span key={city} className={styles.cityChip}>
            {city}
          </span>
        ))}
      </div>
    </section>
  )
}
