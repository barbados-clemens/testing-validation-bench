const nxPreset = require('@nrwl/jest/preset').default;
const path = require('path');
module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: [path.resolve(__dirname, './setup-testing-library.js')],
  moduleNameMapper: {
    '^d3$': 'node_modules/d3/dist/d3.min.js',
  },
};
