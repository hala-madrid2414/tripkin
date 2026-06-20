import express from 'express'
import { bottleRouter } from './routes/bottles.js'
import { matchRouter } from './routes/matches.js'

function isAllowedLocalOrigin(origin: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
}

export function createApp() {
  const app = express()

  app.use((req, res, next) => {
    const origin = req.headers.origin

    if (typeof origin === 'string' && isAllowedLocalOrigin(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    }

    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }

    next()
  })

  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'tripkin-server',
    })
  })

  app.use('/api/bottles', bottleRouter)
  app.use('/api/matches', matchRouter)

  return app
}
