import { Link } from 'react-router-dom'
import MatchIcon from '../MatchIcon'
import type { MatchMode } from '../../types'
import styles from './MatchTopBar.module.less'

interface MatchTopBarProps {
  mode: MatchMode
  title: string
  placeTitle: string
  placeMeta: string
  onFilterClick: () => void
}

function MatchTopBar({
  mode,
  title,
  placeTitle,
  placeMeta,
  onFilterClick,
}: MatchTopBarProps) {
  return (
    <header className={styles.header} data-mode={mode}>
      <div className={styles.mapLayer} aria-hidden="true">
        <span className={styles.mapLineOne} />
        <span className={styles.mapLineTwo} />
        {mode === 'trip' ? <span className={styles.routePin} /> : null}
      </div>

      <nav className={styles.nav} aria-label="匹配页导航">
        <Link to="/bottle" className={styles.backLink} aria-label="返回">
          <MatchIcon name="back" />
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <button
          type="button"
          className={styles.filterButton}
          onClick={onFilterClick}
        >
          筛选
          <MatchIcon name="filter" className={styles.filterIcon} />
        </button>
      </nav>

      <div className={styles.place}>
        <p className={styles.placeTitle}>{placeTitle}</p>
        <p className={styles.placeMeta}>{placeMeta}</p>
      </div>
    </header>
  )
}

export default MatchTopBar
