import type { Config } from 'jest'

const config: Config = {
  testEnvironment: '<rootDir>/jest.environment.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock the msw server to avoid loading msw's ESM-only dependency chain in CJS jest.
    // None of the current test suites make real API calls so the server is not needed.
    '^.*/mock-api/server$': '<rootDir>/src/__mocks__/server.ts',
  },
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(antd|@ant-design|rc-|@rc-component)/)',
  ],
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/mock-api/**',
    '!src/__mocks__/**',
    '!src/main.tsx',
    '!src/lib/firebase.ts',
  ],
}

export default config
