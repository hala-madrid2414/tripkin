import styles from '../../Match.module.less'
import type { PartnerMatchCardData } from '../../types'

interface PartnerMatchCardProps {
  item: PartnerMatchCardData
}

function PartnerMatchCard({ item }: PartnerMatchCardProps) {
  return (
    <article className={styles.matchCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIdentity}>
          <div className={styles.avatarCircle} aria-hidden="true">
            {item.avatarLabel}
          </div>
          <div className={styles.cardIdentityCopy}>
            <div className={styles.cardIdentityTop}>
              <h2 className={styles.cardTitle}>{item.name}</h2>
              <span className={styles.scoreBadge}>{item.matchScore}</span>
            </div>
            <p className={styles.personalityTag}>{item.personality}</p>
          </div>
        </div>
        <button type="button" className={styles.primaryAction}>
          {item.actionLabel}
        </button>
      </div>

      <div className={styles.tagGroup}>
        {item.interests.map((interest) => (
          <span key={interest} className={styles.softTag}>
            {interest}
          </span>
        ))}
      </div>

      <dl className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <dt>目的地</dt>
          <dd>{item.destination}</dd>
        </div>
        <div className={styles.infoItem}>
          <dt>出发时间</dt>
          <dd>{item.departure}</dd>
        </div>
      </dl>

      <p className={styles.cardSummary}>{item.summary}</p>
    </article>
  )
}

export default PartnerMatchCard
