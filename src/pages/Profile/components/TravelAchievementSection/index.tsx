import { useState } from 'react'
import type { MockAchievement } from '../../mock'
import { AchievementsPage } from '../AchievementsPage'
import styles from './TravelAchievementSection.module.less'

interface TravelAchievementSectionProps {
  achievements: MockAchievement[]
}

export function TravelAchievementSection({
  achievements,
}: TravelAchievementSectionProps) {
  const [open, setOpen] = useState(false)
  const unlocked = achievements.filter((a) => a.unlocked).length

  return (
    <section className={styles.section}>
      <div className={styles.clickable} onClick={() => setOpen(true)}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🏆</span>
            旅行成就
          </h2>
          <span className={styles.badgeCount}>
            {unlocked}/{achievements.length}
          </span>
        </header>

        <div className={styles.grid}>
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`${styles.item} ${a.unlocked ? styles.itemUnlocked : styles.itemLocked}`}
            >
              <span className={styles.itemIcon}>{a.icon}</span>
              <span className={styles.itemTitle}>{a.title}</span>
              <span className={styles.itemSubtitle}>{a.subtitle}</span>
              {!a.unlocked && <span className={styles.lockIcon}>🔒</span>}
            </div>
          ))}
        </div>
      </div>

      <AchievementsPage
        visible={open}
        items={achievements}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}
