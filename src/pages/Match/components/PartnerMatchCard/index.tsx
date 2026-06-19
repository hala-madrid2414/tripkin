import type { PartnerMatchCardData } from '../../types'
import GradientVisual from '../GradientVisual'
import MatchIcon from '../MatchIcon'
import styles from './PartnerMatchCard.module.less'

interface PartnerMatchCardProps {
  item: PartnerMatchCardData
  onOpen: (item: PartnerMatchCardData) => void
}

function PartnerMatchCard({ item, onOpen }: PartnerMatchCardProps) {
  const isPrimary = item.actionLabel === '加好友'

  return (
    <article className={styles.card} onClick={() => onOpen(item)}>
      <GradientVisual
        tone={item.avatarTone}
        mark={item.avatarMark}
        online={item.online}
        className={styles.avatar}
      />
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
        className={`${styles.action} ${isPrimary ? styles.actionPrimary : ''}`}
        onClick={(event) => {
          event.stopPropagation()
          onOpen(item)
        }}
      >
        {item.actionLabel}
      </button>
    </article>
  )
}

export default PartnerMatchCard
