import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .basePath('/api')
  .get('/health', (c) => {
    return c.json({ status: 'ok' })
  }
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type AppType = typeof app
  
export default app
