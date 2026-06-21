import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import type { MockFavoriteDestination } from '../../mockFavorites'
import styles from './FavoriteDestinationsPage.module.less'

interface FavoriteDestinationsPageProps {
  visible: boolean
  items: MockFavoriteDestination[]
  onClose: () => void
}

export function FavoriteDestinationsPage({
  visible,
  items,
  onClose,
}: FavoriteDestinationsPageProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>收藏目的地</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji}>🗺️</span>
              <p className={styles.emptyText}>暂无收藏内容</p>
              <p className={styles.emptyHint}>
                探索目的地时，可以收藏你喜欢的地方
              </p>
            </div>
          ) : (
            <div className={styles.list}>
              {items.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardCover}>
                    <span className={styles.coverEmoji}>{item.coverEmoji}</span>
                  </div>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cityName}>{item.cityName}</h3>
                    <p className={styles.reason}>{item.reason}</p>
                    <span className={styles.time}>
                      {'收藏于 ' + item.collectedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
