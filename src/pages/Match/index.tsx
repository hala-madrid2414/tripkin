import BottomNav from '@/components/BottomNav'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMatchStore } from '@/store/useMatchStore'
import { useTripStore } from '@/store/useTripStore'
import {
  getDestinationResolveHint,
  resolveDestination,
} from '@/utils/destinationResolver'
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
  PartnerMatchCardData,
  TripMatchCardData,
} from './types'

function Match() {
  const [searchParams] = useSearchParams()
  const activeMode = useMatchStore((state) => state.mode)
  const setActiveMode = useMatchStore((state) => state.setMode)
  const entryContext = useMatchStore((state) => state.entryContext)
  const destination = useTripStore((state) => state.destination)
  const [filterVisible, setFilterVisible] = useState(false)
  const [selectedPartner, setSelectedPartner] =
    useState<PartnerMatchCardData | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<TripMatchCardData | null>(
    null,
  )

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
  const viewModel = useMemo(
    () =>
      getMatchResults({
        mode: activeMode,
        destinationId: currentDestination.id,
        destinationName: currentDestination.name,
      }),
    [activeMode, currentDestination],
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
  const backTo = currentDestination
    ? currentDestination.source === 'default'
      ? '/map'
      : `/bottle?dest=${encodeURIComponent(currentDestination.id)}`
    : '/map'

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <MatchTopBar
          title={currentContent.title}
          placeTitle={placeTitle}
          placeMeta={viewModel.metaText}
          backTo={backTo}
          onFilterClick={() => setFilterVisible(true)}
        />

        <MatchModeTabs
          activeMode={activeMode}
          options={modeOptions}
          onChange={setActiveMode}
        />

        <MatchFilterChips items={currentContent.chips} />

        {destinationHint && <p className={styles.hint}>{destinationHint}</p>}
        {viewModel.noteText && (
          <p className={styles.stateNote}>{viewModel.noteText}</p>
        )}

        <section className={styles.list} aria-label="匹配结果列表">
          {viewModel.state === 'empty' ? (
            <div className={styles.emptyState}>
              <h2>{viewModel.emptyTitle}</h2>
              <p>{viewModel.emptyDescription}</p>
            </div>
          ) : activeMode === 'partner' ? (
            (viewModel.items as PartnerMatchCardData[]).map((item) => (
              <PartnerMatchCard
                key={item.id}
                item={item}
                onOpen={setSelectedPartner}
              />
            ))
          ) : (
            (viewModel.items as TripMatchCardData[]).map((item) => (
              <TripMatchCard
                key={item.id}
                item={item}
                onJoin={setSelectedTrip}
              />
            ))
          )}
        </section>

        {activeMode === 'partner' && viewModel.state !== 'empty' ? (
          <footer className={styles.footer}>
            以上为当前目的地相关匹配结果，后续可由后端按目的地和人格继续推荐。
          </footer>
        ) : null}
      </div>

      <BottomNav destinationId={currentDestination?.id} />

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
