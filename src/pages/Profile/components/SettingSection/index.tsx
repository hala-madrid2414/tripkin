import { useState, type ReactNode } from 'react'
import {
  BellOutline,
  InformationCircleOutline,
  LockOutline,
  RightOutline,
  SetOutline,
} from 'antd-mobile-icons'
import type { MockSettingsItem } from '../../mock'
import { AccountSettingsPage } from '../AccountSettingsPage'
import { PrivacySettingsPage } from '../PrivacySettingsPage'
import { NotificationSettingsPage } from '../NotificationSettingsPage'
import { AboutPage } from '../AboutPage'
import styles from './SettingSection.module.less'

interface SettingSectionProps {
  settingsItems: MockSettingsItem[]
  nickname: string
  tagline: string
  onSaveAccount: (nickname: string, tagline: string) => void
}

const PAGE_MAP: Record<string, string> = {
  账号设置: 'account',
  隐私设置: 'privacy',
  通知设置: 'notification',
  关于我们: 'about',
}

const ICON_MAP: Record<string, ReactNode> = {
  账号设置: <SetOutline aria-hidden="true" />,
  隐私设置: <LockOutline aria-hidden="true" />,
  通知设置: <BellOutline aria-hidden="true" />,
  关于我们: <InformationCircleOutline aria-hidden="true" />,
}

export function SettingSection({
  settingsItems,
  nickname,
  tagline,
  onSaveAccount,
}: SettingSectionProps) {
  const [openPage, setOpenPage] = useState<string | null>(null)

  const handleClick = (title: string) => {
    const key = PAGE_MAP[title]
    if (key) setOpenPage(key)
  }

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>设置中心</h2>
      </header>

      <div className={styles.settingList}>
        {settingsItems.map((item) => (
          <button
            type="button"
            key={item.title}
            className={styles.settingItem}
            onClick={() => handleClick(item.title)}
          >
            <span className={styles.settingIcon}>
              {ICON_MAP[item.title] ?? item.icon}
            </span>
            <span className={styles.settingLabel}>{item.title}</span>
            <RightOutline className={styles.settingArrow} aria-hidden="true" />
          </button>
        ))}
      </div>

      <AccountSettingsPage
        visible={openPage === 'account'}
        nickname={nickname}
        tagline={tagline}
        onSave={onSaveAccount}
        onClose={() => setOpenPage(null)}
      />
      <PrivacySettingsPage
        visible={openPage === 'privacy'}
        onClose={() => setOpenPage(null)}
      />
      <NotificationSettingsPage
        visible={openPage === 'notification'}
        onClose={() => setOpenPage(null)}
      />
      <AboutPage
        visible={openPage === 'about'}
        onClose={() => setOpenPage(null)}
      />
    </section>
  )
}
