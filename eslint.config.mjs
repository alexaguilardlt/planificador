// ESLint para la API y el algoritmo (TypeScript).
// La web (Nuxt) tendrá su propia configuración con @nuxt/eslint en el módulo 7.
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      '**/node_modules/**',
      '**/.wrangler/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/worker-configuration.d.ts',
      'apps/web/**',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // Permite parámetros sin usar si empiezan por _ (p. ej. _c en un handler)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Avisa de console.log olvidados; console.error y console.warn se permiten
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
)
