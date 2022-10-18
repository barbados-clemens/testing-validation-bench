/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/apps/ng-app-one'],
  displayName: 'ng-app-one',
  preset: './jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/apps/ng-app-one/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/apps/ng-app-one/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: './coverage/apps/ng-app-one',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|nanoid)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
