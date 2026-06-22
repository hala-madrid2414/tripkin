import type { ReactNode } from 'react'
import styles from './EmptyState.module.less'

type EmptyStateProps = {
  title: ReactNode
  description: ReactNode
  actionLabel?: string
  onAction?: () => void
  role?: 'status' | 'alert'
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  role = 'status',
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState} role={role}>
      <strong>{title}</strong>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
