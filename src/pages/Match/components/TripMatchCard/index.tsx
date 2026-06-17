import styles from '../../Match.module.less'
import type { TripMatchCardData } from '../../types'

interface TripMatchCardProps {
  item: TripMatchCardData
}

function TripMatchCard({ item }: TripMatchCardProps) {
  return (
    <article className={styles.matchCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIdentity}>
          <div className={styles.avatarCircle} aria-hidden="true">
            {item.organizerAvatar}
          </div>
          <div className={styles.cardIdentityCopy}>
            <p className={styles.tripHostLabel}>发起人</p>
            <div className={styles.cardIdentityTop}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <span className={styles.tripOrganizer}>{item.organizerName}</span>
            </div>
          </div>
        </div>
        <button type="button" className={styles.primaryAction}>
          {item.actionLabel}
        </button>
      </div>

      <dl className={styles.infoStack}>
        <div className={styles.infoRow}>
          <dt>地点</dt>
          <dd>{item.location}</dd>
        </div>
        <div className={styles.infoRow}>
          <dt>日期</dt>
          <dd>{item.schedule}</dd>
        </div>
        <div className={styles.infoRow}>
          <dt>方式</dt>
          <dd>{item.travelStyle}</dd>
        </div>
        <div className={styles.infoRow}>
          <dt>人数</dt>
          <dd>{item.groupStatus}</dd>
        </div>
      </dl>

      <p className={styles.cardSummary}>{item.summary}</p>
    </article>
  )
}

export default TripMatchCard
