import type { ReactNode } from 'react'
import { Popup } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import styles from './BaseBottomSheet.module.less'

type BaseBottomSheetProps = {
  labelledBy: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
  variant?: 'default' | 'tall'
  className?: string
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function BaseBottomSheet({
  labelledBy,
  closeLabel,
  onClose,
  children,
  variant = 'default',
  className,
}: BaseBottomSheetProps) {
  return (
    <Popup
      visible
      position="bottom"
      onMaskClick={onClose}
      closeOnSwipe
      bodyClassName={cx(
        styles.popupBody,
        variant === 'tall' && styles.popupBodyTall,
      )}
    >
      <section
        className={cx(styles.sheet, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className={styles.dragHandle} aria-hidden="true" />
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <CloseOutline aria-hidden="true" />
        </button>
        {children}
      </section>
    </Popup>
  )
}

export default BaseBottomSheet
