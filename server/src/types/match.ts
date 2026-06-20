export type MatchViewState = 'exact' | 'nearby' | 'empty'

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
  | 'heart'
  | 'pin'

export type PersonaId =
  | 'Cyber-Raider'
  | 'Zen-Capybara'
  | 'Budget-Architect'
  | 'Romantic-Observer'

export type MatchAvatarKey = 'fengdelvren' | 'shanjianxiaolu'

export interface MatchInterest {
  icon: MatchChipIcon
  label: string
}

export interface MatchReason {
  icon: MatchChipIcon
  label: string
}

export interface MatchPartnerItem {
  id: string
  name: string
  personaId: PersonaId
  classicMbti: string
  identityStatus: '已实名' | '未实名'
  matchScore: number
  travelWay: string
  groupPreference: string
  activeTime: string
  avatarKey: MatchAvatarKey
  avatarAlt: string
  online?: boolean
  personality: string
  interests: MatchInterest[]
  primaryDestinationId: string
  destinationIds: string[]
  destination: string
  departure: string
  summary: string
  profileStatus: string
  profileQuote: string
  matchReasons: MatchReason[]
}

export interface MatchTripItem {
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

export interface MatchResultsPayload<T> {
  state: MatchViewState
  items: T[]
  metaText: string
  noteText: string
  emptyTitle: string
  emptyDescription: string
}

export interface MatchErrorPayload {
  error: {
    code: 'INVALID_QUERY'
    message: string
  }
}
