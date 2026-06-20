import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import styles from './AboutPage.module.less'

function IconBack(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

interface AboutPageProps {
  visible: boolean
  onClose: () => void
}

export function AboutPage({ visible, onClose }: AboutPageProps) {
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'关于我们'}</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {/* logo */}
          <div className={styles.logoArea}>
            <div className={styles.logo}>🌍</div>
            <h2 className={styles.brand}>{'TripKin'}</h2>
            <p className={styles.slogan}>{'刷到即同行'}</p>
            <span className={styles.version}>{'v1.0.0'}</span>
          </div>

          <div className={styles.divider} />

          {/* intro */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.blockTitle}>{'产品简介'}</h3>
            <p className={styles.blockText}>
              {
                'TripKin 是一款以旅行人格为核心的社交旅行应用。通过 MBTI 旅行人格测试，'
              }
              {'为你匹配旅行风格契合的搭子，发现适合你人格的目的地，'}
              {'并用漂流瓶记录与分享旅途中的故事。'}
            </p>
          </div>

          {/* contact */}
          <div className={styles.linkRow}>
            <span>{'联系我们'}</span>
            <span className={styles.linkArrow}>{'›'}</span>
          </div>

          {/* terms */}
          <div className={styles.linkRow}>
            <span>{'用户协议'}</span>
            <span className={styles.linkArrow}>{'›'}</span>
          </div>

          {/* privacy policy */}
          <div className={styles.linkRow}>
            <span>{'隐私政策'}</span>
            <span className={styles.linkArrow}>{'›'}</span>
          </div>

          <p className={styles.footer}>{'© 2026 TripKin Team'}</p>
        </div>
      </div>
    </div>
  )
  return createPortal(content, document.body)
}
