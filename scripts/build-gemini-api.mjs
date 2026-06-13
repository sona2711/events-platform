import * as esbuild from 'esbuild'
import { mkdirSync } from 'node:fs'

mkdirSync('api/gemini', { recursive: true })

await esbuild.build({
  entryPoints: ['server/gemini/vercelEntry.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'api/gemini/chat.cjs',
  format: 'cjs',
  logLevel: 'info',
  footer: {
    js: 'module.exports = module.exports.default;',
  },
})
