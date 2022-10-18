/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/apps/nest-app-one'],
  displayName: 'nest-app-one',
  preset: './jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/apps/nest-app-one/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/apps/nest-app-one',
};
