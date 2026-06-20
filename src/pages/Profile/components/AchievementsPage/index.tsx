import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import type { MockAchievement } from '../../mock'
import styles from './AchievementsPage.module.less'

interface AchievementsPageProps {
  visible: boolean
  items: MockAchievement[]
  onClose: () => void
}

export function AchievementsPage({
  visible,
  items,
  onClose,
}: AchievementsPageProps) {
  if (!visible) return null

  const unlocked = items.filter((a) => a.unlocked).length
  const total = items.length

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>旅行成就</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {/* progress header */}
          <div className={styles.progressHeader}>
            <span className={styles.progressIcon}>🏆</span>
            <span className={styles.progressText}>
              已解锁{' '}
              <strong className={styles.progressCount}>{unlocked}</strong>/
              {total}
            </span>
          </div>

          {/* achievement list */}
          <div className={styles.list}>
            {items.map((a) => (
              <div
                key={a.title}
                className={a.unlocked ? styles.card : styles.cardLocked}
              >
                <div
                  className={
                    a.unlocked ? styles.cardIcon : styles.cardIconLocked
                  }
                >
                  {a.unlocked ? a.icon : '🔒'}
                </div>
                <div className={styles.cardInfo}>
                  <span
                    className={
                      a.unlocked ? styles.cardTitle : styles.cardTitleLocked
                    }
                  >
                    {a.title}
                  </span>
                  <span className={styles.cardSubtitle}>{a.subtitle}</span>
                </div>
                {a.unlocked && (
                  <span className={styles.unlockedBadge}>已解锁</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
