/* eslint-disable */
export default {
  displayName: 'next-app-one',
  preset: '../../jest.preset.js',
  // blah I'm a comment
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['/node_modules/(?!nanoid/)'],
  /**
   * I sure am a comment
   */
  coverageDirectory: '../../coverage/apps/next-app-one',
};
