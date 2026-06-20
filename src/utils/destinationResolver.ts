import { allSpots, getRegionById, mapRegions } from '@/pages/Map/data/mapData'

export type DestinationResolveSource = 'query' | 'session' | 'default'
export type DestinationResolveReason =
  | 'matched-query'
  | 'missing-query'
  | 'unknown-query'

export interface ResolvedDestination {
  id: string
  name: string
  bottleCount?: number
  parentId?: string
  parentName?: string
  rawQueryDest: string | null
  rawSessionDest: string | null
  source: DestinationResolveSource
  reason: DestinationResolveReason
}

interface DestinationRecord {
  id: string
  name: string
  bottleCount?: number
  parentId?: string
  parentName?: string
}

interface ResolveDestinationOptions {
  queryDest?: string | null
  sessionDest?: string | null
  defaultId: string
}

const destinations: DestinationRecord[] = [
  ...mapRegions.map((region) => ({
    id: region.id,
    name: region.name,
    bottleCount: region.bottleCount,
  })),
  ...allSpots.map((spot) => ({
    id: spot.id,
    name: spot.name,
    bottleCount: spot.bottleCount,
    parentId: spot.parentId,
    parentName: getRegionById(spot.parentId)?.name,
  })),
]

function normalizeDestinationValue(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

function findDestination(value: string | null | undefined) {
  const normalizedValue = normalizeDestinationValue(value)

  if (!normalizedValue) {
    return null
  }

  return (
    destinations.find(
      (destination) =>
        normalizeDestinationValue(destination.id) === normalizedValue ||
        normalizeDestinationValue(destination.name) === normalizedValue,
    ) ?? null
  )
}

export function resolveDestinationId(value: string | null | undefined) {
  return findDestination(value)?.id
}

function buildResolvedDestination(
  destination: DestinationRecord,
  options: {
    queryDest: string | null
    sessionDest: string | null
    source: DestinationResolveSource
    reason: DestinationResolveReason
  },
): ResolvedDestination {
  return {
    ...destination,
    rawQueryDest: options.queryDest,
    rawSessionDest: options.sessionDest,
    source: options.source,
    reason: options.reason,
  }
}

export function resolveDestination({
  queryDest = null,
  sessionDest = null,
  defaultId,
}: ResolveDestinationOptions): ResolvedDestination | null {
  const matchedQueryDestination = findDestination(queryDest)

  if (matchedQueryDestination) {
    return buildResolvedDestination(matchedQueryDestination, {
      queryDest,
      sessionDest,
      source: 'query',
      reason: 'matched-query',
    })
  }

  const matchedSessionDestination = findDestination(sessionDest)
  const reason: DestinationResolveReason = queryDest
    ? 'unknown-query'
    : 'missing-query'

  if (matchedSessionDestination) {
    return buildResolvedDestination(matchedSessionDestination, {
      queryDest,
      sessionDest,
      source: 'session',
      reason,
    })
  }

  const fallbackDestination =
    findDestination(defaultId) ?? destinations[0] ?? null

  if (!fallbackDestination) {
    return null
  }

  return buildResolvedDestination(fallbackDestination, {
    queryDest,
    sessionDest,
    source: 'default',
    reason,
  })
}

export function getDestinationResolveHint(destination: ResolvedDestination) {
  if (destination.source === 'query') {
    return ''
  }

  if (destination.source === 'session') {
    if (destination.reason === 'missing-query') {
      return `未携带目的地，已沿用会话中的 ${destination.name}。`
    }

    return `未识别目的地 ${destination.rawQueryDest}，已沿用会话中的 ${destination.name}。`
  }

  if (destination.reason === 'missing-query') {
    return `未携带目的地，已默认展示 ${destination.name}。`
  }

  return `未识别目的地 ${destination.rawQueryDest}，已默认展示 ${destination.name}。`
}
