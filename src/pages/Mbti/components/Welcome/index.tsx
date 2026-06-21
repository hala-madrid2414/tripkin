import { Toast } from 'antd-mobile'
import { useTripStore } from '@/store/useTripStore'
import illustrationSrc from '../../assets/welcom-illustration.png'
import sharedStyles from '../shared.module.less'
import styles from './Welcome.module.less'

const FEATURES = [
  { icon: '🧭', label: '了解自我' },
  { icon: '✨', label: '发现灵感' },
  { icon: '👥', label: '找同路人' },
  { icon: '🗺️', label: '匹配行程' },
]

interface WelcomeProps {
  onStart: () => void
  onViewResult: () => void
  onSkip: () => void
}

export function Welcome({ onStart, onViewResult, onSkip }: WelcomeProps) {
  const hasResult = useTripStore((s) => s.personaId !== null)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      Toast.show({ content: '链接已复制' })
    } catch {
      Toast.show({ content: '复制失败' })
    }
  }

  return (
    <div className={styles.welcome}>
      {/* 顶部导航 */}
      <div className={styles.topNav}>
        <span />
        <button
          type="button"
          className={styles.shareBtn}
          onClick={handleShare}
          aria-label="分享"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {/* 标题区域 */}
      <div className={styles.hero}>
        <h1 className={styles.title}>
          测测你的
          <br />
          旅行MBTI
        </h1>
        <p className={styles.subtitle}>
          探索你的旅行性格
          <br />
          解锁专属旅行灵感
        </p>
      </div>

      {/* 插画 */}
      <div className={styles.illustration}>
        <img
          className={styles.illustrationImg}
          src={illustrationSrc}
          alt="旅行MBTI插画"
        />
      </div>

      {/* 四个功能图标 */}
      <div className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.label} className={styles.featureItem}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <span className={styles.featureLabel}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* 按钮区域 */}
      <div className={styles.footer}>
        <button
          type="button"
          className={`${sharedStyles.btn} ${sharedStyles.btnPrimary}`}
          onClick={onStart}
        >
          <span>✨ 开始测试</span>
        </button>
        {hasResult && (
          <button
            type="button"
            className={`${sharedStyles.btn} ${sharedStyles.btnGhost}`}
            onClick={onViewResult}
          >
            查看我的结果
          </button>
        )}
        <button type="button" className={styles.textLink} onClick={onSkip}>
          去找搭子
        </button>
      </div>
    </div>
  )
}
