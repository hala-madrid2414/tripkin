import { create } from 'zustand'

export type MatchMode = 'partner' | 'trip'

export interface MatchEntryContext {
  source: 'map' | 'direct'
  targetType?: 'region' | 'spot'
  regionId?: string
  spotId?: string
  destinationName?: string
}

interface MatchStore {
  mode: MatchMode
  entryContext: MatchEntryContext | null
  setMode: (mode: MatchMode) => void
  setEntryContext: (context: MatchEntryContext) => void
  clearEntryContext: () => void
}

export const useMatchStore = create<MatchStore>()((set) => ({
  mode: 'partner',
  entryContext: null,
  setMode: (mode) => set({ mode }),
  setEntryContext: (context) => set({ entryContext: context }),
  clearEntryContext: () => set({ entryContext: null }),
}))
