/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/next-lib-one'],
  displayName: 'next-lib-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/libs/next-lib-one/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/libs/next-lib-one',
};
