import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import type { MutableRefObject, PointerEvent } from 'react'
import MbtiEntryModal from '@/components/MbtiEntryModal'
import { useTripStore } from '@/store/useTripStore'
import AmapCanvas from './components/AmapCanvas'
import BottomRegionCard from './components/BottomRegionCard'
import BottomSpotCard from './components/BottomSpotCard'
import LayerSheet from './components/LayerSheet'
import MapControls from './components/MapControls'
import SearchBar from './components/SearchBar'
import TravelMapCanvas from './components/TravelMapCanvas'
import {
  getRegionById,
  getSpotById,
  getSpotRegion,
  mapRegions,
  searchMapItems,
} from './data/mapData'
import type { LayerType, Viewport } from './types'
import styles from './Map.module.less'

interface MapPageState {
  viewport: Viewport
  activeLayer: LayerType
  selectedRegionId: string | null
  selectedSpotId: string | null
  searchQuery: string
  layerSheetOpen: boolean
  cardExpanded: boolean
  regionSheetExpanded: boolean
  regionCardLevel: RegionCardLevel
}

type RegionCardLevel = 'compact' | 'detail' | 'full'

type MapPageAction =
  | { type: 'setViewport'; payload: Viewport }
  | { type: 'selectRegion'; payload: string }
  | { type: 'selectSpot'; payload: string }
  | { type: 'closeSpot' }
  | { type: 'reset' }
  | { type: 'setLayer'; payload: LayerType }
  | { type: 'setSearch'; payload: string }
  | { type: 'openLayerSheet' }
  | { type: 'closeLayerSheet' }
  | { type: 'toggleCard' }
  | { type: 'setCardExpanded'; payload: boolean }
  | { type: 'toggleRegionSheet' }
  | { type: 'setRegionSheetExpanded'; payload: boolean }
  | { type: 'advanceRegionCard' }
  | { type: 'retreatRegionCard' }
  | { type: 'toggleRegionCard' }

const initialState: MapPageState = {
  viewport: { scale: 1, x: 0, y: 0 },
  activeLayer: 'all',
  selectedRegionId: null,
  selectedSpotId: null,
  searchQuery: '',
  layerSheetOpen: false,
  cardExpanded: false,
  regionSheetExpanded: false,
  regionCardLevel: 'compact',
}

const hasAmapConfig = Boolean(
  import.meta.env.VITE_AMAP_KEY && import.meta.env.VITE_AMAP_SECURITY_CODE,
)

function focusViewport(
  point: { x: number; y: number },
  scale = 2.15,
): Viewport {
  return {
    scale,
    x: 50 - point.x * scale,
    y: 50 - point.y * scale,
  }
}

function mapPageReducer(
  state: MapPageState,
  action: MapPageAction,
): MapPageState {
  switch (action.type) {
    case 'setViewport':
      return {
        ...state,
        viewport: action.payload,
      }

    case 'selectRegion': {
      const region = getRegionById(action.payload)

      if (!region) {
        return state
      }

      return {
        ...state,
        selectedRegionId: region.id,
        selectedSpotId: null,
        cardExpanded: false,
        regionSheetExpanded: false,
        regionCardLevel: 'compact',
        searchQuery: '',
        viewport: focusViewport(region.position),
      }
    }

    case 'selectSpot': {
      const spot = getSpotById(action.payload)
      const region = getSpotRegion(spot)

      if (!spot || !region) {
        return state
      }

      return {
        ...state,
        selectedRegionId: region.id,
        selectedSpotId: spot.id,
        cardExpanded: false,
        regionSheetExpanded: false,
        regionCardLevel: 'compact',
        searchQuery: '',
        viewport: focusViewport(region.position, 2.35),
      }
    }

    case 'closeSpot':
      return {
        ...state,
        selectedSpotId: null,
        cardExpanded: false,
        regionSheetExpanded: false,
        regionCardLevel: 'compact',
      }

    case 'reset':
      return {
        ...state,
        selectedRegionId: null,
        selectedSpotId: null,
        cardExpanded: false,
        regionSheetExpanded: false,
        regionCardLevel: 'compact',
        searchQuery: '',
        viewport: { scale: 1, x: 0, y: 0 },
      }

    case 'setLayer':
      return {
        ...state,
        activeLayer: action.payload,
        layerSheetOpen: false,
      }

    case 'setSearch':
      return {
        ...state,
        searchQuery: action.payload,
      }

    case 'openLayerSheet':
      return {
        ...state,
        layerSheetOpen: true,
      }

    case 'closeLayerSheet':
      return {
        ...state,
        layerSheetOpen: false,
      }

    case 'toggleCard':
      return {
        ...state,
        cardExpanded: !state.cardExpanded,
      }

    case 'setCardExpanded':
      return {
        ...state,
        cardExpanded: action.payload,
      }

    case 'toggleRegionSheet':
      return {
        ...state,
        regionSheetExpanded: !state.regionSheetExpanded,
      }

    case 'setRegionSheetExpanded':
      return {
        ...state,
        regionSheetExpanded: action.payload,
      }

    case 'advanceRegionCard':
      return {
        ...state,
        regionCardLevel:
          state.regionCardLevel === 'compact'
            ? 'detail'
            : state.regionCardLevel === 'detail'
              ? 'full'
              : 'full',
      }

    case 'retreatRegionCard':
      return {
        ...state,
        regionCardLevel:
          state.regionCardLevel === 'full'
            ? 'detail'
            : state.regionCardLevel === 'detail'
              ? 'compact'
              : 'compact',
      }

    case 'toggleRegionCard':
      return {
        ...state,
        regionCardLevel:
          state.regionCardLevel === 'compact'
            ? 'detail'
            : state.regionCardLevel === 'detail'
              ? 'full'
              : 'detail',
      }

    default:
      return state
  }
}

