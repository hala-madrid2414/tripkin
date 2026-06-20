import { getMatchViewModel } from '@/pages/Match/matchLogic'
import {
  matchContent,
  modeOptions,
  partnerCards,
  tripCards,
} from '@/pages/Match/matchMock'
import type {
  MatchMode,
  MatchModeContent,
  MatchModeOption,
  MatchViewItem,
  MatchViewModel,
} from '@/pages/Match/types'

interface GetMatchResultsOptions {
  mode: MatchMode
  destinationId: string
  destinationName: string
}

export function getMatchModes(): MatchModeOption[] {
  return modeOptions
}

export function getMatchContent(mode: MatchMode): MatchModeContent {
  return matchContent[mode]
}

export function getMatchResults({
  mode,
  destinationId,
  destinationName,
}: GetMatchResultsOptions): MatchViewModel<MatchViewItem> {
  return getMatchViewModel({
    mode,
    destinationId,
    destinationName,
    partnerCards,
    tripCards,
  })
}
