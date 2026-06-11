import '@testing-library/jest-dom'

jest.mock('@/__mocks__/telegramBot', () => ({
  sendOrderToTelegram: jest.fn(async () => ({ ok: true })),
}))

;(globalThis as { __IS_JEST__?: boolean }).__IS_JEST__ = true

if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = jest.fn(() => 'blob:mock-url')
}

if (typeof URL.revokeObjectURL !== 'function') {
  URL.revokeObjectURL = jest.fn()
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
