import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect } from 'vite'
import type { Plugin } from 'vite'
import { handleGeminiRoute } from '../../api/gemini/_lib/handlers.js'
import { loadGeminiEnv } from './loadEnv'

const readRequestBody = (request: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk: Buffer | string) => {
      body += chunk.toString()
    })

    request.on('end', () => {
      if (!body) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(body) as unknown)
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })

const sendJson = (response: ServerResponse, status: number, body: Record<string, unknown>) => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

const createGeminiMiddleware =
  (): Connect.NextHandleFunction => (request, response, next) => {
    const url = new URL(request.url ?? '/', 'http://localhost')

    if (!url.pathname.startsWith('/api/gemini')) {
      next()
      return
    }

    void (async () => {
      try {
        const requestBody =
          request.method === 'POST' || request.method === 'PUT' ? await readRequestBody(request) : null

        const result = await handleGeminiRoute(request.method ?? 'GET', url.pathname, requestBody)

        if (!result) {
          sendJson(response, 404, { message: 'Not found.' })
          return
        }

        sendJson(response, result.status, result.body)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to handle Gemini API request.'
        sendJson(response, 500, { message })
      }
    })()
  }

export const geminiApiPlugin = (): Plugin => {
  loadGeminiEnv()

  return {
    name: 'gemini-api',
    configureServer(server) {
      server.middlewares.use(createGeminiMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(createGeminiMiddleware())
    },
  }
}
