import styles from '../../Match.module.less'
import type { MatchMode, MatchModeOption } from '../../types'

interface MatchModeSwitchProps {
  activeMode: MatchMode
  options: MatchModeOption[]
  onChange: (mode: MatchMode) => void
}

function MatchModeSwitch({
  activeMode,
  options,
  onChange,
}: MatchModeSwitchProps) {
  return (
    <section className={styles.modePanel} aria-label="匹配模式切换">
      <div className={styles.modeSwitch}>
        {options.map((option) => {
          const isActive = option.key === activeMode

          return (
            <button
              key={option.key}
              type="button"
              className={isActive ? styles.modeButtonActive : styles.modeButton}
              onClick={() => onChange(option.key)}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default MatchModeSwitch
