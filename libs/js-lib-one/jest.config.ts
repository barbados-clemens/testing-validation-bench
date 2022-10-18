/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/js-lib-one'],
  displayName: 'js-lib-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: './libs/js-lib-one/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/libs/js-lib-one',
  coverageReporters: ['text-summary'],
  // coveragePathIgnorePatterns: ['no-coverage.ts'],
};
