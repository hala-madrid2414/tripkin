import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  getDestinationResolveHint,
  resolveDestination,
} from '@/utils/destinationResolver'
import { getRegionById, getSpotById } from '@/pages/Map/data/mapData'
import { useTripStore } from '@/store/useTripStore'
import { navigateBackOr } from '@/utils/navigation'
import {
  bottleTypeOptions,
  createBottleMessage,
  defaultBottleImage,
  getBottleListForDestination,
  type BottleMessage,
  type BottleServiceListResult,
  type BottleVisibilityType,
  typeLabels,
} from '@/services/bottleService'
import styles from './Bottle.module.less'

const defaultDestinationId = 'sichuan-chuanxi'
const maxContentLength = 500

type SortBy = 'latest' | 'hottest'
type BottleFilter = 'all' | BottleMessage['type']
type BottlePatch = Pick<
  BottleMessage,
  'isLiked' | 'isCollected' | 'isFollowing' | 'likes'
>

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  )
}

function TagDotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6" />
      <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  )
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" data-filled={filled}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  )
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" data-filled={filled}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
    </svg>
  )
}

function BottleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6M10 3v4.1L6.6 14a4.8 4.8 0 0 0 4.3 7h2.2a4.8 4.8 0 0 0 4.3-7L14 7.1V3" />
      <path d="M8 15.5c1.2-.7 2.2-.7 3.4 0 1 .6 2.1.6 3.6-.2" />
    </svg>
  )
}

const filterOptions: Array<{ key: BottleFilter; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'memory', label: '回忆瓶' },
  { key: 'wish', label: '心愿瓶' },
  { key: 'guide', label: '攻略瓶' },
  { key: 'companion', label: '搭子瓶' },
]

function getDestinationDisplayName(destination: {
  id: string
  name: string
  parentId?: string
  parentName?: string
}) {
  const spot = getSpotById(destination.id)

  if (spot) {
    const region = getRegionById(spot.parentId)
    return region ? `${spot.name} · ${region.name}` : spot.name
  }

  const region = getRegionById(destination.id)

  if (region) {
    return region.name
  }

  return destination.parentName
    ? `${destination.name} · ${destination.parentName}`
    : destination.name
}

function getDestinationShortName(destination: { id: string; name: string }) {
  return getSpotById(destination.id)?.name ?? destination.name
}

function getSourceText(
  source: BottleServiceListResult['source'] | undefined,
  sourceName: string | undefined,
  destinationName: string,
) {
  if (source === 'parent' && sourceName) {
    return `当前目的地暂无专属瓶子，先展示 ${sourceName} 的同地区精选漂流瓶。`
  }

  if (source === 'fallback') {
    return `${destinationName} 暂无专属瓶子，已展示目的地默认灵感。`
  }

  return ''
}

function getQueryDestination(searchParams: URLSearchParams) {
  return (
    searchParams.get('spotId') ||
    searchParams.get('dest') ||
    searchParams.get('regionId') ||
    searchParams.get('spotName') ||
    searchParams.get('regionName')
  )
}

function sortBottles(items: BottleMessage[], sortBy: SortBy) {
  const nextItems = [...items]

  if (sortBy === 'hottest') {
    return nextItems.sort(
      (a, b) => b.likes + b.comments - (a.likes + a.comments),
    )
  }

  return nextItems.sort(
    (a, b) =>
      new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
  )
}

