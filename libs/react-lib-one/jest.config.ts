/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/libs/react-lib-one'],
  displayName: 'react-lib-one',
  preset: './jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/libs/react-lib-one',
};
