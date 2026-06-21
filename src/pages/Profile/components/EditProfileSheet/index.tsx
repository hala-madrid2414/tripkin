import { useState, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from 'antd-mobile'
import styles from './EditProfileSheet.module.less'

function IconClose(): ReactElement {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconCamera(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export interface EditProfileData {
  nickname: string
  tagline: string
}

interface EditProfileSheetProps {
  visible: boolean
  nickname: string
  tagline: string
  onClose: () => void
  onSave: (data: EditProfileData) => void
}

export function EditProfileSheet({
  visible,
  nickname,
  tagline,
  onClose,
  onSave,
}: EditProfileSheetProps) {
  const [editNickname, setEditNickname] = useState(nickname)
  const [editTagline, setEditTagline] = useState(tagline)

  if (!visible) return null

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* ---- drag handle ---- */}
        <div className={styles.handleWrap}>
          <div className={styles.handle} />
        </div>

        {/* ---- top bar ---- */}
        <div className={styles.topBar}>
          <button type="button" className={styles.topBtn} onClick={onClose}>
            <IconClose />
          </button>
          <span className={styles.topTitle}>{'编辑旅行身份'}</span>
          <button
            type="button"
            className={`${styles.topBtn} ${styles.topBtnSave}`}
            onClick={() => {
              onSave({ nickname: editNickname, tagline: editTagline })
              Toast.show({ content: '保存成功', duration: 1200 })
            }}
          >
            {'保存'}
          </button>
        </div>

        {/* ---- body ---- */}
        <div className={styles.body}>
          {/* avatar area */}
          <div
            className={styles.avatarArea}
            onClick={() =>
              Toast.show({ content: '头像功能尚未开放', duration: 1500 })
            }
          >
            <div className={styles.avatarPreview}>
              <IconCamera />
            </div>
            <span className={styles.avatarHint}>{'点击更换头像'}</span>
          </div>

          {/* nickname */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-nickname">
              {'昵称'}
            </label>
            <input
              id="edit-nickname"
              className={styles.input}
              type="text"
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              placeholder={'输入你的旅行昵称'}
              maxLength={16}
            />
          </div>

          {/* tagline */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-tagline">
              {'旅行宣言'}
            </label>
            <textarea
              id="edit-tagline"
              className={styles.textarea}
              value={editTagline}
              onChange={(e) => setEditTagline(e.target.value)}
              placeholder={'写一句话介绍你的旅行态度...'}
              maxLength={60}
              rows={3}
            />
            <span className={styles.charCount}>{editTagline.length}/60</span>
          </div>

          {/* bottom cancel */}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              {'取消'}
            </button>
          </div>

          {/* info note */}
          <p className={styles.note}>
            {'人格标签由 MBTI 测试自动生成，暂不支持手动修改'}
          </p>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
