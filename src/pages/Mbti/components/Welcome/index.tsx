import { PERSONALITIES, WELCOME_ORDER } from '../../data'
import sharedStyles from '../shared.module.less'
import styles from './Welcome.module.less'

interface WelcomeProps {
  destination: string
  onStart: () => void
  onSkip: () => void
}

export function Welcome({ destination, onStart, onSkip }: WelcomeProps) {
  return (
    <div className={styles.welcome}>
      <div className={styles.topbar}>
        <span className={styles.pulse} />
        <span className={styles.topbarText}>
          正在为你匹配去往<strong>{destination}</strong>的同行人…
        </span>
      </div>

      <div className={styles.hero}>
        <p className={styles.kicker}>
          <span className={styles.kickerLine} />
          TRAVEL&nbsp;PERSONA
        </p>
        <h1 className={styles.title}>刷到即同行</h1>
        <p className={styles.subtitle}>
          8 道题，生成你的旅行偏好画像
          <br />
          形成一张可解释的旅行身份卡
        </p>

        <div className={styles.orbit}>
          {WELCOME_ORDER.map((id) => {
            const p = PERSONALITIES[id]
            return (
              <span key={id} className={styles.chip}>
                <span
                  className={styles.chipDot}
                  style={{ background: p.accent }}
                >
                  {p.emoji}
                </span>
                {p.titleCn}
              </span>
            )
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={`${sharedStyles.btn} ${sharedStyles.btnPrimary}`}
          onClick={onStart}
        >
          <span>开始测试</span>
        </button>
        <button
          type="button"
          className={`${sharedStyles.btn} ${sharedStyles.btnGhost}`}
          onClick={onSkip}
        >
          稍后再测，先浏览地图
        </button>
        <p className={styles.hint}>
          预计用时 1 分钟 · 结果用于解释偏好，不等同心理学 MBTI
        </p>
      </div>
    </div>
  )
}
