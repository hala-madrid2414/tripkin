import type { ReactNode } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import styles from './PageTopBar.module.less'

type PageTopBarProps = {
  title: ReactNode
  backLabel: string
  onBack: () => void
  rightAction?: ReactNode
}

function PageTopBar({
  title,
  backLabel,
  onBack,
  rightAction,
}: PageTopBarProps) {
  return (
    <header className={styles.topBar}>
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
        aria-label={backLabel}
      >
        <LeftOutline aria-hidden="true" />
      </button>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightSlot}>{rightAction}</div>
    </header>
  )
}

export default PageTopBar
