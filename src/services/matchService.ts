import { getMatchViewModel } from '@/pages/Match/matchLogic'
import {
  matchContent,
  modeOptions,
  partnerCards,
  tripCards,
} from '@/pages/Match/matchMock'
import fengdelvrenAvatar from '@/pages/Match/assets/partner-fengdelvren.png'
import shanjianxiaoluAvatar from '@/pages/Match/assets/partner-shanjianxiaolu.png'
import type {
  MatchMode,
  MatchModeContent,
  MatchModeOption,
  PartnerMatchCardData,
  TripMatchCardData,
  MatchViewItem,
  MatchViewModel,
} from '@/pages/Match/types'
import { getPersonaPresentation } from '@/utils/personaPresentation'

interface GetMatchResultsOptions {
  mode: MatchMode
  destinationId: string
  destinationName: string
}

type MatchAvatarKey = 'fengdelvren' | 'shanjianxiaolu'

type MatchApiViewModel<T> = Omit<MatchViewModel<T>, 'items'> & {
  items: T[]
}

type MatchApiPartnerItem = Omit<
  PartnerMatchCardData,
  'avatarUrl' | 'persona'
> & {
  avatarKey: MatchAvatarKey
}

const partnerAvatarMap: Record<MatchAvatarKey, string> = {
  fengdelvren: fengdelvrenAvatar,
  shanjianxiaolu: shanjianxiaoluAvatar,
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() ?? ''
}

function buildApiUrl(path: string) {
  return `${getApiBaseUrl().replace(/\/+$/, '')}${path}`
}

async function requestMatchApi<T>(path: string) {
  const response = await fetch(buildApiUrl(path))

  if (!response.ok) {
    let errorMessage = `Match API 请求失败：${response.status}`

    try {
      const payload = (await response.json()) as {
        error?: {
          message?: string
        }
      }

      errorMessage = payload.error?.message ?? errorMessage
    } catch {
      // Ignore JSON parse failures and keep the fallback message.
    }

    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

function adaptPartnerItem(item: MatchApiPartnerItem): PartnerMatchCardData {
  return {
    ...item,
    avatarUrl: partnerAvatarMap[item.avatarKey],
    persona: getPersonaPresentation(item.personaId),
  }
}

export function getMatchModes(): MatchModeOption[] {
  return modeOptions
}

export function getMatchContent(mode: MatchMode): MatchModeContent {
  return matchContent[mode]
}

export async function getMatchResults({
  mode,
  destinationId,
  destinationName,
}: GetMatchResultsOptions): Promise<MatchViewModel<MatchViewItem>> {
  if (!getApiBaseUrl()) {
    return getMatchViewModel({
      mode,
      destinationId,
      destinationName,
      partnerCards,
      tripCards,
    })
  }

  if (mode === 'partner') {
    const payload = await requestMatchApi<
      MatchApiViewModel<MatchApiPartnerItem>
    >(
      `/api/matches/partners?destinationId=${encodeURIComponent(destinationId)}`,
    )

    return {
      ...payload,
      items: payload.items.map(adaptPartnerItem),
    }
  }

  const payload = await requestMatchApi<MatchApiViewModel<TripMatchCardData>>(
    `/api/matches/trips?destinationId=${encodeURIComponent(destinationId)}`,
  )

  return payload
}
