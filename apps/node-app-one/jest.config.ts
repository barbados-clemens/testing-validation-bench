/* eslint-disable */
export default {
  displayName: 'node-app-one',
  rootDir: '../..',
  roots: ['<rootDir>/apps/node-app-one'],
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/apps/node-app-one/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/apps/node-app-one',
};
