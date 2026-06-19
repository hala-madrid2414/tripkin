import type { MutableRefObject, PointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMatchStore, type MatchMode } from '@/store/useMatchStore'
import { getRegionTripCount } from '../data/mapData'
import type { Region } from '../types'
import { BottleIcon, CloseIcon } from './MapIcons'
import styles from '../Map.module.less'

interface SheetDragState {
  startY: number
  moved: boolean
}

type SheetDragRef = MutableRefObject<SheetDragState | null>
type RegionCardLevel = 'compact' | 'detail' | 'full'

interface BottomRegionCardProps {
  region: Region | null
  level: RegionCardLevel
  onToggleLevel: () => void
  onAdvanceLevel: () => void
  onRetreatLevel: () => void
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

function BottomRegionCard({
  region,
  level,
  onToggleLevel,
  onAdvanceLevel,
  onRetreatLevel,
  dragRef,
  onHandlePointerDown,
  onHandlePointerMove,
  onHandlePointerUp,
  onHandlePointerCancel,
  onClose,
  onThrowBottle,
}: BottomRegionCardProps) {
  const navigate = useNavigate()
  const setMode = useMatchStore((state) => state.setMode)
  const setEntryContext = useMatchStore((state) => state.setEntryContext)

  if (!region) {
    return null
  }

  const featuredSpots = region.spots.slice(0, 2)
  const subtitle = region.tags.slice(0, 2).join(' · ')
  const encodedRegionId = encodeURIComponent(region.id)
  const className =
    level === 'full'
      ? styles.regionCardFull
      : level === 'detail'
        ? styles.regionCardDetail
        : styles.regionCardCompact
  const isFull = level === 'full'
  const tripCount = getRegionTripCount(region)

  const handleMatchLinkClick = (mode: MatchMode) => {
    setMode(mode)
    setEntryContext({
      source: 'map',
      targetType: 'region',
      regionId: region.id,
      destinationName: region.name,
    })
    navigate(`/match?tab=${mode}&dest=${encodedRegionId}`)
  }

  return (
    <section className={className} aria-label={`${region.name}旅行信息`}>
      <button
        type="button"
        className={styles.cardHandle}
        onPointerDown={(event) => onHandlePointerDown(dragRef, event)}
        onPointerMove={(event) => onHandlePointerMove(dragRef, event)}
        onPointerUp={(event) =>
          onHandlePointerUp(
            dragRef,
            event,
            onAdvanceLevel,
            onRetreatLevel,
            onToggleLevel,
          )
        }
        onPointerCancel={() => onHandlePointerCancel(dragRef)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onToggleLevel()
          }
        }}
        aria-label={level === 'compact' ? '展开卡片' : '调整卡片高度'}
      >
        <span />
      </button>

      <button
        type="button"
        className={styles.closeCard}
        onClick={onClose}
        aria-label="关闭地区卡片"
      >
        <CloseIcon />
      </button>

      <div className={styles.cardTitleRow}>
        <div>
          <p className={styles.cardEyebrow}>目的地灵感</p>
          <h2>
            {region.name}
            <small>{subtitle}</small>
          </h2>
        </div>
        <span className={styles.ratingBadge}>
          推荐指数 {region.rating.toFixed(1)}/5
        </span>
      </div>

      <p className={styles.cardStats}>
        这里有 {region.bottleCount} 个漂流瓶，{region.companionCount}{' '}
        人正在找搭子，{tripCount} 个可加入行程
      </p>

      <div className={styles.tagRow}>
        {region.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <p className={styles.cardDescription}>{region.recommendReason}</p>

      <dl className={styles.cardMeta}>
        <div>
          <dt>热门</dt>
          <dd>{featuredSpots.map((spot) => spot.name).join(' / ')}</dd>
        </div>
        <div>
          <dt>热度</dt>
          <dd>
            {region.hotspotLevel} 级 · {region.spots.length} 个目的地
          </dd>
        </div>
      </dl>

      <div className={styles.cardActions}>
        <Link to={`/bottle?dest=${encodedRegionId}`}>查看漂流瓶</Link>
        <button type="button" onClick={() => handleMatchLinkClick('partner')}>
          查看旅行搭子
        </button>
        <button type="button" onClick={() => handleMatchLinkClick('trip')}>
          查看可加入行程
        </button>
      </div>

      <button
        type="button"
        className={styles.cardBottleAction}
        onClick={() => onThrowBottle(region.id)}
      >
        <BottleIcon />
        发布漂流瓶
      </button>

      {isFull && (
        <div className={styles.expandedPlaceholder}>
          <p>{region.name}热门目的地</p>
          <div className={styles.regionSpotList}>
            {region.spots.map((spot) => (
              <div key={spot.id}>
                <strong>{spot.name}</strong>
                <span>
                  {spot.bottleCount} 个漂流瓶 · {spot.companionCount} 人找搭子
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default BottomRegionCard
