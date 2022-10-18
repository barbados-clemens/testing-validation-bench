/* eslint-disable */
export default {
  rootDir: '../..',
  roots: ['<rootDir>/apps/react-app-one'],
  displayName: 'react-app-one',
  preset: './jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['/node_modules/(?!nanoid/)'],
  coverageDirectory: './coverage/apps/react-app-one',
};
