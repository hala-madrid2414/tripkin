import { Tabs } from 'antd-mobile'
import type { MatchMode, MatchModeOption } from '../../types'
import styles from './MatchModeTabs.module.less'

interface MatchModeTabsProps {
  activeMode: MatchMode
  options: MatchModeOption[]
  onChange: (mode: MatchMode) => void
}

function MatchModeTabs({ activeMode, options, onChange }: MatchModeTabsProps) {
  return (
    <section className={styles.wrap} aria-label="匹配模式切换">
      <Tabs
        activeKey={activeMode}
        onChange={(key) => onChange(key as MatchMode)}
        stretch
      >
        {options.map((option) => (
          <Tabs.Tab key={option.key} title={option.label} />
        ))}
      </Tabs>
    </section>
  )
}

export default MatchModeTabs
