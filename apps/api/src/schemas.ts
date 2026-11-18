import { z } from 'zod'

export const Change = z.object({
    id: z.string(),
    table: z.string(),
    field: z.string(),
    value: z.union([z.string(), z.number(), z.null()]),
    version: z.number().int(),
})

export const BatchChanges = z.object({
    sinceVersion: z.number().int(),
    changes: z.array(Change).max(200),
})