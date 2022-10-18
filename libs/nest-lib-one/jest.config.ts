/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/nest-lib-one'],
  displayName: 'nest-lib-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/libs/nest-lib-one/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/libs/nest-lib-one',
};
