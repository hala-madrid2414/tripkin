export type LayerType = 'all' | 'bottle' | 'companion' | 'hotspot'

export interface Point {
  x: number
  y: number
}

export type LngLat = [number, number]

export interface Spot {
  id: string
  name: string
  subtitle: string
  parentId: string
  position: Point
  lnglat: LngLat
  bottleCount: number
  companionCount: number
  tags: string[]
  recommendReason: string
  suitableFor: string[]
  rating: number
  bestSeason: string
  duration: string
}

export interface Region {
  id: string
  name: string
  position: Point
  lnglat: LngLat
  shapePath: string
  bottleCount: number
  companionCount: number
  hotspotLevel: number
  tags: string[]
  recommendReason: string
  rating: number
  spots: Spot[]
}

export interface Viewport {
  scale: number
  x: number
  y: number
}

export interface LayerOption {
  key: LayerType
  label: string
  description: string
}
