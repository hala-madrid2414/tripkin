import type { TripMatchCardData } from '../../types'
import GradientVisual from '../GradientVisual'
import MatchIcon from '../MatchIcon'
import styles from './TripMatchCard.module.less'

interface TripMatchCardProps {
  item: TripMatchCardData
  onJoin: (item: TripMatchCardData) => void
}

function TripMatchCard({ item, onJoin }: TripMatchCardProps) {
  return (
    <article className={styles.card}>
      <GradientVisual
        tone={item.imageTone}
        mark={item.organizerName}
        online
        className={styles.image}
      />
      <div className={styles.body}>
        <div className={styles.top}>
          <h2 className={styles.title}>{item.title}</h2>
          <button
            type="button"
            className={styles.action}
            onClick={() => onJoin(item)}
          >
            {item.actionLabel}
          </button>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <MatchIcon name="pin" />
            {item.location}
          </span>
          <span className={styles.metaItem}>
            <MatchIcon name="calendar" />
            {item.dateRange}
          </span>
          <span className={styles.metaItem}>
            <MatchIcon name="car" />
            {item.transport}
          </span>
        </div>

        <p className={styles.people}>
          <MatchIcon name="people" />
          {item.people}
        </p>

        <p className={styles.summary}>{item.summary}</p>
      </div>
    </article>
  )
}

export default TripMatchCard
