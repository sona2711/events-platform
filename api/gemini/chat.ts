import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleGeminiRoute } from './handlers'

const readBody = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk: Buffer | string) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        resolve(body ? (JSON.parse(body) as unknown) : null)
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ message: 'Method not allowed.' }))
    return
  }

  try {
    const body = await readBody(req)
    const result = await handleGeminiRoute('POST', '/api/gemini/chat', body)

    if (!result) {
      res.statusCode = 404
      res.end(JSON.stringify({ message: 'Not found.' }))
      return
    }

    res.statusCode = result.status
    res.end(JSON.stringify(result.body))
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ message: error instanceof Error ? error.message : 'Internal server error.' }))
  }
}
