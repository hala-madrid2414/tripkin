import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import type { MockFavoriteBottle } from '../../mockFavorites'
import styles from './FavoriteBottlesPage.module.less'

interface FavoriteBottlesPageProps {
  visible: boolean
  items: MockFavoriteBottle[]
  onClose: () => void
}

export function FavoriteBottlesPage({
  visible,
  items,
  onClose,
}: FavoriteBottlesPageProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>收藏漂流瓶</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji}>🌊</span>
              <p className={styles.emptyText}>暂无收藏内容</p>
              <p className={styles.emptyHint}>
                发现打动你的漂流瓶，可以收藏起来慢慢回味
              </p>
            </div>
          ) : (
            <div className={styles.list}>
              {items.map((item) => (
                <div key={item.id} className={styles.card}>
                  <span className={styles.cityTag}>{item.cityTag}</span>
                  <h3 className={styles.bottleTitle}>{item.title}</h3>
                  <p className={styles.snippet}>{item.snippet}</p>
                  <span className={styles.time}>
                    {'收藏于 ' + item.collectedAt}
                  </span>
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
