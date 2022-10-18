/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>libs/ng-lib-one'],
  displayName: 'ng-lib-one',
  preset: './jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>libs/ng-lib-one/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './libs/ng-lib-one/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: './coverage/libs/ng-lib-one',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
