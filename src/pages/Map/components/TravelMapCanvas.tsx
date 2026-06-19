import { useRef } from 'react'
import type { LayerType, Point, Region, Spot, Viewport } from '../types'
import { BottleIcon, PeopleIcon } from './MapIcons'
import styles from '../Map.module.less'

interface TravelMapCanvasProps {
  regions: Region[]
  selectedRegion: Region | null
  selectedSpot: Spot | null
  activeLayer: LayerType
  viewport: Viewport
  onRegionClick: (regionId: string) => void
  onSpotClick: (spotId: string) => void
  onViewportChange: (viewport: Viewport) => void
  onBlankClick: () => void
}

interface GestureState {
  dragging: boolean
  startX: number
  startY: number
  startViewport: Viewport
  pinchDistance: number
  pinchScale: number
}

const defaultGestureState: GestureState = {
  dragging: false,
  startX: 0,
  startY: 0,
  startViewport: { scale: 1, x: 0, y: 0 },
  pinchDistance: 0,
  pinchScale: 1,
}

function getDistance(touches: React.TouchList) {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY

  return Math.hypot(dx, dy)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getRegionValue(region: Region, layer: LayerType) {
  if (layer === 'companion') {
    return region.companionCount
  }

  if (layer === 'hotspot') {
    return region.hotspotLevel
  }

  return region.bottleCount
}

function getSpotValue(spot: Spot, layer: LayerType) {
  if (layer === 'companion') {
    return spot.companionCount
  }

  if (layer === 'hotspot') {
    return Math.max(2, Math.round(spot.rating))
  }

  return spot.bottleCount
}

function getLayerClass(layer: LayerType) {
  if (layer === 'companion') {
    return styles.layerCompanion
  }

  if (layer === 'hotspot') {
    return styles.layerHotspot
  }

  return styles.layerBottle
}

function getSpotPoint(region: Region, spot: Spot): Point {
  return {
    x: region.position.x + (spot.position.x - 50) * 0.34,
    y: region.position.y + (spot.position.y - 50) * 0.34,
  }
}

function TravelMapCanvas({
  regions,
  selectedRegion,
  selectedSpot,
  activeLayer,
  viewport,
  onRegionClick,
  onSpotClick,
  onViewportChange,
  onBlankClick,
}: TravelMapCanvasProps) {
  const gestureState = useRef<GestureState>(defaultGestureState)
  const lastTapTime = useRef(0)
  const maxRegionValue = Math.max(
    ...regions.map((region) => getRegionValue(region, activeLayer)),
  )
  const spots = selectedRegion?.spots ?? []

  function handleTouchStart(event: React.TouchEvent<SVGSVGElement>) {
    if (event.touches.length === 1) {
      gestureState.current = {
        ...gestureState.current,
        dragging: true,
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY,
        startViewport: viewport,
      }
    }

    if (event.touches.length === 2) {
      gestureState.current = {
        ...gestureState.current,
        dragging: false,
        pinchDistance: getDistance(event.touches),
        pinchScale: viewport.scale,
      }
    }
  }

  function handleTouchMove(event: React.TouchEvent<SVGSVGElement>) {
    if (event.touches.length === 1 && gestureState.current.dragging) {
      const dx =
        ((event.touches[0].clientX - gestureState.current.startX) / 360) * 100
      const dy =
        ((event.touches[0].clientY - gestureState.current.startY) / 640) * 100

      onViewportChange({
        ...viewport,
        x: gestureState.current.startViewport.x + dx,
        y: gestureState.current.startViewport.y + dy,
      })
    }

    if (event.touches.length === 2) {
      const distance = getDistance(event.touches)
      const nextScale = clamp(
        gestureState.current.pinchScale *
          (distance / Math.max(gestureState.current.pinchDistance, 1)),
        0.82,
        3.7,
      )

      onViewportChange({
        ...viewport,
        scale: nextScale,
      })
    }
  }

  function handleTouchEnd() {
    gestureState.current.dragging = false
  }

  function handleDoubleClick() {
    const now = Date.now()

    if (now - lastTapTime.current < 280) {
      onViewportChange({
        ...viewport,
        scale: clamp(viewport.scale * 1.4, 0.82, 3.7),
      })
    }

    lastTapTime.current = now
  }

  return (
    <div className={styles.mapStage}>
      <svg
        className={styles.mapSvg}
        viewBox="0 0 100 100"
        role="img"
        aria-label="旅行灵感地图"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onBlankClick}
        onDoubleClick={handleDoubleClick}
      >
        <defs>
          <linearGradient id="mapWater" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="52%" stopColor="#eef7ff" />
            <stop offset="100%" stopColor="#f7f3ff" />
          </linearGradient>
          <filter id="map-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill="url(#mapWater)" />
        <path
          className={styles.mapTerrain}
          d="M5 15 C19 7 29 13 41 17 C54 22 64 18 76 23 C88 28 92 41 86 55 C82 65 88 77 75 85 C62 92 51 79 38 82 C26 85 18 75 11 65 C4 55 0 43 5 15 Z"
        />

        <g
          className={styles.mapTransform}
          transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.scale})`}
        >
          {regions.map((region) => {
            const selected = selectedRegion?.id === region.id
            const value = getRegionValue(region, activeLayer)
            const radius = 4 + (value / maxRegionValue) * 5.4

            return (
              <g key={region.id}>
                <path
                  d={region.shapePath}
                  className={
                    selected ? styles.regionShapeActive : styles.regionShape
                  }
                  onClick={(event) => {
                    event.stopPropagation()
                    onRegionClick(region.id)
                  }}
                />
                {!selectedRegion && (
                  <g
                    className={`${styles.heatBubble} ${getLayerClass(activeLayer)}`}
                    filter="url(#map-glow)"
                    onClick={(event) => {
                      event.stopPropagation()
                      onRegionClick(region.id)
                    }}
                  >
                    <circle
                      cx={region.position.x}
                      cy={region.position.y}
                      r={radius * 1.45}
                      className={styles.heatHalo}
                    />
                    <circle
                      cx={region.position.x}
                      cy={region.position.y}
                      r={radius}
                      className={styles.heatCore}
                    />
                    <text
                      x={region.position.x}
                      y={region.position.y + 0.8}
                      className={styles.heatNumber}
                    >
                      {value}
                    </text>
                  </g>
                )}
                {!selectedRegion && (
                  <text
                    x={region.position.x}
                    y={region.position.y + radius + 5.3}
                    className={styles.regionLabel}
                  >
                    {region.name}
                  </text>
                )}
              </g>
            )
          })}

          {selectedRegion &&
            spots.map((spot) => {
              const point = getSpotPoint(selectedRegion, spot)
              const value = getSpotValue(spot, activeLayer)
              const selected = selectedSpot?.id === spot.id

              return (
                <g
                  key={spot.id}
                  className={
                    selected ? styles.spotMarkerActive : styles.spotMarker
                  }
                  onClick={(event) => {
                    event.stopPropagation()
                    onSpotClick(spot.id)
                  }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={selected ? 5.7 : 4.8}
                    className={styles.spotHalo}
                  />
                  <foreignObject
                    x={point.x - 4}
                    y={point.y - 4}
                    width="8"
                    height="8"
                  >
                    <span className={styles.spotIcon}>
                      {activeLayer === 'companion' ? (
                        <PeopleIcon />
                      ) : (
                        <BottleIcon />
                      )}
                    </span>
                  </foreignObject>
                  <text
                    x={point.x}
                    y={point.y + 8.4}
                    className={styles.spotName}
                  >
                    {spot.name}
                  </text>
                  <text
                    x={point.x}
                    y={point.y + 11.5}
                    className={styles.spotCount}
                  >
                    {value}
                  </text>
                </g>
              )
            })}
        </g>
      </svg>
    </div>
  )
}

export default TravelMapCanvas
