import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import styles from './PrivacySettingsPage.module.less'

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

interface ToggleSetting {
  key: string
  label: string
  desc: string
  value: boolean
}

const INITIAL_PRIVACY: ToggleSetting[] = [
  {
    key: 'profileVisible',
    label: '个人主页可见性',
    desc: '允许他人查看你的旅行主页',
    value: true,
  },
  {
    key: 'identityCard',
    label: '允许陌生人查看身份卡',
    desc: '未匹配用户可以看到你的旅行身份',
    value: true,
  },
  {
    key: 'footprint',
    label: '允许陌生人查看足迹',
    desc: '公开你探索过的城市与旅行记录',
    value: false,
  },
  {
    key: 'recommend',
    label: '允许被推荐到搭子广场',
    desc: '系统会根据你的旅行人格为你匹配搭子',
    value: true,
  },
]

interface PrivacySettingsPageProps {
  visible: boolean
  onClose: () => void
}

export function PrivacySettingsPage({
  visible,
  onClose,
}: PrivacySettingsPageProps) {
  const [toggles, setToggles] = useState(INITIAL_PRIVACY)

  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'隐私设置'}</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {toggles.map((item) => (
            <div key={item.key} className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleLabel}>{item.label}</span>
                <span className={styles.toggleDesc}>{item.desc}</span>
              </div>
              <div
                className={`${styles.switch} ${item.value ? styles.switchOn : styles.switchOff}`}
                onClick={() =>
                  setToggles((prev) =>
                    prev.map((t) =>
                      t.key === item.key ? { ...t, value: !t.value } : t,
                    ),
                  )
                }
              >
                <div
                  className={`${styles.switchKnob} ${item.value ? styles.switchKnobOn : styles.switchKnobOff}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
