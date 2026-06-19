import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { allSpots, getRegionById, mapRegions } from '@/pages/Map/data/mapData'
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

type MatchDestination = {
  id: string
  name: string
  parentName?: string
}

const matchDestinations: MatchDestination[] = [
  ...mapRegions.map((region) => ({
    id: region.id,
    name: region.name,
  })),
  ...allSpots.map((spot) => ({
    id: spot.id,
    name: spot.name,
    parentName: getRegionById(spot.parentId)?.name,
  })),
]

function getMatchDestination(destId: string | null) {
  if (!destId) {
    return null
  }

  return (
    matchDestinations.find((destination) => destination.id === destId) ?? null
  )
}

function Match() {
  const [searchParams] = useSearchParams()
  const [activeMode, setActiveMode] = useState<MatchMode>('partner')
  const [filterVisible, setFilterVisible] = useState(false)
  const [selectedPartner, setSelectedPartner] =
    useState<PartnerMatchCardData | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<TripMatchCardData | null>(
    null,
  )

  const currentContent = matchContent[activeMode]
  const currentDestination = useMemo(
    () => getMatchDestination(searchParams.get('dest')),
    [searchParams],
  )
  const placeTitle = currentDestination
    ? `${currentDestination.name}${currentDestination.parentName ? ` · ${currentDestination.parentName}` : ''}`
    : currentContent.placeTitle
  const placeMeta = currentDestination
    ? `正在寻找同去 ${currentDestination.name} 的搭子`
    : currentContent.placeMeta
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
          placeMeta={placeMeta}
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
