import { useState } from 'react'
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
        <h2 className={styles.sectionTitle}>{'\u8BBE\u7F6E\u4E2D\u5FC3'}</h2>
      </header>

      <div className={styles.settingList}>
        {settingsItems.map((item) => (
          <div
            key={item.title}
            className={styles.settingItem}
            onClick={() => handleClick(item.title)}
          >
            <span className={styles.settingIcon}>{item.icon}</span>
            <span className={styles.settingLabel}>{item.title}</span>
            <span className={styles.settingArrow}>{'\u203A'}</span>
          </div>
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
