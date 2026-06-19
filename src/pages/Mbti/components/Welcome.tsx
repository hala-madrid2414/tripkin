import { PERSONALITIES, WELCOME_ORDER } from '../data'
import styles from '../Mbti.module.less'

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
          TRAVEL&nbsp;MBTI
        </p>
        <h1 className={styles.title}>刷到即同行</h1>
        <p className={styles.subtitle}>
          三道题，测出你的旅行人格
          <br />
          生成一张专属的旅行社交身份卡
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
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onStart}
        >
          <span>开始测试</span>
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={onSkip}
        >
          跳过测试，直接生成形象
        </button>
        <p className={styles.hint}>预计用时 30 秒 · 仅供娱乐</p>
      </div>
    </div>
  )
}
