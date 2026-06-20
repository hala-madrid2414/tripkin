import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from 'antd-mobile'
import type { ReactElement } from 'react'
import styles from './AccountSettingsPage.module.less'

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

const MOCK_ACCOUNT = {
  phone: '138****5678',
  email: 'traveler@tripkin.app',
}

interface AccountSettingsPageProps {
  visible: boolean
  nickname: string
  tagline: string
  onClose: () => void
}

export function AccountSettingsPage({
  visible,
  nickname,
  tagline,
  onClose,
}: AccountSettingsPageProps) {
  const [showNickname, setShowNickname] = useState(nickname)
  const [showTagline, setShowTagline] = useState(tagline)

  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.backBtn} onClick={onClose}>
            <IconBack />
          </button>
          <span className={styles.topTitle}>{'账号设置'}</span>
          <div className={styles.topSpacer} />
        </div>

        <div className={styles.body}>
          {/* avatar */}
          <div
            className={styles.avatarRow}
            onClick={() =>
              Toast.show({ content: '头像功能尚未开放', duration: 1500 })
            }
          >
            <div className={styles.avatarPreview}>{'🌍'}</div>
            <div className={styles.avatarText}>
              <span className={styles.avatarLabel}>{'头像'}</span>
              <span className={styles.avatarHint}>{'点击更换'}</span>
            </div>
            <span className={styles.rowArrow}>{'›'}</span>
          </div>

          {/* nickname */}
          <div className={styles.fieldRow}>
            <span className={styles.fieldLabel}>{'昵称'}</span>
            <input
              className={styles.fieldInput}
              value={showNickname}
              onChange={(e) => setShowNickname(e.target.value)}
              maxLength={16}
            />
          </div>

          {/* tagline */}
          <div className={styles.fieldRow}>
            <span className={styles.fieldLabel}>{'旅行宣言'}</span>
            <input
              className={styles.fieldInput}
              value={showTagline}
              onChange={(e) => setShowTagline(e.target.value)}
              maxLength={60}
              placeholder={'写一句话...'}
            />
          </div>

          {/* phone */}
          <div className={styles.infoRow}>
            <span className={styles.fieldLabel}>{'手机号'}</span>
            <span className={styles.infoValue}>{MOCK_ACCOUNT.phone}</span>
          </div>

          {/* email */}
          <div className={styles.infoRow}>
            <span className={styles.fieldLabel}>{'邮箱'}</span>
            <span className={styles.infoValue}>{MOCK_ACCOUNT.email}</span>
          </div>

          {/* save */}
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => {
              Toast.show({ content: '保存成功', duration: 1200 })
              onClose()
            }}
          >
            {'保存资料'}
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
