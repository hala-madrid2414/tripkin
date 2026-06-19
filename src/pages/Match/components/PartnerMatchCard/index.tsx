import type { PartnerMatchCardData } from '../../types'
import MatchIcon from '../MatchIcon'
import styles from './PartnerMatchCard.module.less'

interface PartnerMatchCardProps {
  item: PartnerMatchCardData
  onOpen: (item: PartnerMatchCardData) => void
}

function PartnerMatchCard({ item, onOpen }: PartnerMatchCardProps) {
  return (
    <article className={styles.card} onClick={() => onOpen(item)}>
      <span className={styles.avatarWrap}>
        <img
          className={styles.avatar}
          src={item.avatarUrl}
          alt={item.avatarAlt}
        />
        {item.online ? (
          <span className={styles.online} aria-hidden="true" />
        ) : null}
      </span>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2 className={styles.name}>{item.name}</h2>
          <span className={styles.mbti}>{item.mbti}</span>
        </div>

        <div className={styles.tags}>
          {item.interests.map((interest) => (
            <span key={interest.label} className={styles.tag}>
              <MatchIcon name={interest.icon} />
              {interest.label}
            </span>
          ))}
        </div>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <MatchIcon name="pin" />
            <span>目的地：{item.destination}</span>
          </p>
          <p className={styles.metaRow}>
            <MatchIcon name="calendar" />
            <span>出发时间：{item.departure}</span>
          </p>
        </div>

        <p className={styles.summary}>{item.summary}</p>
      </div>

      <button
        type="button"
        className={styles.action}
        onClick={(event) => {
          event.stopPropagation()
          onOpen(item)
        }}
      >
        看看TA
      </button>
    </article>
  )
}

export default PartnerMatchCard
