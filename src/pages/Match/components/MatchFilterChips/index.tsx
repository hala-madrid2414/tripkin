import styles from '../../Match.module.less'
import type { MatchChip } from '../../types'

interface MatchFilterChipsProps {
  items: MatchChip[]
}

function MatchFilterChips({ items }: MatchFilterChipsProps) {
  return (
    <section className={styles.chipsPanel} aria-label="筛选标签">
      <div className={styles.chipsScroller}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.highlighted ? styles.chipActive : styles.chip}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default MatchFilterChips
