import { useState } from 'react'
import { createPortal } from 'react-dom'
import { IconBack } from '../IconBack'
import styles from './NotificationSettingsPage.module.less'

interface ToggleSetting {
  key: string
  label: string
  value: boolean
}

const INITIAL_NOTIF: ToggleSetting[] = [
  { key: 'companionMsg', label: '搭子消息通知', value: true },
  { key: 'bottleReply', label: '漂流瓶回复通知', value: true },
  { key: 'system', label: '系统通知', value: false },
  { key: 'event', label: '活动通知', value: true },
]

interface NotificationSettingsPageProps {
  visible: boolean
  onClose: () => void
}

export function NotificationSettingsPage({
  visible,
  onClose,
}: NotificationSettingsPageProps) {
  const [toggles, setToggles] = useState(INITIAL_NOTIF)
  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'通知设置'}</span>
          <div className={styles.topSpacer} />
        </div>
        <div className={styles.body}>
          {toggles.map((item) => (
            <div key={item.key} className={styles.toggleRow}>
              <span className={styles.toggleLabel}>{item.label}</span>
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
