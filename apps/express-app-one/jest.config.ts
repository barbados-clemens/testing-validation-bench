/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/js-lib-one'],
  displayName: 'express-app-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: './apps/express-app-one/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/apps/express-app-one',
};
