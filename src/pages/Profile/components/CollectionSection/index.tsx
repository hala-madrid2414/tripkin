import { Toast } from 'antd-mobile'
import type { MockCollectionStats } from '../../mock'
import styles from './CollectionSection.module.less'

interface CollectionSectionProps {
  collectionStats: MockCollectionStats
}

export function CollectionSection({ collectionStats }: CollectionSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>📁</span>
          我的收藏
        </h2>
      </header>

      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={() =>
            Toast.show({ content: '查看收藏的目的地', duration: 1500 })
          }
        >
          <span className={styles.cardIcon}>🗺️</span>
          <strong className={styles.cardValue}>
            {collectionStats.destinations}
          </strong>
          <span className={styles.cardLabel}>目的地</span>
        </div>
        <div
          className={styles.card}
          onClick={() =>
            Toast.show({ content: '查看收藏的漂流瓶', duration: 1500 })
          }
        >
          <span className={styles.cardIcon}>🌊</span>
          <strong className={styles.cardValue}>
            {collectionStats.bottles}
          </strong>
          <span className={styles.cardLabel}>漂流瓶</span>
        </div>
        <div
          className={styles.card}
          onClick={() =>
            Toast.show({ content: '查看收藏的搭子', duration: 1500 })
          }
        >
          <span className={styles.cardIcon}>🤝</span>
          <strong className={styles.cardValue}>
            {collectionStats.companions}
          </strong>
          <span className={styles.cardLabel}>搭子</span>
        </div>
      </div>
    </section>
  )
}
