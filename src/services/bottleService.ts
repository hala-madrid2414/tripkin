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

interface GetBottleListForDestinationOptions {
  destId: string
  destName: string
  parentId?: string
  parentName?: string
}

export function getBottleListForDestination(
  options: GetBottleListForDestinationOptions,
): BottleServiceListResult {
  const result = getBottleListByDest(options)

  return {
    ...result,
    source: result.source === 'exact' ? 'direct' : result.source,
  }
}
