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
  mbti: string
  avatarUrl: string
  avatarAlt: string
  online?: boolean
  personality: string
  interests: Array<{
    icon: MatchChipIcon
    label: string
  }>
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
}

export interface MatchModeContent {
  title: string
  placeTitle: string
  placeMeta: string
  chips: MatchChip[]
}
