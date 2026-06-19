import { Popup, Toast } from 'antd-mobile'
import type { MatchChip } from '../../types'
import MatchIcon from '../MatchIcon'
import styles from './FilterSheet.module.less'

interface FilterSheetProps {
  visible: boolean
  chips: MatchChip[]
  onClose: () => void
}

function FilterSheet({ visible, chips, onClose }: FilterSheetProps) {
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      bodyClassName={styles.popupBody}
      position="bottom"
    >
      <section className={styles.sheet} aria-label="筛选偏好">
        <div className={styles.dragBar} aria-hidden="true" />
        <h2 className={styles.title}>筛选偏好</h2>
        <p className={styles.subtitle}>
          按参考图保留移动端轻筛选，本阶段仅做 Demo 反馈。
        </p>

        <div className={styles.chips}>
          {chips.map((chip) => (
            <button key={chip.id} type="button" className={styles.chip}>
              <MatchIcon name={chip.icon} />
              {chip.label}
            </button>
          ))}
        </div>

        <footer className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            取消
          </button>
          <button
            type="button"
            className={styles.apply}
            onClick={() => {
              Toast.show({ content: '已应用筛选偏好' })
              onClose()
            }}
          >
            应用筛选
          </button>
        </footer>
      </section>
    </Popup>
  )
}

export default FilterSheet
