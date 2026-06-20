import { Toast } from 'antd-mobile'
import type { MockCompanion } from '../../mock'
import styles from './CompanionSection.module.less'

interface CompanionSectionProps {
  companions: MockCompanion[]
}

export function CompanionSection({ companions }: CompanionSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {'\u6211\u7684\u642D\u5B50'}
          <span className={styles.sectionCount}> {companions.length}</span>
        </h2>
        <span
          className={styles.viewAll}
          onClick={() =>
            Toast.show({
              content:
                '\u67E5\u770B\u5168\u90E8\u529F\u80FD\u5C1A\u672A\u5F00\u653E',
              duration: 1500,
            })
          }
        >
          {'\u67E5\u770B\u5168\u90E8\u2002\u203A'}
        </span>
      </header>

      <div className={styles.companionList}>
        {companions.map((c) => (
          <article
            key={c.name}
            className={styles.companionCard}
            onClick={() =>
              Toast.show({
                content: `\u67E5\u770B ${c.name} \u7684\u4E3B\u9875`,
                duration: 1500,
              })
            }
          >
            <span className={styles.companionAvatar}>{c.avatarEmoji}</span>
            <div className={styles.companionInfo}>
              <h3 className={styles.companionName}>{c.name}</h3>
              <p className={styles.companionMeta}>
                {c.mbti} {'\u00B7'} {c.lastInteraction}
              </p>
            </div>
            <span className={styles.companionArrow}>{'\u203A'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
