import { Link } from 'react-router-dom'
import type { MutableRefObject, PointerEvent } from 'react'
import type { Region, Spot } from '../types'
import { BottleIcon, CloseIcon } from './MapIcons'
import styles from '../Map.module.less'

interface SheetDragState {
  startY: number
  moved: boolean
}

type SheetDragRef = MutableRefObject<SheetDragState | null>

interface BottomSpotCardProps {
  spot: Spot | null
  region: Region | null
  expanded: boolean
  onToggleExpanded: () => void
  onExpand: () => void
  onCollapse: () => void
  dragRef: SheetDragRef
  onHandlePointerDown: (
    dragRef: SheetDragRef,
    event: PointerEvent<HTMLButtonElement>,
  ) => void
  onHandlePointerMove: (
    dragRef: SheetDragRef,
    event: PointerEvent<HTMLButtonElement>,
  ) => void
  onHandlePointerUp: (
    dragRef: SheetDragRef,
    event: PointerEvent<HTMLButtonElement>,
    onExpand: () => void,
    onCollapse: () => void,
    onTap: () => void,
  ) => void
  onHandlePointerCancel: (dragRef: SheetDragRef) => void
  onClose: () => void
  onThrowBottle: (destinationId: string) => void
}

function BottomSpotCard({
  spot,
  region,
  expanded,
  onToggleExpanded,
  onExpand,
  onCollapse,
  dragRef,
  onHandlePointerDown,
  onHandlePointerMove,
  onHandlePointerUp,
  onHandlePointerCancel,
  onClose,
  onThrowBottle,
}: BottomSpotCardProps) {
  if (!spot || !region) {
    return null
  }

  return (
    <section
      className={expanded ? styles.bottomCardExpanded : styles.bottomCard}
      aria-label={`${spot.name}旅行信息`}
    >
      <button
        type="button"
        className={styles.cardHandle}
        onPointerDown={(event) => onHandlePointerDown(dragRef, event)}
        onPointerMove={(event) => onHandlePointerMove(dragRef, event)}
        onPointerUp={(event) =>
          onHandlePointerUp(
            dragRef,
            event,
            onExpand,
            onCollapse,
            onToggleExpanded,
          )
        }
        onPointerCancel={() => onHandlePointerCancel(dragRef)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onToggleExpanded()
          }
        }}
        aria-label={expanded ? '收起卡片' : '展开卡片'}
      >
        <span />
      </button>

      <button
        type="button"
        className={styles.closeCard}
        onClick={onClose}
        aria-label="关闭地点卡片"
      >
        <CloseIcon />
      </button>

      <div className={styles.cardTitleRow}>
        <div>
          <p className={styles.cardEyebrow}>{region.name}</p>
          <h2>
            {spot.name}
            <small>{spot.subtitle}</small>
          </h2>
        </div>
        <span className={styles.ratingBadge}>{spot.rating.toFixed(1)}</span>
      </div>

      <p className={styles.cardStats}>
        这里有 {spot.bottleCount} 个漂流瓶，{spot.companionCount} 人正在找搭子
      </p>

      <div className={styles.tagRow}>
        {spot.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <p className={styles.cardDescription}>{spot.recommendReason}</p>

      <dl className={styles.cardMeta}>
        <div>
          <dt>适合</dt>
          <dd>{spot.suitableFor.slice(0, 2).join(' / ')}</dd>
        </div>
        <div>
          <dt>建议</dt>
          <dd>
            {spot.bestSeason} · {spot.duration}
          </dd>
        </div>
      </dl>

      <div className={styles.cardActions}>
        <Link to={`/bottle?dest=${encodeURIComponent(spot.id)}`}>
          查看漂流瓶
        </Link>
        <Link to="/match">查看旅行搭子</Link>
        <Link to="/match">查看行程匹配</Link>
      </div>

      <button
        type="button"
        className={styles.cardBottleAction}
        onClick={() => onThrowBottle(spot.id)}
      >
        <BottleIcon />
        扔一个漂流瓶
      </button>

      {expanded && (
        <div className={styles.expandedPlaceholder}>
          <p>上拉内容预留区</p>
          <span>后续可承接路线片段、热度标签和同行申请记录。</span>
        </div>
      )}
    </section>
  )
}

export default BottomSpotCard
