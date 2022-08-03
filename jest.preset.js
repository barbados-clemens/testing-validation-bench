const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
};
