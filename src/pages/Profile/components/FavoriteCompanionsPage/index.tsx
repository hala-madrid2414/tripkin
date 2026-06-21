import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import type { MockFavoriteCompanion } from '../../mockFavorites'
import styles from './FavoriteCompanionsPage.module.less'

interface FavoriteCompanionsPageProps {
  visible: boolean
  items: MockFavoriteCompanion[]
  onClose: () => void
}

export function FavoriteCompanionsPage({
  visible,
  items,
  onClose,
}: FavoriteCompanionsPageProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>收藏搭子</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyEmoji}>🤝</span>
              <p className={styles.emptyText}>暂无收藏内容</p>
              <p className={styles.emptyHint}>
                遇到心仪的旅行搭子，收藏起来方便联系
              </p>
            </div>
          ) : (
            <div className={styles.list}>
              {items.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.avatar}>
                      <span className={styles.avatarEmoji}>
                        {item.avatarEmoji}
                      </span>
                    </div>
                    <div className={styles.nameBlock}>
                      <h3 className={styles.nickname}>{item.nickname}</h3>
                      <div className={styles.badges}>
                        <span className={styles.mbtiBadge}>{item.mbti}</span>
                        <span className={styles.labelBadge}>
                          {item.personalityLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tagRow}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardBottom}>
                    <span className={styles.style}>{item.travelStyle}</span>
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
