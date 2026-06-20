import { Router } from 'express'
import {
  destinationLabels,
  nearbyDestinationMap,
  partnerMatches,
  tripMatches,
} from '../data/matches.js'
import type {
  MatchErrorPayload,
  MatchPartnerItem,
  MatchResultsPayload,
  MatchTripItem,
  MatchViewState,
} from '../types/match.js'

interface BaseMatchItem {
  destinationIds: string[]
}

function includesDestination(item: BaseMatchItem, destinationId: string) {
  return item.destinationIds.includes(destinationId)
}

function includesAnyDestination(item: BaseMatchItem, destinationIds: string[]) {
  return item.destinationIds.some((id) => destinationIds.includes(id))
}

function getDestinationLabel(destinationId: string) {
  return destinationLabels[destinationId] ?? destinationId
}

function buildMetaText(
  mode: 'partner' | 'trip',
  destinationName: string,
  count: number,
) {
  const noun = mode === 'partner' ? '搭子' : '可加入行程'
  return `正在寻找同去 ${destinationName} 的${noun} · ${count} 条结果`
}

function buildNoteText(
  mode: 'partner' | 'trip',
  destinationName: string,
  state: MatchViewState,
) {
  if (state === 'exact') {
    return `已优先展示 ${destinationName} 的同目的地${mode === 'partner' ? '搭子' : '行程'}。`
  }

  if (state === 'nearby') {
    return `${destinationName} 暂无精准匹配，已推荐相近目的地的${mode === 'partner' ? '搭子' : '行程'}。`
  }

  return ''
}

function buildResultsPayload<T extends BaseMatchItem>(options: {
  mode: 'partner' | 'trip'
  destinationId: string
  items: T[]
}): MatchResultsPayload<T> {
  const { destinationId, items, mode } = options
  const exactItems = items.filter((item) =>
    includesDestination(item, destinationId),
  )
  const nearbyDestinationIds = nearbyDestinationMap[destinationId] ?? []
  const nearbyItems =
    exactItems.length > 0
      ? []
      : items.filter((item) =>
          includesAnyDestination(item, nearbyDestinationIds),
        )

  const state: MatchViewState =
    exactItems.length > 0
      ? 'exact'
      : nearbyItems.length > 0
        ? 'nearby'
        : 'empty'
  const matchedItems = exactItems.length > 0 ? exactItems : nearbyItems
  const destinationName = getDestinationLabel(destinationId)

  return {
    state,
    items: matchedItems,
    metaText: buildMetaText(mode, destinationName, matchedItems.length),
    noteText: buildNoteText(mode, destinationName, state),
    emptyTitle: `${destinationName} 暂无${mode === 'partner' ? '搭子' : '行程'}匹配`,
    emptyDescription:
      '当前 mock API 里还没有这个目的地的精准结果，后续可以继续扩充接口数据或返回相近目的地推荐。',
  }
}

function readDestinationId(
  value: unknown,
): { destinationId: string } | { error: MatchErrorPayload } {
  if (typeof value !== 'string' || value.trim() === '') {
    return {
      error: {
        error: {
          code: 'INVALID_QUERY',
          message: 'destinationId is required',
        },
      },
    }
  }

  return {
    destinationId: value.trim(),
  }
}

export const matchRouter = Router()

matchRouter.get('/partners', (req, res) => {
  const query = readDestinationId(req.query.destinationId)

  if ('error' in query) {
    res.status(400).json(query.error)
    return
  }

  const payload = buildResultsPayload<MatchPartnerItem>({
    mode: 'partner',
    destinationId: query.destinationId,
    items: partnerMatches,
  })

  res.json(payload)
})

matchRouter.get('/trips', (req, res) => {
  const query = readDestinationId(req.query.destinationId)

  if ('error' in query) {
    res.status(400).json(query.error)
    return
  }

  const payload = buildResultsPayload<MatchTripItem>({
    mode: 'trip',
    destinationId: query.destinationId,
    items: tripMatches,
  })

  res.json(payload)
})
