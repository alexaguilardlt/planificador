import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { BatchChanges } from './schemas'

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .basePath('/api')
  .get('/health', (c) => {
    return c.json({ status: 'ok' })
  })
  .post('/sync', zValidator('json', BatchChanges), (c) => {
    const batch = c.req.valid('json')
    return c.json({ received: batch.changes.length, version: batch.sinceVersion + 1})
  }
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type AppType = typeof app
  
export default app
