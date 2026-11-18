import { env } from 'cloudflare:workers'
import { expect, it } from 'vitest'
import app from '../src/index'

it('should return 200 OK for /api/health', async () => {
    const res = await app.request('/api/health', {}, env)
    expect(await res.json()).toEqual({ status: 'ok' })
})

it('reject invalid batch', async () => {
    const res = await app.request('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sinceVersion: 1, changes: 'no es una lista' }),
    }, env)
    expect(res.status).toBe(400)
})