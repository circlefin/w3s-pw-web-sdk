/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestNodeConfig = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...jestNodeConfig,
  rootDir: './',
  displayName: 'web-sdk',
  testEnvironment: 'jsdom',
}
