import { layerOptions } from '../data/mapData'
import type { LayerType } from '../types'
import { BottleIcon, CloseIcon, LayersIcon, PeopleIcon } from './MapIcons'
import styles from '../Map.module.less'

interface LayerSheetProps {
  open: boolean
  activeLayer: LayerType
  onSelect: (layer: LayerType) => void
  onClose: () => void
}

function LayerSheet({ open, activeLayer, onSelect, onClose }: LayerSheetProps) {
  return (
    <div className={open ? styles.sheetOpen : styles.sheetClosed}>
      <button
        type="button"
        className={styles.sheetMask}
        onClick={onClose}
        aria-label="关闭图层选择"
      />
      <section className={styles.layerSheet} aria-label="图层选择">
        <div className={styles.sheetHandle} />
        <div className={styles.sheetHeader}>
          <h2>图层选择</h2>
          <button type="button" onClick={onClose} aria-label="关闭">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.layerList}>
          {layerOptions.map((option) => (
            <button
              type="button"
              key={option.key}
              className={
                option.key === activeLayer
                  ? styles.layerOptionActive
                  : styles.layerOption
              }
              onClick={() => onSelect(option.key)}
            >
              <span className={styles.layerIconWrap} data-layer={option.key}>
                {option.key === 'companion' ? (
                  <PeopleIcon />
                ) : option.key === 'hotspot' ? (
                  <LayersIcon />
                ) : (
                  <BottleIcon />
                )}
              </span>
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
              <span className={styles.checkDot} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LayerSheet
