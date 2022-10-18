/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/ws-lib-one'],
  displayName: 'ws-lib-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/libs/ws-lib-one/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/libs/ws-lib-one',
};
