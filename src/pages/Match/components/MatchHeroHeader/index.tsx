import { Link } from 'react-router-dom'
import styles from '../../Match.module.less'
import type { MatchMode } from '../../types'

interface MatchHeroHeaderProps {
  mode: MatchMode
  title: string
  subtitle: string
  helperText: string
}

function MatchHeroHeader({
  mode,
  title,
  subtitle,
  helperText,
}: MatchHeroHeaderProps) {
  const modeLabel = mode === 'partner' ? '搭子匹配' : '行程匹配'

  return (
    <header className={styles.hero}>
      <div className={styles.heroDecor} aria-hidden="true">
        <span className={styles.heroOrbitPrimary} />
        <span className={styles.heroOrbitSecondary} />
        <span className={styles.heroRouteGlow} />
      </div>
      <div className={styles.heroTopBar}>
        <Link to="/bottle" className={styles.backLink}>
          返回
        </Link>
        <button type="button" className={styles.ghostAction}>
          筛选偏好
        </button>
      </div>
      <div className={styles.heroMeta}>
        <span className={styles.destinationBadge}>川西 · 6 月下旬出发</span>
        <span className={styles.modeBadge}>{modeLabel}</span>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.heroEyebrow}>TripKin Match</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <p className={styles.heroHelper}>{helperText}</p>
      </div>
    </header>
  )
}

export default MatchHeroHeader
