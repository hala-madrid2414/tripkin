import styles from './GradientVisual.module.less'

interface GradientVisualProps {
  tone: string
  mark?: string
  className?: string
  online?: boolean
}

function GradientVisual({
  tone,
  mark,
  className,
  online,
}: GradientVisualProps) {
  return (
    <span
      className={`${styles.visual} ${styles[tone] ?? ''} ${className ?? ''}`}
    >
      <span className={styles.mark}>{mark}</span>
      {online ? <span className={styles.online} aria-hidden="true" /> : null}
    </span>
  )
}

export default GradientVisual
