import { Toast } from 'antd-mobile'
import type { MockSettingsItem } from '../../mock'
import styles from './SettingSection.module.less'

interface SettingSectionProps {
  settingsItems: MockSettingsItem[]
}

export function SettingSection({ settingsItems }: SettingSectionProps) {
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
            onClick={() =>
              Toast.show({
                content: `${item.title} \u529F\u80FD\u5C1A\u672A\u5F00\u653E`,
                duration: 1500,
              })
            }
          >
            <span className={styles.settingIcon}>{item.icon}</span>
            <span className={styles.settingLabel}>{item.title}</span>
            <span className={styles.settingArrow}>{'\u203A'}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
