import { BottleIcon, HomeIcon, LocateIcon } from './MapIcons'
import styles from '../Map.module.less'

interface MapControlsProps {
  onLocate: () => void
  onReset: () => void
  onThrowBottle: () => void
}

function MapControls({ onLocate, onReset, onThrowBottle }: MapControlsProps) {
  return (
    <>
      <div className={styles.leftControls} aria-label="地图控制">
        <button type="button" onClick={onLocate}>
          <LocateIcon />
          <span>定位</span>
        </button>
        <button type="button" onClick={onReset}>
          <HomeIcon />
          <span>全国</span>
        </button>
      </div>

      <button
        type="button"
        className={styles.throwButton}
        onClick={onThrowBottle}
      >
        <BottleIcon />
        <span>扔瓶子</span>
      </button>
    </>
  )
}

export default MapControls
