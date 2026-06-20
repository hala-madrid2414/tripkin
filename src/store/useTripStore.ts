import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PersonaId, TripSession } from '@/types/mbti'

/**
 * 跨页面共享的旅行会话仓库（Zustand）。
 *
 * - MBTI 完成后通过 setMbtiResult 写入结果，Map / Match 页面直接读取。
 * - destination 在进入 /mbti 时由 URL ?dest= 写入（setDestination）。
 *
 * 这里只放跨页面共享的状态；页面私有 UI 状态（当前视图、当前题号等）
 * 留在组件内，不进仓库（见 docs/coding-guide.md：src/store 的使用边界）。
 */

interface TripStore extends TripSession {
  /** 写入 MBTI 完成结果（会同步把 moduleStatus 置为 completed） */
  setMbtiResult: (
    payload: Partial<TripSession> & { personaId: PersonaId },
  ) => void
  /** 写入目的地（进入 /mbti 时由 URL 参数触发） */
  setDestination: (destination: string) => void
}

const initialSession: TripSession = {
  personaId: null,
  mbtiTypeCn: null,
  mbtiTypeEn: null,
  classicMbti: null,
  tagline: null,
  tags: [],
  nickname: null,
  destination: '西藏',
  avatarKey: null,
  accent: null,
  socialIntent: null,
  moduleStatus: null,
  skipped: false,
  rawScores: {},
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      ...initialSession,
      setMbtiResult: (payload) =>
        set({ ...payload, moduleStatus: 'completed' }),
      setDestination: (destination) => set({ destination }),
    }),
    {
      name: 'tripkin-trip-session-v1',
      partialize: (state) => ({
        personaId: state.personaId,
        mbtiTypeCn: state.mbtiTypeCn,
        mbtiTypeEn: state.mbtiTypeEn,
        classicMbti: state.classicMbti,
        tagline: state.tagline,
        tags: state.tags,
        nickname: state.nickname,
        destination: state.destination,
        avatarKey: state.avatarKey,
        accent: state.accent,
        socialIntent: state.socialIntent,
        moduleStatus: state.moduleStatus,
        skipped: state.skipped,
        rawScores: state.rawScores,
      }),
    },
  ),
)