interface SheetDragState {
  startY: number
  moved: boolean
}

type SheetDragRef = MutableRefObject<SheetDragState | null>

function Map() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(mapPageReducer, initialState)
  const setDestination = useTripStore((store) => store.setDestination)
  const [toastMessage, setToastMessage] = useState('')
  const [amapFailed, setAmapFailed] = useState(false)
  const [mbtiModalOpen, setMbtiModalOpen] = useState(false)
  const summaryDragRef = useRef<SheetDragState | null>(null)
  const regionDragRef = useRef<SheetDragState | null>(null)
  const spotDragRef = useRef<SheetDragState | null>(null)
  const selectedRegion = getRegionById(state.selectedRegionId)
  const selectedSpot = getSpotById(state.selectedSpotId)
  const selectedSpotRegion = getSpotRegion(selectedSpot)
  const activeBottleDestinationId =
    selectedSpot?.id ?? selectedRegion?.id ?? mapRegions[0]?.id ?? 'yunnan'

  useEffect(() => {
    setDestination(activeBottleDestinationId)
  }, [activeBottleDestinationId, setDestination])

  const searchResults = useMemo(
    () => searchMapItems(state.searchQuery),
    [state.searchQuery],
  )
  const showDemoToast = useCallback((content: string) => {
    setToastMessage(content)
    window.setTimeout(() => setToastMessage(''), 1800)
  }, [])

  const handleBlankClick = useCallback(() => {
    dispatch({ type: 'closeSpot' })
  }, [])

  const handleThrowBottle = useCallback(
    (destinationId = activeBottleDestinationId) => {
      navigate(`/bottle?dest=${encodeURIComponent(destinationId)}&action=add`)
    },
    [activeBottleDestinationId, navigate],
  )

  const handleAmapFallback = useCallback(() => {
    setAmapFailed(true)
    showDemoToast('真实地图加载失败，已切换静态地图')
  }, [showDemoToast])

  const handleSheetPointerDown = useCallback(
    (dragRef: SheetDragRef, event: PointerEvent<HTMLButtonElement>) => {
      dragRef.current = {
        startY: event.clientY,
        moved: false,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [],
  )

  const handleSheetPointerMove = useCallback(
    (dragRef: SheetDragRef, event: PointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current

      if (!drag) {
        return
      }

      if (Math.abs(event.clientY - drag.startY) > 8) {
        drag.moved = true
      }
    },
    [],
  )

  const finishSheetGesture = useCallback(
    (
      dragRef: SheetDragRef,
      event: PointerEvent<HTMLButtonElement>,
      onExpand: () => void,
      onCollapse: () => void,
      onTap: () => void,
    ) => {
      const drag = dragRef.current

      if (!drag) {
        return
      }

      const deltaY = event.clientY - drag.startY
      dragRef.current = null

      if (drag.moved && deltaY < -24) {
        onExpand()
        return
      }

      if (drag.moved && deltaY > 24) {
        onCollapse()
        return
      }

      onTap()
    },
    [],
  )

  const cancelSheetGesture = useCallback((dragRef: SheetDragRef) => {
    dragRef.current = null
  }, [])

  return (
    <main className={styles.page}>
      <SearchBar
        query={state.searchQuery}
        results={searchResults}
        onQueryChange={(query) =>
          dispatch({ type: 'setSearch', payload: query })
        }
        onResultClick={(spotId) =>
          dispatch({ type: 'selectSpot', payload: spotId })
        }
        onKeywordClick={(keyword) =>
          dispatch({ type: 'setSearch', payload: keyword })
        }
        onLayerClick={() => dispatch({ type: 'openLayerSheet' })}
        onMbtiClick={() => setMbtiModalOpen(true)}
      />

      {hasAmapConfig && !amapFailed ? (
        <AmapCanvas
          regions={mapRegions}
          selectedRegion={selectedRegion}
          selectedSpot={selectedSpot}
          activeLayer={state.activeLayer}
          onRegionClick={(regionId) =>
            dispatch({ type: 'selectRegion', payload: regionId })
          }
          onSpotClick={(spotId) =>
            dispatch({ type: 'selectSpot', payload: spotId })
          }
          onBlankClick={handleBlankClick}
          onFallback={handleAmapFallback}
        />
      ) : (
        <TravelMapCanvas
          regions={mapRegions}
          selectedRegion={selectedRegion}
          selectedSpot={selectedSpot}
          activeLayer={state.activeLayer}
          viewport={state.viewport}
          onRegionClick={(regionId) =>
            dispatch({ type: 'selectRegion', payload: regionId })
          }
          onSpotClick={(spotId) =>
            dispatch({ type: 'selectSpot', payload: spotId })
          }
          onViewportChange={(viewport) =>
            dispatch({ type: 'setViewport', payload: viewport })
          }
          onBlankClick={handleBlankClick}
        />
      )}

      {!selectedRegion && !selectedSpot && (
        <section
          className={
            state.regionSheetExpanded
              ? styles.regionSummaryExpanded
              : styles.regionSummary
          }
          aria-label="当前地图区域"
        >
          <button
            type="button"
            className={styles.sheetHandle}
            aria-label={
              state.regionSheetExpanded ? '收起地图说明' : '展开地图说明'
            }
            onPointerDown={(event) =>
              handleSheetPointerDown(summaryDragRef, event)
            }
            onPointerMove={(event) =>
              handleSheetPointerMove(summaryDragRef, event)
            }
            onPointerUp={(event) =>
              finishSheetGesture(
                summaryDragRef,
                event,
                () =>
                  dispatch({ type: 'setRegionSheetExpanded', payload: true }),
                () =>
                  dispatch({ type: 'setRegionSheetExpanded', payload: false }),
                () => dispatch({ type: 'toggleRegionSheet' }),
              )
            }
            onPointerCancel={() => cancelSheetGesture(summaryDragRef)}
          >
            <span />
          </button>
          <h1>全国旅行灵感地图</h1>
          <p>数字表示近 30 天内，对该目的地公开找搭子的有效用户数。</p>

          {state.regionSheetExpanded && (
            <div className={styles.summaryExpandedContent}>
              <h2>近 30 天旅行灵感</h2>
              <ul>
                {mapRegions.slice(0, 5).map((region) => (
                  <li key={region.id}>
                    <strong>{region.name}</strong>
                    <span>
                      {region.bottleCount} 个漂流瓶 · {region.companionCount}{' '}
                      人正在找搭子
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <MapControls
        onLocate={() => showDemoToast('当前 Demo 暂不接入真实定位')}
        onReset={() => dispatch({ type: 'reset' })}
        onThrowBottle={() => handleThrowBottle()}
      />

      <BottomRegionCard
        region={selectedRegion && !selectedSpot ? selectedRegion : null}
        level={state.regionCardLevel}
        onToggleLevel={() => dispatch({ type: 'toggleRegionCard' })}
        onAdvanceLevel={() => dispatch({ type: 'advanceRegionCard' })}
        onRetreatLevel={() => dispatch({ type: 'retreatRegionCard' })}
        dragRef={regionDragRef}
        onHandlePointerDown={handleSheetPointerDown}
        onHandlePointerMove={handleSheetPointerMove}
        onHandlePointerUp={finishSheetGesture}
        onHandlePointerCancel={cancelSheetGesture}
        onClose={() => dispatch({ type: 'reset' })}
        onThrowBottle={handleThrowBottle}
      />

      <BottomSpotCard
        spot={selectedSpot}
        region={selectedSpotRegion}
        expanded={state.cardExpanded}
        onToggleExpanded={() => dispatch({ type: 'toggleCard' })}
        onExpand={() => dispatch({ type: 'setCardExpanded', payload: true })}
        onCollapse={() => dispatch({ type: 'setCardExpanded', payload: false })}
        dragRef={spotDragRef}
        onHandlePointerDown={handleSheetPointerDown}
        onHandlePointerMove={handleSheetPointerMove}
        onHandlePointerUp={finishSheetGesture}
        onHandlePointerCancel={cancelSheetGesture}
        onClose={() => dispatch({ type: 'closeSpot' })}
        onThrowBottle={handleThrowBottle}
      />

      <LayerSheet
        open={state.layerSheetOpen}
        activeLayer={state.activeLayer}
        onSelect={(layer) => dispatch({ type: 'setLayer', payload: layer })}
        onClose={() => dispatch({ type: 'closeLayerSheet' })}
      />

      <div className={toastMessage ? styles.toastVisible : styles.toastHidden}>
        <span role="status" aria-live="polite">
          {toastMessage}
        </span>
      </div>
      <MbtiEntryModal
        open={mbtiModalOpen}
        onEnter={() => {
          setMbtiModalOpen(false)
          navigate('/mbti')
        }}
        onClose={() => setMbtiModalOpen(false)}
      />
    </main>
  )
}

export default Map
