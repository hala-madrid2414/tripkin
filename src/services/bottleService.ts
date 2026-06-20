import {
  bottleTypeOptions,
  defaultBottleImage,
  getBottleListByDest,
  type BottleListResult,
  type BottleMessage,
  type BottleType,
  typeLabels,
} from '@/pages/Bottle/data/bottleMockData'

export { bottleTypeOptions, defaultBottleImage, typeLabels }
export type { BottleMessage, BottleType }

export type BottleServiceListSource = 'direct' | 'parent' | 'fallback'

export interface BottleServiceListResult extends Omit<
  BottleListResult,
  'source'
> {
  source: BottleServiceListSource
}

export interface GetBottleListForDestinationOptions {
  destId: string
  destName: string
  parentId?: string
  parentName?: string
}

export interface CreateBottleMessageOptions {
  destId: string
  destName: string
  type: BottleType
  content: string
}

type BottleApiListResult = BottleListResult

const localCreatedBottlesByDest: Record<string, BottleMessage[]> = {}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() ?? ''
}

function buildApiUrl(path: string) {
  return `${getApiBaseUrl().replace(/\/+$/, '')}${path}`
}

async function requestBottleApi<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(buildApiUrl(path), init)

  if (!response.ok) {
    let errorMessage = `Bottle API 请求失败：${response.status}`

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

function adaptBottleListResult(
  result: BottleListResult,
): BottleServiceListResult {
  return {
    ...result,
    source: result.source === 'exact' ? 'direct' : result.source,
  }
}

function createLocalBottle({
  destId,
  destName,
  type,
  content,
}: CreateBottleMessageOptions): BottleMessage {
  const typeLabel = typeLabels[type]
  const newBottle: BottleMessage = {
    id: `user-${destId}-${Date.now()}`,
    type,
    content,
    tags: [typeLabel, destName, '刚投出'],
    from: '我投出的瓶子',
    destinationName: destName,
    createdAt: '刚刚',
    imageUrl: defaultBottleImage,
  }

  localCreatedBottlesByDest[destId] = [
    newBottle,
    ...(localCreatedBottlesByDest[destId] ?? []),
  ]

  return newBottle
}

export async function getBottleListForDestination(
  options: GetBottleListForDestinationOptions,
): Promise<BottleServiceListResult> {
  if (!getApiBaseUrl()) {
    const result = getBottleListByDest(options)

    return {
      ...adaptBottleListResult(result),
      items: [
        ...(localCreatedBottlesByDest[options.destId] ?? []),
        ...result.items,
      ],
    }
  }

  const result = await requestBottleApi<BottleApiListResult>(
    `/api/bottles?destinationId=${encodeURIComponent(options.destId)}`,
  )

  return adaptBottleListResult(result)
}

export async function createBottleMessage(
  options: CreateBottleMessageOptions,
): Promise<BottleMessage> {
  if (!getApiBaseUrl()) {
    return createLocalBottle(options)
  }

  return requestBottleApi<BottleMessage>('/api/bottles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      destinationId: options.destId,
      type: options.type,
      content: options.content,
    }),
  })
}
