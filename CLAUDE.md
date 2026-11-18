# Planificador docente

App local-first para que el profesorado planifique el curso y lo reprograme cuando se pierde una sesión.
Monorepo con pnpm. Todo en TypeScript.

## Estado

- Hecho: módulo 1 (monorepo) y módulo 2 (API con Hono desplegada en Workers, `/api/salud`).
- Siguiente: módulo 3 (validación con Zod, tests con Vitest, cliente RPC).
- La web (`apps/web`) y el algoritmo (`packages/planner`) aún no existen.

## Estructura

- `apps/api`: Hono en Cloudflare Workers, D1, Zod. Rutas bajo `/api`.
- `apps/web`: Nuxt (Vue 3 + TS), SPA, Dexie, PWA. Llamará a la API con el cliente RPC de Hono.
- `packages/planner`: reparto y reprogramación de sesiones, TS puro, lo usarán la web y la API.

## Comandos

- API en local: `cd apps/api && pnpm dev` (http://localhost:8787/api/salud)
- Tipos de bindings tras tocar `wrangler.jsonc`: `cd apps/api && pnpm cf-typegen`
- Lint: `pnpm lint` · Tipos de la API: `pnpm typecheck`
- Migración nueva: `cd apps/api && pnpm wrangler d1 migrations create DB <nombre>`
- Aplicar migraciones en local: `pnpm wrangler d1 migrations apply DB --local`

## Reglas

- Rutas de Hono siempre encadenadas desde `new Hono()` para no perder los tipos RPC; exporta `AppType`.
- Toda entrada se valida con `zValidator` y un esquema de `apps/api/src/esquemas.ts`.
- SQL siempre con `?` y `.bind()`, nunca concatenando valores.
- Nunca leas ni edites `.dev.vars` ni secretos; usa `.dev.vars.example` para saber qué variables existen.
- No despliegues ni toques la base de datos remota: el despliegue lo hace GitHub Actions.
- Commits con Conventional Commits y ámbito: `feat(api): ...`, `fix(web): ...`, `chore(repo): ...`.
- Cada cambio en `packages/planner` lleva test.
- Textos de la interfaz en castellano.
- Antes de dar una tarea por terminada: `pnpm lint` y `pnpm typecheck` sin errores.

## Documentación

- Plan: https://claude.ai/artifact/LhoDCd4pVJx7CjHd8KwNHn
- Curso: https://claude.ai/artifact/9a5r3hLM74MPeR2a7Wt7h5
- Ante dudas de Workers, D1 o Wrangler, consulta la documentación actual (plugin de Cloudflare) en lugar de recordarla.
