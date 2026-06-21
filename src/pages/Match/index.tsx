import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMatchStore } from '@/store/useMatchStore'
import { useTripStore } from '@/store/useTripStore'
import {
  getDestinationResolveHint,
  resolveDestination,
} from '@/utils/destinationResolver'
import { navigateBackOr } from '@/utils/navigation'
import {
  getMatchContent,
  getMatchModes,
  getMatchResults,
} from '@/services/matchService'
import FilterSheet from './components/FilterSheet'
import JoinTripSheet from './components/JoinTripSheet'
import MatchFilterChips from './components/MatchFilterChips'
import MatchModeTabs from './components/MatchModeTabs'
import MatchTopBar from './components/MatchTopBar'
import PartnerMatchCard from './components/PartnerMatchCard'
import ProfileSheet from './components/ProfileSheet'
import TripMatchCard from './components/TripMatchCard'
import styles from './Match.module.less'
import type {
  MatchMode,
  MatchViewItem,
  MatchViewModel,
  PartnerMatchCardData,
  TripMatchCardData,
} from './types'

function Match() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activeMode = useMatchStore((state) => state.mode)
  const setActiveMode = useMatchStore((state) => state.setMode)
  const entryContext = useMatchStore((state) => state.entryContext)
  const destination = useTripStore((state) => state.destination)
  const setDestination = useTripStore((state) => state.setDestination)
  const [filterVisible, setFilterVisible] = useState(false)
  const [selectedPartner, setSelectedPartner] =
    useState<PartnerMatchCardData | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<TripMatchCardData | null>(
    null,
  )
  const [matchRequest, setMatchRequest] = useState<{
    requestKey: string
    viewModel: MatchViewModel<MatchViewItem> | null
    error: string
  }>({
    requestKey: '',
    viewModel: null,
    error: '',
  })

  useEffect(() => {
    const tab = searchParams.get('tab')
    const queryMode: MatchMode | null =
      tab === 'partner' || tab === 'trip' ? tab : null

    if (queryMode && queryMode !== activeMode) {
      setActiveMode(queryMode)
    }
  }, [activeMode, searchParams, setActiveMode])

  const currentContent = getMatchContent(activeMode)
  const modeOptions = getMatchModes()
  const currentDestination = useMemo(
    () =>
      resolveDestination({
        queryDest: searchParams.get('dest'),
        sessionDest: destination,
        defaultId: 'xizang',
      })!,
    [destination, searchParams],
  )
  const destinationHint = getDestinationResolveHint(currentDestination)
  const placeTitle = currentDestination
    ? `${currentDestination.name}${
        currentDestination.parentName
          ? ` · ${currentDestination.parentName}`
          : ''
      }`
    : (entryContext?.destinationName ??
      currentContent.placeTitle ??
      destination)
  const requestKey = `${activeMode}:${currentDestination.id}`
  const loading = matchRequest.requestKey !== requestKey
  const viewModel = loading ? null : matchRequest.viewModel
  const loadError = loading ? '' : matchRequest.error
  const placeMeta = viewModel?.metaText ?? currentContent.placeMeta
  const stateNote = loadError || viewModel?.noteText || ''

  useEffect(() => {
    setDestination(currentDestination.id)
  }, [currentDestination.id, setDestination])

  useEffect(() => {
    let cancelled = false

    getMatchResults({
      mode: activeMode,
      destinationId: currentDestination.id,
      destinationName: currentDestination.name,
    })
      .then((result) => {
        if (cancelled) {
          return
        }

        setMatchRequest({
          requestKey,
          viewModel: result,
          error: '',
        })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setMatchRequest({
          requestKey,
          viewModel: null,
          error:
            error instanceof Error
              ? error.message
              : '匹配结果加载失败，请稍后重试。',
        })
      })

    return () => {
      cancelled = true
    }
  }, [activeMode, currentDestination.id, currentDestination.name, requestKey])

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <MatchTopBar
          title={currentContent.title}
          placeTitle={placeTitle}
          placeMeta={placeMeta}
          onBack={() => navigateBackOr(navigate, '/map')}
          onFilterClick={() => setFilterVisible(true)}
        />

        <MatchModeTabs
          activeMode={activeMode}
          options={modeOptions}
          onChange={setActiveMode}
        />

        <MatchFilterChips items={currentContent.chips} />

        {destinationHint && <p className={styles.hint}>{destinationHint}</p>}
        {stateNote && <p className={styles.stateNote}>{stateNote}</p>}

        <section className={styles.list} aria-label="匹配结果列表">
          {loading ? (
            <div className={styles.emptyState}>
              <h2>匹配结果加载中</h2>
              <p>正在同步当前目的地的匹配结果，请稍候。</p>
            </div>
          ) : loadError ? (
            <div className={styles.emptyState}>
              <h2>匹配结果暂不可用</h2>
              <p>{loadError}</p>
            </div>
          ) : viewModel?.state === 'empty' ? (
            <div className={styles.emptyState}>
              <h2>{viewModel.emptyTitle}</h2>
              <p>{viewModel.emptyDescription}</p>
            </div>
          ) : activeMode === 'partner' ? (
            ((viewModel?.items ?? []) as PartnerMatchCardData[]).map((item) => (
              <PartnerMatchCard
                key={item.id}
                item={item}
                onOpen={setSelectedPartner}
              />
            ))
          ) : (
            ((viewModel?.items ?? []) as TripMatchCardData[]).map((item) => (
              <TripMatchCard
                key={item.id}
                item={item}
                onJoin={setSelectedTrip}
              />
            ))
          )}
        </section>

        {activeMode === 'partner' &&
        !loading &&
        !loadError &&
        viewModel?.state !== 'empty' ? (
          <footer className={styles.footer}>
            以上为当前目的地相关匹配结果，后续可由后端按目的地和人格继续推荐。
          </footer>
        ) : null}
      </div>

      <FilterSheet
        visible={filterVisible}
        chips={currentContent.chips}
        onClose={() => setFilterVisible(false)}
      />
      <ProfileSheet
        visible={selectedPartner !== null}
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
      <JoinTripSheet
        visible={selectedTrip !== null}
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
      />
    </main>
  )
}

export default Match
