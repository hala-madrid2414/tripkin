import type { PersonaId } from '@/types/mbti'
import type { PersonaPresentation } from '@/utils/personaPresentation'

export type MatchMode = 'partner' | 'trip'

export interface MatchModeOption {
  key: MatchMode
  label: string
}

export type MatchChipIcon =
  | 'calendar'
  | 'car'
  | 'camera'
  | 'user'
  | 'walk'
  | 'clock'
  | 'people'
  | 'mountain'
  | 'wallet'

export interface MatchChip {
  id: string
  label: string
  icon: MatchChipIcon
  dropdown?: boolean
}

export interface PartnerMatchCardData {
  id: string
  name: string
  personaId: PersonaId
  classicMbti: string
  identityStatus: '已实名' | '未实名'
  matchScore: number
  travelWay: string
  groupPreference: string
  activeTime: string
  avatarUrl: string
  avatarAlt: string
  online?: boolean
  personality: string
  persona?: PersonaPresentation
  interests: Array<{
    icon: MatchChipIcon
    label: string
  }>
  primaryDestinationId: string
  destinationIds: string[]
  destination: string
  departure: string
  summary: string
  profileStatus: string
  profileQuote: string
  matchReasons: Array<{
    icon: MatchChipIcon | 'heart' | 'pin'
    label: string
  }>
}

export interface TripMatchCardData {
  id: string
  organizerName: string
  primaryDestinationId: string
  destinationIds: string[]
  title: string
  imageTone: 'valley' | 'ridge' | 'bridge' | 'snow'
  location: string
  dateRange: string
  transport: string
  people: string
  duration: string
  travelStyle: string
  summary: string
  actionLabel: string
  status: 'OPEN' | 'FULL' | 'CONFIRMED' | 'COMPLETED'
  identityStatus: '发起人已实名' | '发起人未实名'
  planHighlights: string[]
}

export interface MatchModeContent {
  title: string
  placeTitle: string
  placeMeta: string
  chips: MatchChip[]
}

export type MatchViewState = 'exact' | 'nearby' | 'empty'

export interface MatchViewModel<T> {
  state: MatchViewState
  items: T[]
  metaText: string
  noteText: string
  emptyTitle: string
  emptyDescription: string
}

export type MatchViewItem = PartnerMatchCardData | TripMatchCardData
