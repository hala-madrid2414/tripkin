import { getPersonaPresentation } from '@/utils/personaPresentation'
import { nearbyDestinationMap } from './matchMock'
import type {
  MatchMode,
  MatchViewItem,
  MatchViewModel,
  PartnerMatchCardData,
  TripMatchCardData,
} from './types'

interface BaseMatchItem {
  primaryDestinationId: string
  destinationIds: string[]
}

interface GetMatchViewModelOptions {
  mode: MatchMode
  destinationId: string
  destinationName: string
  partnerCards: PartnerMatchCardData[]
  tripCards: TripMatchCardData[]
}

function includesDestination(item: BaseMatchItem, destinationId: string) {
  return item.destinationIds.includes(destinationId)
}

function includesAnyDestination(item: BaseMatchItem, destinationIds: string[]) {
  return item.destinationIds.some((id) => destinationIds.includes(id))
}

function buildMetaText(
  mode: MatchMode,
  destinationName: string,
  count: number,
) {
  const noun = mode === 'partner' ? '搭子' : '可加入行程'
  return `正在寻找同去 ${destinationName} 的${noun} · ${count} 条结果`
}

function buildNoteText(
  mode: MatchMode,
  destinationName: string,
  state: MatchViewModel<unknown>['state'],
) {
  if (state === 'exact') {
    return `已优先展示 ${destinationName} 的同目的地${mode === 'partner' ? '搭子' : '行程'}。`
  }

  if (state === 'nearby') {
    return `${destinationName} 暂无精准匹配，已推荐相近目的地的${mode === 'partner' ? '搭子' : '行程'}。`
  }

  return ''
}

function enrichPartnerCards(cards: PartnerMatchCardData[]) {
  return cards.map((card) => ({
    ...card,
    persona: getPersonaPresentation(card.personaId),
  }))
}

export function getMatchViewModel({
  mode,
  destinationId,
  destinationName,
  partnerCards,
  tripCards,
}: GetMatchViewModelOptions): MatchViewModel<MatchViewItem> {
  const sourceItems = mode === 'partner' ? partnerCards : tripCards
  const exactItems = sourceItems.filter((item) =>
    includesDestination(item, destinationId),
  )
  const nearbyDestinationIds = nearbyDestinationMap[destinationId] ?? []
  const nearbyItems =
    exactItems.length > 0
      ? []
      : sourceItems.filter((item) =>
          includesAnyDestination(item, nearbyDestinationIds),
        )
  const state =
    exactItems.length > 0
      ? 'exact'
      : nearbyItems.length > 0
        ? 'nearby'
        : 'empty'
  const items = exactItems.length > 0 ? exactItems : nearbyItems

  return {
    state,
    items:
      mode === 'partner'
        ? enrichPartnerCards(items as PartnerMatchCardData[])
        : (items as TripMatchCardData[]),
    metaText: buildMetaText(mode, destinationName, items.length),
    noteText: buildNoteText(mode, destinationName, state),
    emptyTitle: `${destinationName} 暂无${mode === 'partner' ? '搭子' : '行程'}匹配`,
    emptyDescription:
      '当前 demo 数据里还没有这个目的地的精准结果，后续接后端时可从接口返回空状态或相近目的地推荐。',
  }
}
