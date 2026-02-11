import request from 'supertest'
import express from 'express'

import { describe, expect, it } from '@jest/globals'

const app = express()
app.get('/health', (_req, res) => res.send('OK'))

describe('GET /health', () => {
  it('responds 200 OK', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.text).toBe('OK')
  })
})
