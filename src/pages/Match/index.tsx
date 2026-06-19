import BottomNav from '@/components/BottomNav'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMatchStore } from '@/store/useMatchStore'
import { useTripStore } from '@/store/useTripStore'
import FilterSheet from './components/FilterSheet'
import JoinTripSheet from './components/JoinTripSheet'
import MatchFilterChips from './components/MatchFilterChips'
import MatchModeTabs from './components/MatchModeTabs'
import MatchTopBar from './components/MatchTopBar'
import PartnerMatchCard from './components/PartnerMatchCard'
import ProfileSheet from './components/ProfileSheet'
import TripMatchCard from './components/TripMatchCard'
import { matchContent, modeOptions, partnerCards, tripCards } from './matchMock'
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

  const currentContent = matchContent[activeMode]
  const placeTitle =
    entryContext?.destinationName ?? currentContent.placeTitle ?? destination
  const cards = useMemo(
    () => (activeMode === 'partner' ? partnerCards : tripCards),
    [activeMode],
  )

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <MatchTopBar
          title={currentContent.title}
          placeTitle={placeTitle}
          placeMeta={currentContent.placeMeta}
          onFilterClick={() => setFilterVisible(true)}
        />

        <MatchModeTabs
          activeMode={activeMode}
          options={modeOptions}
          onChange={setActiveMode}
        />

        <MatchFilterChips items={currentContent.chips} />

        <section className={styles.list} aria-label="匹配结果列表">
          {activeMode === 'partner'
            ? (cards as PartnerMatchCardData[]).map((item) => (
                <PartnerMatchCard
                  key={item.id}
                  item={item}
                  onOpen={setSelectedPartner}
                />
              ))
            : (cards as TripMatchCardData[]).map((item) => (
                <TripMatchCard
                  key={item.id}
                  item={item}
                  onJoin={setSelectedTrip}
                />
              ))}
        </section>

        {activeMode === 'partner' ? (
          <footer className={styles.footer}>
            以上为部分匹配结果，持续为你推荐中...
          </footer>
        ) : null}
      </div>

      <BottomNav />

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
