/* eslint-disable */
export default {
  displayName: 'node-lib-one',
  rootDir: '../..',
  roots: ['<rootDir>/libs/node-lib-one'],
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/libs/node-lib-one/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/libs/node-lib-one',
};
