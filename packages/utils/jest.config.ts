import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}

export default config
