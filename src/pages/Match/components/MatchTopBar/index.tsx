import { Link } from 'react-router-dom'
import MatchIcon from '../MatchIcon'
import styles from './MatchTopBar.module.less'

interface MatchTopBarProps {
  title: string
  placeTitle: string
  placeMeta: string
  onFilterClick: () => void
}

function MatchTopBar({
  title,
  placeTitle,
  placeMeta,
  onFilterClick,
}: MatchTopBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.mapLayer} aria-hidden="true">
        <span className={styles.mapLineOne} />
        <span className={styles.mapLineTwo} />
        <span className={styles.routePath} />
        <span className={styles.routePin} />
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
