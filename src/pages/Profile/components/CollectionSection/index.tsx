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
        <h2 className={styles.sectionTitle}>{'\u6536\u85CF\u5939'}</h2>
        <span
          className={styles.viewAll}
          onClick={() =>
            Toast.show({
              content:
                '\u67E5\u770B\u5168\u90E8\u6536\u85CF\u529F\u80FD\u5C1A\u672A\u5F00\u653E',
              duration: 1500,
            })
          }
        >
          {'\u67E5\u770B\u5168\u90E8\u2002\u203A'}
        </span>
      </header>

      <div className={styles.collectionGrid}>
        <div
          className={styles.collectionCard}
          onClick={() =>
            Toast.show({
              content: '\u67E5\u770B\u6536\u85CF\u7684\u76EE\u7684\u5730',
              duration: 1500,
            })
          }
        >
          <span className={styles.collectionIcon}>{'\uD83D\uDDFA\uFE0F'}</span>
          <strong className={styles.collectionValue}>
            {collectionStats.destinations}
          </strong>
          <span className={styles.collectionLabel}>
            {'\u76EE\u7684\u5730\u6536\u85CF'}
          </span>
        </div>
        <div
          className={styles.collectionCard}
          onClick={() =>
            Toast.show({
              content: '\u67E5\u770B\u6536\u85CF\u7684\u6F02\u6D41\u74F6',
              duration: 1500,
            })
          }
        >
          <span className={styles.collectionIcon}>{'\uD83C\uDF0A'}</span>
          <strong className={styles.collectionValue}>
            {collectionStats.bottles}
          </strong>
          <span className={styles.collectionLabel}>
            {'\u6F02\u6D41\u74F6\u6536\u85CF'}
          </span>
        </div>
        <div
          className={styles.collectionCard}
          onClick={() =>
            Toast.show({
              content: '\u67E5\u770B\u6536\u85CF\u7684\u62DB\u52DF',
              duration: 1500,
            })
          }
        >
          <span className={styles.collectionIcon}>{'\uD83E\uDD1D'}</span>
          <strong className={styles.collectionValue}>
            {collectionStats.companions}
          </strong>
          <span className={styles.collectionLabel}>
            {'\u62DB\u52DF\u6536\u85CF'}
          </span>
        </div>
      </div>
    </section>
  )
}
