const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^d3$': 'node_modules/d3/dist/d3.min.js',
  },
};
