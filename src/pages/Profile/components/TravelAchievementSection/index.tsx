import { Toast } from 'antd-mobile'
import type { MockAchievement } from '../../mock'
import styles from './TravelAchievementSection.module.less'

interface TravelAchievementSectionProps {
  achievements: MockAchievement[]
}

export function TravelAchievementSection({
  achievements,
}: TravelAchievementSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🏆</span>
          旅行成就
        </h2>
        <span className={styles.badgeCount}>
          {achievements.filter((a) => a.unlocked).length}/{achievements.length}
        </span>
      </header>

      <div className={styles.grid}>
        {achievements.map((a) => (
          <div
            key={a.title}
            className={`${styles.item} ${a.unlocked ? styles.itemUnlocked : styles.itemLocked}`}
            onClick={() =>
              Toast.show({
                content: a.unlocked
                  ? `${a.title} · ${a.subtitle}`
                  : '未解锁成就',
                duration: 1500,
              })
            }
          >
            <span className={styles.itemIcon}>{a.icon}</span>
            <span className={styles.itemTitle}>{a.title}</span>
            <span className={styles.itemSubtitle}>{a.subtitle}</span>
            {!a.unlocked && <span className={styles.lockIcon}>🔒</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
