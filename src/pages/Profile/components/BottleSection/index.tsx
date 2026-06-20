import { useNavigate } from 'react-router-dom'
import type { MockBottleStats } from '../../mock'
import styles from './BottleSection.module.less'

interface BottleSectionProps {
  bottleStats: MockBottleStats
}

export function BottleSection({ bottleStats }: BottleSectionProps) {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {'\u6211\u7684\u6F02\u6D41\u74F6'}
        </h2>
        <span className={styles.viewAll} onClick={() => navigate('/bottle')}>
          {'\u67E5\u770B\u5168\u90E8\u2002\u203A'}
        </span>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.statIconSent}`}>
            {'\uD83D\uDCE8'}
          </span>
          <strong className={styles.statValue}>{bottleStats.sent}</strong>
          <span className={styles.statLabel}>{'\u5DF2\u6295\u653E'}</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.statIconReply}`}>
            {'\uD83D\uDCEC'}
          </span>
          <strong className={styles.statValue}>{bottleStats.replies}</strong>
          <span className={styles.statLabel}>{'\u6536\u5230\u56DE\u590D'}</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.statIconSaved}`}>
            {'\uD83D\uDC96'}
          </span>
          <strong className={styles.statValue}>{bottleStats.saved}</strong>
          <span className={styles.statLabel}>{'\u6536\u85CF'}</span>
        </div>
      </div>
    </section>
  )
}
