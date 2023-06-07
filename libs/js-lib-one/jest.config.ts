/* eslint-disable */
export default {
  displayName: 'js-lib-one',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/js-lib-one',
  coverageReporters: ['text-summary'],
  // coveragePathIgnorePatterns: ['no-coverage.ts'],
};
