import { useEffect, useMemo, useRef, useState } from 'react'
import type { LayerType, LngLat, Region, Spot } from '../types'
import styles from '../Map.module.less'

interface AmapCanvasProps {
  regions: Region[]
  selectedRegion: Region | null
  selectedSpot: Spot | null
  activeLayer: LayerType
  onRegionClick: (regionId: string) => void
  onSpotClick: (spotId: string) => void
  onBlankClick: () => void
  onFallback: () => void
}

interface AmapPixel {
  new (x: number, y: number): object
}

interface AmapMarker {
  setMap(map: AmapMap | null): void
  on(eventName: 'click', handler: () => void): void
}

interface AmapPolygon {
  setMap(map: AmapMap | null): void
}

interface AmapMap {
  setZoomAndCenter(zoom: number, center: LngLat): void
  setStatus(options: {
    dragEnable: boolean
    zoomEnable: boolean
    touchZoom: boolean
    doubleClickZoom: boolean
    keyboardEnable: boolean
  }): void
  add(marker: AmapMarker): void
  on(eventName: 'click', handler: () => void): void
  destroy(): void
}

interface AmapDistrictSearch {
  search(
    keyword: string,
    callback: (
      status: string,
      result: {
        districtList?: Array<{
          boundaries?: unknown[]
        }>
      },
    ) => void,
  ): void
}

interface AmapNamespace {
  Map: new (
    container: HTMLDivElement,
    options: {
      center: LngLat
      zoom: number
      mapStyle: string
      viewMode: '2D'
      resizeEnable: boolean
      showLabel: boolean
      dragEnable: boolean
      zoomEnable: boolean
      touchZoom: boolean
      doubleClickZoom: boolean
      keyboardEnable: boolean
    },
  ) => AmapMap
  Marker: new (options: {
    position: LngLat
    content: string
    offset: object
    anchor?: string
    zIndex?: number
  }) => AmapMarker
  Polygon: new (options: {
    path: unknown
    strokeColor: string
    strokeOpacity: number
    strokeWeight: number
    fillOpacity: number
    zIndex: number
    bubble: boolean
  }) => AmapPolygon
  DistrictSearch: new (options: {
    subdistrict: number
    extensions: 'all'
    level: 'country'
  }) => AmapDistrictSearch
  Pixel: AmapPixel
  plugin(pluginNames: string | string[], callback: () => void): void
}

declare global {
  interface Window {
    AMap?: AmapNamespace
    _AMapSecurityConfig?: {
      securityJsCode: string
    }
    __tripkinAmapPromise?: Promise<AmapNamespace>
  }
}

const amapKey = import.meta.env.VITE_AMAP_KEY as string | undefined
const amapSecurityCode = import.meta.env.VITE_AMAP_SECURITY_CODE as
  | string
  | undefined

