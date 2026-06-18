import type { MatchChip } from '../../types'
import MatchIcon from '../MatchIcon'
import styles from './MatchFilterChips.module.less'

interface MatchFilterChipsProps {
  items: MatchChip[]
}

function MatchFilterChips({ items }: MatchFilterChipsProps) {
  return (
    <section className={styles.panel} aria-label="筛选标签">
      <div className={styles.scroller}>
        {items.map((item) => (
          <button key={item.id} type="button" className={styles.chip}>
            <MatchIcon name={item.icon} />
            {item.label}
            {item.dropdown ? <span className={styles.chevron} /> : null}
          </button>
        ))}
      </div>
    </section>
  )
}

export default MatchFilterChips
