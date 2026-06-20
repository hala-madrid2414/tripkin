export type BottleType = 'story' | 'wish' | 'guide' | 'partner'

export interface BottleMessage {
  id: string
  type: BottleType
  content: string
  tags: string[]
  from: string
  destinationName: string
  createdAt: string
  imageUrl?: string
}

export type BottleListSource = 'exact' | 'parent' | 'fallback'

export interface BottleListPayload {
  items: BottleMessage[]
  source: BottleListSource
  sourceName?: string
}

export interface CreateBottleBody {
  destinationId: string
  type: BottleType
  content: string
}

export interface BottleErrorPayload {
  error: {
    code: 'INVALID_QUERY' | 'INVALID_BODY'
    message: string
  }
}
