import BottomNav from '@/components/BottomNav'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  getDestinationResolveHint,
  resolveDestination,
} from '@/utils/destinationResolver'
import { useTripStore } from '@/store/useTripStore'
import {
  bottleTypeOptions,
  createBottleMessage,
  defaultBottleImage,
  getBottleListForDestination,
  type BottleMessage,
  type BottleType,
  type BottleServiceListResult,
  typeLabels,
} from '@/services/bottleService'
import styles from './Bottle.module.less'

const defaultDestinationId = 'yunnan'

function getSourceText(
  source: BottleServiceListResult['source'],
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

function Bottle() {
  const [searchParams] = useSearchParams()
  const sessionDestination = useTripStore((state) => state.destination)
  const rawDest = searchParams.get('dest')
  const action = searchParams.get('action')
  const currentDestination = useMemo(
    () =>
      resolveDestination({
        queryDest: rawDest,
        sessionDest: sessionDestination,
        defaultId: defaultDestinationId,
      })!,
    [rawDest, sessionDestination],
  )
  const [selectedBottle, setSelectedBottle] = useState<BottleMessage | null>(
    null,
  )
  const [bottleRequest, setBottleRequest] = useState<{
    requestKey: string
    result: BottleServiceListResult | null
    error: string
  }>({
    requestKey: '',
    result: null,
    error: '',
  })
  const [manualAddSheetOpen, setManualAddSheetOpen] = useState(false)
  const [dismissedAddKey, setDismissedAddKey] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [selectedType, setSelectedType] = useState<BottleType>('story')
  const [formError, setFormError] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [refreshSeed, setRefreshSeed] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [collectedBottleIds, setCollectedBottleIds] = useState<string[]>([])
  const [imageUploadHint, setImageUploadHint] = useState('')

  const requestKey = `${currentDestination.id}:${refreshSeed}`
  const loading = bottleRequest.requestKey !== requestKey
  const bottleResult = loading ? null : bottleRequest.result
  const loadError = loading ? '' : bottleRequest.error
  const bottles = bottleResult?.items ?? []
  const sourceText = bottleResult
    ? getSourceText(
        bottleResult.source,
        bottleResult.sourceName,
        currentDestination.name,
      )
    : ''
  const destinationHint = getDestinationResolveHint(currentDestination)
  const matchPath = `/match?dest=${encodeURIComponent(currentDestination.id)}`
  const addActionKey = `${currentDestination.id}:${action ?? ''}`
  const addSheetOpen =
    manualAddSheetOpen || (action === 'add' && dismissedAddKey !== addActionKey)
  const hasOpenSheet = selectedBottle !== null || addSheetOpen
  const countText =
    typeof currentDestination.bottleCount === 'number'
      ? `${currentDestination.name} 共有 ${currentDestination.bottleCount} 个漂流瓶，精选展示 ${bottles.length} 条`
      : `${currentDestination.name} 漂流瓶精选`

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

  const handleToggleCollect = (bottleId: string) => {
    setCollectedBottleIds((prev) =>
      prev.includes(bottleId)
        ? prev.filter((collectedId) => collectedId !== bottleId)
        : [...prev, bottleId],
    )
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
  }

  const handleSendBottle = () => {
    const content = messageText.trim()

    if (!content) {
      setFormError('先写下一点想投向这里的旅行心愿。')
      return
    }

    setSubmitting(true)

    createBottleMessage({
      destId: currentDestination.id,
      destName: currentDestination.name,
      type: selectedType,
      content,
    })
      .then(() => {
        setMessageText('')
        setSelectedType('story')
        setManualAddSheetOpen(false)
        setDismissedAddKey(addActionKey)
        setFeedbackMessage(`已把漂流瓶投向 ${currentDestination.name}。`)
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
      <section className={styles.hero} aria-labelledby="bottle-title">
        <div>
          <p className={styles.route}>正在漂向：{currentDestination.name}</p>
          <h1 id="bottle-title">{currentDestination.name}的旅行漂流瓶</h1>
          <p className={styles.description}>
            捞起同一个目的地的旅行心意，也把自己的故事投向可能同路的人。
          </p>
          {currentDestination.parentName && (
            <p className={styles.parentName}>{currentDestination.parentName}</p>
          )}
        </div>
        <span className={styles.mapBadge} aria-hidden="true">
          <svg
            className={styles.bottleIconSvg}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M9 3h6M10 3v4.1L6.6 14a4.8 4.8 0 0 0 4.3 7h2.2a4.8 4.8 0 0 0 4.3-7L14 7.1V3" />
            <path d="M8 15.5c1.2-.7 2.2-.7 3.4 0 1 .6 2.1.6 3.6-.2" />
          </svg>
        </span>
      </section>

      <nav className={styles.heroActions} aria-label="漂流瓶页面导航">
        <Link to="/map" className={styles.mapLink}>
          返回地图
        </Link>
        <Link to={matchPath} className={styles.matchLink}>
          找同目的地搭子
        </Link>
      </nav>

      {destinationHint && <p className={styles.hint}>{destinationHint}</p>}
      {loadError && (
        <p className={styles.feedback} role="alert">
          {loadError}
        </p>
      )}
      {feedbackMessage && (
        <p className={styles.feedback} role="status">
          {feedbackMessage}
        </p>
      )}

      <section className={styles.summaryCard} aria-label="目的地漂流瓶概览">
        <div>
          <p className={styles.label}>当前目的地</p>
          <h2>{currentDestination.name}</h2>
          <span>{countText}</span>
        </div>
      </section>

      {sourceText && <p className={styles.sourceNote}>{sourceText}</p>}

      <button
        className={styles.primaryButton}
        type="button"
        onClick={handleOpenAddSheet}
      >
        扔一个漂流瓶
      </button>

      <section className={styles.listSection} aria-labelledby="recent-title">
        <div className={styles.sectionTitle}>
          <p className={styles.label}>目的地漂流瓶</p>
          <h2 id="recent-title">只看 {currentDestination.name} 的旅行纸条</h2>
        </div>

        <div className={styles.bottleList}>
          {loading ? (
            <p className={styles.sourceNote}>正在同步当前目的地的漂流瓶...</p>
          ) : bottles.length === 0 ? (
            <p className={styles.sourceNote}>
              当前目的地还没有可展示的漂流瓶，先投出第一条吧。
            </p>
          ) : (
            bottles.map((bottle) => (
              <button
                className={styles.listCard}
                key={bottle.id}
                type="button"
                onClick={() => setSelectedBottle(bottle)}
              >
                <span className={styles.listThumb}>
                  <img
                    src={bottle.imageUrl || defaultBottleImage}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.listBody}>
                  <span className={styles.listMeta}>
                    <strong>{bottle.from}</strong>
                    <em>{bottle.createdAt}</em>
                  </span>
                  <span className={styles.typePill}>
                    {typeLabels[bottle.type]}
                  </span>
                  <span className={styles.listContent}>{bottle.content}</span>
                  <span className={styles.tags}>
                    {bottle.tags.map((tag) => (
                      <i key={tag}>#{tag}</i>
                    ))}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      {!hasOpenSheet && <BottomNav destinationId={currentDestination.id} />}

      {selectedBottle && (
        <div className={styles.overlay} role="presentation">
          <section
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottle-detail-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedBottle(null)}
              aria-label="关闭漂流瓶详情"
            >
              x
            </button>
            <p className={styles.label}>漂流瓶详情</p>
            <h2 id="bottle-detail-title">{selectedBottle.destinationName}</h2>
            <p className={styles.detailContent}>{selectedBottle.content}</p>
            <button
              type="button"
              className={
                collectedBottleIds.includes(selectedBottle.id)
                  ? styles.collectButtonActive
                  : styles.collectButton
              }
              onClick={() => handleToggleCollect(selectedBottle.id)}
              aria-pressed={collectedBottleIds.includes(selectedBottle.id)}
            >
              {collectedBottleIds.includes(selectedBottle.id)
                ? '已收藏'
                : '收藏'}
            </button>
            <dl className={styles.detailMeta}>
              <div>
                <dt>类型</dt>
                <dd>{typeLabels[selectedBottle.type]}</dd>
              </div>
              <div>
                <dt>来自</dt>
                <dd>{selectedBottle.from}</dd>
              </div>
              <div>
                <dt>目的地</dt>
                <dd>{currentDestination.name}</dd>
              </div>
              <div>
                <dt>时间</dt>
                <dd>{selectedBottle.createdAt}</dd>
              </div>
            </dl>
            <div className={styles.tags}>
              {selectedBottle.tags.map((tag) => (
                <i key={tag}>#{tag}</i>
              ))}
            </div>
          </section>
        </div>
      )}

      {addSheetOpen && (
        <div className={styles.overlay} role="presentation">
          <section
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-bottle-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseAddSheet}
              aria-label="关闭添加漂流瓶"
            >
              x
            </button>
            <p className={styles.label}>投向 {currentDestination.name}</p>
            <h2 id="add-bottle-title">扔一个漂流瓶</h2>
            <div className={styles.typeOptions} aria-label="瓶子类型">
              {bottleTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    selectedType === option.value ? styles.typeActive : ''
                  }
                  onClick={() => setSelectedType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <label className={styles.field}>
              <span>漂流瓶内容</span>
              <textarea
                value={messageText}
                onChange={(event) => {
                  setMessageText(event.target.value)
                  setFormError('')
                }}
                placeholder={`写下想投向 ${currentDestination.name} 的旅行故事`}
                rows={5}
              />
            </label>
            <section
              className={styles.imageUploadBlock}
              aria-label="图片上传占位"
            >
              <div className={styles.imageUploadHeader}>
                <span>图片</span>
                <em>0/9</em>
              </div>
              <button
                type="button"
                className={styles.imageUploadPlaceholder}
                onClick={handleImagePlaceholderClick}
              >
                <strong>+ 添加图片</strong>
                <span>最多上传 9 张</span>
              </button>
              <p>当前为静态演示，暂不接入真实上传。</p>
              {imageUploadHint && (
                <p className={styles.uploadHint} role="status">
                  {imageUploadHint}
                </p>
              )}
            </section>
            {formError && (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            )}
            <button
              className={styles.primaryButton}
              type="button"
              onClick={handleSendBottle}
              disabled={submitting}
            >
              {submitting ? '投递中...' : '投出漂流瓶'}
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default Bottle
