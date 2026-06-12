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
    '^swiper/modules$': '<rootDir>/src/__mocks__/swiperModules.ts',
    '^swiper/react$': '<rootDir>/src/__mocks__/swiperReact.tsx',
    '^react-markdown$': '<rootDir>/src/__mocks__/reactMarkdown.tsx',
    '^swiper/css(?:/.*)?$': 'identity-obj-proxy',
    '^@/(.*)\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(antd|@ant-design|rc-|@rc-component|msw|@mswjs)/)',
  ],
  testMatch: [
    '**/__tests__/**/*.{ts,tsx}',
    '**/*.{spec,test}.{ts,tsx}',
    'api/**/*.{spec,test}.{ts,tsx}',
  ],
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
