import JSDOMEnvironment from 'jest-environment-jsdom'
import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment'

/**
 * jest-environment-jsdom v29 uses jsdom v20 which lacks the Fetch API globals
 * (Request, Response, Headers, etc.) required by msw v2 / @mswjs/interceptors.
 * Node 22 provides these built-ins, so we copy them into the jsdom window here,
 * before any test code runs.
 */
class FixedJSDOMEnvironment extends JSDOMEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)

    this.global.Request = Request
    this.global.Response = Response
    this.global.Headers = Headers
    this.global.FormData = FormData
    this.global.ReadableStream = ReadableStream
    this.global.TransformStream = TransformStream
    this.global.TextEncoder = TextEncoder
    this.global.TextDecoder = TextDecoder
  }
}

export default FixedJSDOMEnvironment
