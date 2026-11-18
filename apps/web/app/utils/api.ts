import { hc } from 'hono/client'
import type { AppType } from '@planificador/api'

export const api = hc<AppType>('/')