import { describe, expect, it } from '@jest/globals'
import { sleep } from '../src/index'

describe('sleep (real timers)', () => {
  it('waits at least the specified time', async () => {
    const start = Date.now()

    await sleep(100)

    const duration = Date.now() - start
    expect(duration).toBeGreaterThanOrEqual(100)
  })
})