function loadAmap() {
  if (window.AMap) {
    return Promise.resolve(window.AMap)
  }

  if (!amapKey || !amapSecurityCode) {
    return Promise.reject(new Error('Missing AMap env config'))
  }

  if (window.__tripkinAmapPromise) {
    return window.__tripkinAmapPromise
  }

  window._AMapSecurityConfig = {
    securityJsCode: amapSecurityCode,
  }

  window.__tripkinAmapPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(
      amapKey,
    )}`
    script.async = true
    script.onload = () => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        reject(new Error('AMap loaded without namespace'))
      }
    }
    script.onerror = () => reject(new Error('Failed to load AMap script'))
    document.head.appendChild(script)
  })

  return window.__tripkinAmapPromise
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

function getLayerName(layer: LayerType) {
  if (layer === 'companion') {
    return 'companion'
  }

  if (layer === 'hotspot') {
    return 'hotspot'
  }

  return 'bottle'
}

function getHeatIntensity(value: number, maxValue: number) {
  return Math.max(0.24, Math.min(value / Math.max(maxValue, 1), 1))
}

function createMarkerStyle(value: number, maxValue: number, baseSize: number) {
  const intensity = getHeatIntensity(value, maxValue)
  const heatSize = Math.round(baseSize + intensity * 34)
  const coreOpacity = (0.3 + intensity * 0.48).toFixed(2)
  const midOpacity = (0.22 + intensity * 0.3).toFixed(2)
  const textTone = '#1f2433'
  const textShadow = '0 1px 8px rgba(255, 255, 255, 0.82)'

  return [
    `--heat-size:${heatSize}px`,
    `--heat-core-opacity:${coreOpacity}`,
    `--heat-mid-opacity:${midOpacity}`,
    `--heat-text:${textTone}`,
    `--heat-text-shadow:${textShadow}`,
  ].join(';')
}

function createRegionMarkerContent(
  region: Region,
  layer: LayerType,
  maxValue: number,
) {
  const value = getRegionValue(region, layer)

  return `
    <button class="${styles.amapRegionMarker} ${styles[`amapLayer${getLayerName(layer)}`]}" style="${createMarkerStyle(value, maxValue, 60)}" type="button">
      <i></i>
      <span>
        <small>${region.name}</small>
        <strong>${value}</strong>
      </span>
    </button>
  `
}

function createSpotMarkerContent(
  spot: Spot,
  layer: LayerType,
  maxValue: number,
) {
  const value = getSpotValue(spot, layer)

  return `
    <button class="${styles.amapSpotMarker} ${styles[`amapLayer${getLayerName(layer)}`]}" style="${createMarkerStyle(value, maxValue, 48)}" type="button">
      <i></i>
      <span>
        <small>${spot.name}</small>
        <strong>${value}</strong>
      </span>
    </button>
  `
}

function clearMarkers(markers: AmapMarker[]) {
  markers.forEach((marker) => marker.setMap(null))
}

function clearBoundary(polygons: AmapPolygon[]) {
  polygons.forEach((polygon) => polygon.setMap(null))
}

function drawChinaBoundary(AMap: AmapNamespace, map: AmapMap) {
  return new Promise<AmapPolygon[]>((resolve) => {
    AMap.plugin('AMap.DistrictSearch', () => {
      const districtSearch = new AMap.DistrictSearch({
        subdistrict: 0,
        extensions: 'all',
        level: 'country',
      })

      districtSearch.search('中国', (_status, result) => {
        const boundaries = result.districtList?.[0]?.boundaries ?? []
        const polygons = boundaries.map((boundary) => {
          const polygon = new AMap.Polygon({
            path: boundary,
            strokeColor: '#d6ceff',
            strokeOpacity: 0.82,
            strokeWeight: 1.4,
            fillOpacity: 0,
            zIndex: 12,
            bubble: true,
          })

          polygon.setMap(map)
          return polygon
        })

        resolve(polygons)
      })
    })
  })
}

function AmapCanvas({
  regions,
  selectedRegion,
  selectedSpot,
  activeLayer,
  onRegionClick,
  onSpotClick,
  onBlankClick,
  onFallback,
}: AmapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<AmapMap | null>(null)
  const amapRef = useRef<AmapNamespace | null>(null)
  const markersRef = useRef<AmapMarker[]>([])
  const boundaryRef = useRef<AmapPolygon[]>([])
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'failed'>(
    'loading',
  )
  const visibleSpots = useMemo(
    () => selectedRegion?.spots ?? [],
    [selectedRegion],
  )

  useEffect(() => {
    let disposed = false

    loadAmap()
      .then((AMap) => {
        if (disposed || !containerRef.current) {
          return
        }

        amapRef.current = AMap
        mapRef.current = new AMap.Map(containerRef.current, {
          center: [104.1954, 35.8617],
          zoom: 4.1,
          // mapStyle: 'amap://styles//light',
          mapStyle: 'amap://styles/whitesmoke',
          viewMode: '2D',
          resizeEnable: true,
          showLabel: true,
          dragEnable: true,
          zoomEnable: true,
          touchZoom: true,
          doubleClickZoom: true,
          keyboardEnable: true,
        })
        mapRef.current.setStatus({
          dragEnable: true,
          zoomEnable: true,
          touchZoom: true,
          doubleClickZoom: true,
          keyboardEnable: true,
        })
        mapRef.current.on('click', onBlankClick)
        void drawChinaBoundary(AMap, mapRef.current).then((polygons) => {
          if (disposed) {
            clearBoundary(polygons)
            return
          }

          boundaryRef.current = polygons
        })
        setLoadState('ready')
      })
      .catch(() => {
        if (!disposed) {
          setLoadState('failed')
          onFallback()
        }
      })

    return () => {
      disposed = true
      clearMarkers(markersRef.current)
      clearBoundary(boundaryRef.current)
      mapRef.current?.destroy()
      mapRef.current = null
    }
  }, [onBlankClick, onFallback])

  useEffect(() => {
    const AMap = amapRef.current
    const map = mapRef.current

    if (!AMap || !map) {
      return
    }

    clearMarkers(markersRef.current)

    const maxRegionValue = Math.max(
      1,
      ...regions.map((region) => getRegionValue(region, activeLayer)),
    )
    const maxSpotValue = Math.max(
      1,
      ...visibleSpots.map((spot) => getSpotValue(spot, activeLayer)),
    )

    const nextMarkers = selectedRegion
      ? visibleSpots.map((spot) => {
          const marker = new AMap.Marker({
            position: spot.lnglat,
            content: createSpotMarkerContent(spot, activeLayer, maxSpotValue),
            offset: new AMap.Pixel(0, 0),
            anchor: 'bottom-center',
            zIndex: selectedSpot?.id === spot.id ? 120 : 90,
          })

          marker.on('click', () => onSpotClick(spot.id))
          marker.setMap(map)
          map.add(marker)

          return marker
        })
      : regions.map((region) => {
          const marker = new AMap.Marker({
            position: region.lnglat,
            content: createRegionMarkerContent(
              region,
              activeLayer,
              maxRegionValue,
            ),
            offset: new AMap.Pixel(0, 0),
            anchor: 'bottom-center',
            zIndex: 80,
          })

          marker.on('click', () => onRegionClick(region.id))
          marker.setMap(map)
          map.add(marker)

          return marker
        })

    markersRef.current = nextMarkers
  }, [
    activeLayer,
    onRegionClick,
    onSpotClick,
    regions,
    selectedRegion,
    selectedSpot,
    visibleSpots,
  ])

  useEffect(() => {
    const map = mapRef.current

    if (!map) {
      return
    }

    if (selectedSpot) {
      map.setZoomAndCenter(9, selectedSpot.lnglat)
      return
    }

    if (selectedRegion) {
      map.setZoomAndCenter(6.2, selectedRegion.lnglat)
      return
    }

    map.setZoomAndCenter(4.1, [104.1954, 35.8617])
  }, [selectedRegion, selectedSpot])

  return (
    <div className={styles.amapStage}>
      <div ref={containerRef} className={styles.amapContainer} />
      {loadState === 'loading' && (
        <div className={styles.mapLoading}>真实地图加载中</div>
      )}
      {loadState === 'failed' && (
        <div className={styles.mapLoading}>地图加载失败，已切换静态地图</div>
      )}
    </div>
  )
}

export default AmapCanvas
