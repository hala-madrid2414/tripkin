import { Router } from 'express'
import {
  createBottleMessage,
  getBottleListByDestinationId,
} from '../data/bottles.js'
import type {
  BottleErrorPayload,
  BottleType,
  CreateBottleBody,
} from '../types/bottle.js'

function readDestinationId(
  value: unknown,
): { destinationId: string } | { error: BottleErrorPayload } {
  if (typeof value !== 'string' || value.trim() === '') {
    return {
      error: {
        error: {
          code: 'INVALID_QUERY',
          message: 'destinationId is required',
        },
      },
    }
  }

  return {
    destinationId: value.trim(),
  }
}

function isBottleType(value: unknown): value is BottleType {
  return (
    value === 'story' ||
    value === 'wish' ||
    value === 'guide' ||
    value === 'partner'
  )
}

function readCreateBody(
  body: unknown,
): { data: CreateBottleBody } | { error: BottleErrorPayload } {
  if (!body || typeof body !== 'object') {
    return {
      error: {
        error: {
          code: 'INVALID_BODY',
          message: 'destinationId is required',
        },
      },
    }
  }

  const candidate = body as Record<string, unknown>

  if (
    typeof candidate.destinationId !== 'string' ||
    candidate.destinationId.trim() === ''
  ) {
    return {
      error: {
        error: {
          code: 'INVALID_BODY',
          message: 'destinationId is required',
        },
      },
    }
  }

  if (!isBottleType(candidate.type)) {
    return {
      error: {
        error: {
          code: 'INVALID_BODY',
          message: 'type is invalid',
        },
      },
    }
  }

  if (
    typeof candidate.content !== 'string' ||
    candidate.content.trim() === ''
  ) {
    return {
      error: {
        error: {
          code: 'INVALID_BODY',
          message: 'content is required',
        },
      },
    }
  }

  return {
    data: {
      destinationId: candidate.destinationId.trim(),
      type: candidate.type,
      content: candidate.content.trim(),
    },
  }
}

export const bottleRouter = Router()

bottleRouter.get('/', (req, res) => {
  const query = readDestinationId(req.query.destinationId)

  if ('error' in query) {
    res.status(400).json(query.error)
    return
  }

  res.json(getBottleListByDestinationId(query.destinationId))
})

bottleRouter.post('/', (req, res) => {
  const body = readCreateBody(req.body)

  if ('error' in body) {
    res.status(400).json(body.error)
    return
  }

  const createdBottle = createBottleMessage(body.data)
  res.status(201).json(createdBottle)
})