function Bottle() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionDestination = useTripStore((state) => state.destination)
  const setDestination = useTripStore((state) => state.setDestination)
  const action = searchParams.get('action')
  const queryDestination = getQueryDestination(searchParams)
  const currentDestination = useMemo(
    () =>
      resolveDestination({
        queryDest: queryDestination,
        sessionDest: sessionDestination,
        defaultId: defaultDestinationId,
      })!,
    [queryDestination, sessionDestination],
  )
  const [sortBy, setSortBy] = useState<SortBy>('latest')
  const [activeFilter, setActiveFilter] = useState<BottleFilter>('all')
  const [bottlePatches, setBottlePatches] = useState<
    Record<string, Partial<BottlePatch>>
  >({})
  const [bottleRequest, setBottleRequest] = useState<{
    requestKey: string
    result: BottleServiceListResult | null
    error: string
  }>({
    requestKey: '',
    result: null,
    error: '',
  })
  const [selectedBottleId, setSelectedBottleId] = useState<string | null>(null)
  const [manualAddSheetOpen, setManualAddSheetOpen] = useState(false)
  const [dismissedAddKey, setDismissedAddKey] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [selectedBottleType, setSelectedBottleType] =
    useState<BottleVisibilityType>('normal')
  const [formError, setFormError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [refreshSeed, setRefreshSeed] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [imageUploadHint, setImageUploadHint] = useState('')

  const requestKey = `${currentDestination.id}:${refreshSeed}`
  const loading = bottleRequest.requestKey !== requestKey
  const bottleResult = loading ? null : bottleRequest.result
  const loadError = loading ? '' : bottleRequest.error

  useEffect(() => {
    setDestination(currentDestination.id)
  }, [currentDestination.id, setDestination])

  useEffect(() => {
    let cancelled = false

    getBottleListForDestination({
      destId: currentDestination.id,
      destName: currentDestination.name,
      parentId: currentDestination.parentId,
      parentName: currentDestination.parentName,
    })
      .then((result) => {
        if (cancelled) {
          return
        }

        setBottleRequest({
          requestKey,
          result,
          error: '',
        })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setBottleRequest({
          requestKey,
          result: null,
          error:
            error instanceof Error
              ? error.message
              : '漂流瓶列表加载失败，请稍后重试。',
        })
      })

    return () => {
      cancelled = true
    }
  }, [
    currentDestination.id,
    currentDestination.name,
    currentDestination.parentId,
    currentDestination.parentName,
    requestKey,
  ])

  const baseBottles = useMemo(
    () => bottleResult?.items ?? [],
    [bottleResult?.items],
  )

  const bottles = useMemo(() => {
    const patchedBottles = baseBottles.map((bottle) => ({
      ...bottle,
      ...bottlePatches[bottle.id],
    }))
    const visibleBottles =
      activeFilter === 'all'
        ? patchedBottles
        : patchedBottles.filter((bottle) => bottle.type === activeFilter)

    return sortBottles(visibleBottles, sortBy)
  }, [activeFilter, baseBottles, bottlePatches, sortBy])

  const selectedBottle = bottles.find(
    (bottle) => bottle.id === selectedBottleId,
  )
  const sourceText = getSourceText(
    bottleResult?.source,
    bottleResult?.sourceName,
    currentDestination.name,
  )
  const destinationHint = getDestinationResolveHint(currentDestination)
  const addActionKey = `${currentDestination.id}:${action ?? ''}`
  const addSheetOpen =
    manualAddSheetOpen ||
    ((action === 'add' || action === 'throw') &&
      dismissedAddKey !== addActionKey)
  const bottleCount = currentDestination.bottleCount ?? bottles.length
  const formCount = messageText.length
  const destinationDisplayName = getDestinationDisplayName(currentDestination)
  const destinationShortName = getDestinationShortName(currentDestination)

  const showToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 1800)
  }

  const patchBottle = (
    bottleId: string,
    updater: (bottle: BottleMessage) => Partial<BottlePatch>,
  ) => {
    const currentBottle = bottles.find((bottle) => bottle.id === bottleId)

    if (!currentBottle) {
      return
    }

    setBottlePatches((prev) => ({
      ...prev,
      [bottleId]: {
        ...prev[bottleId],
        ...updater(currentBottle),
      },
    }))
  }

  const handleToggleLike = (bottleId: string) => {
    patchBottle(bottleId, (bottle) => ({
      isLiked: !bottle.isLiked,
      likes: bottle.isLiked ? Math.max(0, bottle.likes - 1) : bottle.likes + 1,
    }))
  }

  const handleToggleCollect = (bottleId: string) => {
    patchBottle(bottleId, (bottle) => ({ isCollected: !bottle.isCollected }))
  }

  const handleToggleFollow = (bottleId: string) => {
    patchBottle(bottleId, (bottle) => ({ isFollowing: !bottle.isFollowing }))
  }

  const handleImagePlaceholderClick = () => {
    setImageUploadHint('图片上传暂未接入，最多可上传 9 张。')
  }

  const handleOpenAddSheet = () => {
    setFormError('')
    setManualAddSheetOpen(true)
    setDismissedAddKey(null)
  }

  const handleCloseAddSheet = () => {
    setManualAddSheetOpen(false)
    setDismissedAddKey(addActionKey)
    setFormError('')
    setImageUploadHint('')
  }

  const handleSendBottle = () => {
    const content = messageText.trim()

    if (!content) {
      setFormError('先写下一点想投向这里的旅行故事、心情或攻略。')
      return
    }

    if (content.length > maxContentLength) {
      setFormError(`最多 ${maxContentLength} 字，请再精简一点。`)
      return
    }

    setSubmitting(true)

    createBottleMessage({
      destId: currentDestination.id,
      destName: currentDestination.name,
      parentId: currentDestination.parentId,
      type: 'wish',
      bottleType: selectedBottleType,
      content,
    })
      .then(() => {
        setMessageText('')
        setSelectedBottleType('normal')
        setManualAddSheetOpen(false)
        setDismissedAddKey(addActionKey)
        setImageUploadHint('')
        showToast(`已把漂流瓶投向 ${currentDestination.name}`)
        setRefreshSeed((prev) => prev + 1)
      })
      .catch((error: unknown) => {
        setFormError(
          error instanceof Error
            ? error.message
            : '投出漂流瓶失败，请稍后重试。',
        )
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigateBackOr(navigate, '/map')}
          aria-label="返回"
        >
          ‹
        </button>
        <div className={styles.topTitle}>旅行漂流瓶</div>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => showToast('筛选功能稍后接入')}
        >
          筛选
        </button>
      </header>

      <section
        className={styles.destinationHeader}
        aria-labelledby="bottle-title"
      >
        <div>
          <h1 id="bottle-title">{destinationDisplayName}</h1>
          <p>
            看看这里被留下了哪些关于 {destinationShortName} 的旅行故事 ·{' '}
            {bottleCount} 个漂流瓶
          </p>
        </div>
        <button
          type="button"
          className={styles.headerThrowButton}
          onClick={handleOpenAddSheet}
        >
          <BottleGlyph />
          扔瓶子
        </button>
      </section>

      <div className={styles.sortTabs} role="tablist" aria-label="漂流瓶排序">
        <button
          type="button"
          className={
            sortBy === 'latest' ? styles.sortTabActive : styles.sortTab
          }
          onClick={() => setSortBy('latest')}
          role="tab"
          aria-selected={sortBy === 'latest'}
        >
          最新
        </button>
        <button
          type="button"
          className={
            sortBy === 'hottest' ? styles.sortTabActive : styles.sortTab
          }
          onClick={() => setSortBy('hottest')}
          role="tab"
          aria-selected={sortBy === 'hottest'}
        >
          最热
        </button>
      </div>

      <div className={styles.filterChips} aria-label="漂流瓶类型筛选">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={
              activeFilter === option.key
                ? styles.filterChipActive
                : styles.filterChip
            }
            onClick={() => setActiveFilter(option.key)}
          >
            <BottleGlyph />
            {option.label}
          </button>
        ))}
      </div>

      {(destinationHint || sourceText) && (
        <p className={styles.contextHint}>{destinationHint || sourceText}</p>
      )}

      <section className={styles.listSection} aria-label="漂流瓶列表">
        {loading ? (
          <div className={styles.emptyState}>
            <strong>正在同步漂流瓶</strong>
            <p>正在读取 {currentDestination.name} 的旅行纸条。</p>
          </div>
        ) : loadError ? (
          <div className={styles.emptyState} role="alert">
            <strong>漂流瓶加载失败</strong>
            <p>{loadError}</p>
            <button
              type="button"
              onClick={() => setRefreshSeed((prev) => prev + 1)}
            >
              重新加载
            </button>
          </div>
        ) : bottles.length > 0 ? (
          <div className={styles.bottleList}>
            {bottles.map((bottle) => (
              <article
                className={styles.listCard}
                key={bottle.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedBottleId(bottle.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedBottleId(bottle.id)
                  }
                }}
              >
                <span className={styles.cardAuthorRow}>
                  <img src={bottle.authorAvatar} alt="" aria-hidden="true" />
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitleRow}>
                      <strong>{bottle.authorName}</strong>
                      <i>{typeLabels[bottle.type]}瓶</i>
                    </span>
                    <em>{bottle.authorPersona}</em>
                    <span className={styles.cardTags}>
                      {bottle.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>
                          <TagDotIcon />
                          {tag}
                        </span>
                      ))}
                    </span>
                    <span className={styles.cardMeta}>
                      <span>
                        <PinIcon />
                        <span>目的地：{destinationDisplayName}</span>
                      </span>
                      <span>
                        <CalendarIcon />
                        <span>
                          {bottle.publishTimeText} · 来自 {bottle.authorCity}
                        </span>
                      </span>
                      <span>
                        <NoteIcon />
                        <span>{bottle.summary}</span>
                      </span>
                    </span>
                  </span>
                </span>
                <button
                  type="button"
                  className={styles.cardAction}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedBottleId(bottle.id)
                  }}
                >
                  查看详情
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <strong>这里还没有漂流瓶</strong>
            <p>把第一段旅行心情投向 {currentDestination.name}。</p>
            <button type="button" onClick={handleOpenAddSheet}>
              扔一个漂流瓶
            </button>
          </div>
        )}
      </section>
      {toastMessage && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {selectedBottle && (
        <div className={styles.overlay} role="presentation">
          <section
            className={styles.detailSheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottle-detail-title"
          >
            <div className={styles.dragHandle} aria-hidden="true" />
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedBottleId(null)}
              aria-label="关闭漂流瓶详情"
            >
              ×
            </button>
            <div className={styles.authorRow}>
              <img
                src={selectedBottle.authorAvatar}
                alt=""
                aria-hidden="true"
              />
              <div>
                <h2 id="bottle-detail-title">{selectedBottle.title}</h2>
                <p>
                  来自 {selectedBottle.authorPersona} ·{' '}
                  {selectedBottle.publishTimeText}
                </p>
              </div>
              <button
                type="button"
                className={
                  selectedBottle.isFollowing
                    ? styles.followButtonActive
                    : styles.followButton
                }
                onClick={() => handleToggleFollow(selectedBottle.id)}
              >
                {selectedBottle.isFollowing ? '已关注' : '关注'}
              </button>
            </div>
            <img
              className={styles.detailImage}
              src={selectedBottle.images[0] || defaultBottleImage}
              alt={`${selectedBottle.title} 图片`}
            />
            <p className={styles.detailContent}>{selectedBottle.content}</p>
            <div className={styles.tags}>
              {selectedBottle.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.detailActions}>
              <button type="button" onClick={() => showToast('已发送招呼')}>
                <MessageIcon />
                打招呼
              </button>
              <button
                type="button"
                className={selectedBottle.isLiked ? styles.actionActive : ''}
                onClick={() => handleToggleLike(selectedBottle.id)}
              >
                <HeartIcon filled={selectedBottle.isLiked} />
                {selectedBottle.likes}
              </button>
              <button
                type="button"
                className={
                  selectedBottle.isCollected ? styles.actionActive : ''
                }
                onClick={() => handleToggleCollect(selectedBottle.id)}
              >
                <BookmarkIcon filled={selectedBottle.isCollected} />
                {selectedBottle.isCollected ? '已收藏' : '收藏'}
              </button>
            </div>
          </section>
        </div>
      )}

      {addSheetOpen && (
        <div className={styles.overlay} role="presentation">
          <section
            className={styles.createSheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-bottle-title"
          >
            <div className={styles.dragHandle} aria-hidden="true" />
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseAddSheet}
              aria-label="关闭发布漂流瓶"
            >
              ×
            </button>
            <h2 id="add-bottle-title">扔一个漂流瓶</h2>
            <p className={styles.locationLine}>
              内容将关联到：<strong>{destinationDisplayName}</strong>
              <button
                type="button"
                onClick={() => showToast('更换地点稍后接入')}
              >
                更换地点
              </button>
            </p>
            <label className={styles.textareaWrap}>
              <span className={styles.visuallyHidden}>漂流瓶内容</span>
              <textarea
                value={messageText}
                maxLength={maxContentLength + 20}
                onChange={(event) => {
                  setMessageText(event.target.value)
                  setFormError('')
                }}
                placeholder="写下你的旅行故事、心情、攻略、求助..."
                rows={7}
              />
              <em>
                {Math.min(formCount, maxContentLength)}/{maxContentLength}
              </em>
            </label>
            <section className={styles.imageUploadBlock} aria-label="添加照片">
              <button
                type="button"
                className={styles.imageUploadPlaceholder}
                onClick={handleImagePlaceholderClick}
              >
                <strong>＋</strong>
              </button>
              <p>添加照片（最多9张）</p>
              {imageUploadHint && (
                <p className={styles.uploadHint}>{imageUploadHint}</p>
              )}
            </section>
            <div className={styles.createTypeTitle}>瓶子类型</div>
            <div className={styles.visibilityOptions}>
              {bottleTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    selectedBottleType === option.value
                      ? styles.visibilityOptionActive
                      : styles.visibilityOption
                  }
                  onClick={() => setSelectedBottleType(option.value)}
                >
                  <span className={styles.visibilityGlyph}>
                    <BottleGlyph />
                  </span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </button>
              ))}
            </div>
            {formError && (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            )}
            <button
              className={styles.submitButton}
              type="button"
              onClick={handleSendBottle}
              disabled={submitting}
            >
              <BottleGlyph />
              {submitting ? '投递中...' : '扔出去'}
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default Bottle
