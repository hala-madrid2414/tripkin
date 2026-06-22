import { useState } from 'react'
import { Input, TextArea, Toast } from 'antd-mobile'
import { CameraOutline } from 'antd-mobile-icons'
import BaseBottomSheet from '@/components/BaseBottomSheet'
import styles from './EditProfileSheet.module.less'

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
  if (!visible) return null

  return (
    <EditProfileSheetContent
      key={`${nickname}:${tagline}`}
      nickname={nickname}
      tagline={tagline}
      onClose={onClose}
      onSave={onSave}
    />
  )
}

function EditProfileSheetContent({
  nickname,
  tagline,
  onClose,
  onSave,
}: Omit<EditProfileSheetProps, 'visible'>) {
  const [editNickname, setEditNickname] = useState(nickname)
  const [editTagline, setEditTagline] = useState(tagline)

  return (
    <BaseBottomSheet
      labelledBy="edit-profile-title"
      closeLabel="关闭编辑旅行身份"
      onClose={onClose}
      variant="tall"
      className={styles.sheet}
    >
      <div className={styles.topBar}>
        <h2 id="edit-profile-title" className={styles.topTitle}>
          编辑旅行身份
        </h2>
        <button
          type="button"
          className={styles.saveButton}
          onClick={() => {
            onSave({ nickname: editNickname, tagline: editTagline })
            Toast.show({ content: '保存成功', duration: 1200 })
          }}
        >
          保存
        </button>
      </div>

      <div className={styles.body}>
        <button
          type="button"
          className={styles.avatarArea}
          onClick={() =>
            Toast.show({ content: '头像功能尚未开放', duration: 1500 })
          }
        >
          <span className={styles.avatarPreview}>
            <CameraOutline aria-hidden="true" />
          </span>
          <span className={styles.avatarHint}>点击更换头像</span>
        </button>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="edit-nickname">
            昵称
          </label>
          <Input
            id="edit-nickname"
            value={editNickname}
            onChange={setEditNickname}
            placeholder="输入你的旅行昵称"
            maxLength={16}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="edit-tagline">
            旅行宣言
          </label>
          <TextArea
            id="edit-tagline"
            value={editTagline}
            onChange={setEditTagline}
            placeholder="写一句话介绍你的旅行态度..."
            maxLength={60}
            rows={3}
            showCount={false}
          />
          <span className={styles.charCount}>{editTagline.length}/60</span>
        </div>

        <button type="button" className={styles.cancelBtn} onClick={onClose}>
          取消
        </button>

        <p className={styles.note}>
          人格标签由 MBTI 测试自动生成，暂不支持手动修改
        </p>
      </div>
    </BaseBottomSheet>
  )
}
