export type MatchMode = 'partner' | 'trip'

export interface MatchModeOption {
  key: MatchMode
  label: string
}

export interface MatchChip {
  id: string
  label: string
  highlighted?: boolean
}

export interface PartnerMatchCardData {
  id: string
  name: string
  avatarLabel: string
  matchScore: string
  personality: string
  interests: string[]
  destination: string
  departure: string
  summary: string
  actionLabel: string
}

export interface TripMatchCardData {
  id: string
  organizerName: string
  organizerAvatar: string
  title: string
  location: string
  schedule: string
  travelStyle: string
  groupStatus: string
  summary: string
  actionLabel: string
}

export interface MatchModeContent {
  title: string
  subtitle: string
  helperText: string
  resultHint: string
  chips: MatchChip[]
}
