# TVB

Testing Validation Bench for nx testing plugins

This project is aimed at providing examples on how to use common libraries with @nrwl/jest & @nrwl/cypress and will be used for validating changes within those plugin to catch any potential issues.

## How to use

`npm run validate` to run all the tests in the library without any cache

> Note: [hyperfine](https://github.com/sharkdp/hyperfine) is required for benchmarks.
> They don't really do much right now other than just run. future work will go into this to make sure @nrwl/jest and @nrwl/cypress are performant

`npm run benchmark` to run a benchmark of various different parameters for the test

## Common Usage Help

### [Nano Id](https://github.com/ai/nanoid)

add nanoid to the transformIgnorePatterns patterns.
react (babel-jest) also requires adding a preset to the root babel.config.json file.

- [angular jest config](apps/ng-app-one/jest.config.ts)
- [react jest config](apps/react-app-one/jest.config.ts) + [react root babel config](babel.config.json)

### UUID (https://github.com/uuidjs/uuid)

should just work with the default jest configs

### Firebase (https://github.com/firebase/firebase-js-sdk)

should just work with the default jest configs

### d3 (https://github.com/d3/d3)

use a moduleNameMapper to point to the d3.min.js version instead of transpiling.
this can be in the root jest.preset.js or in the require projects jest.config.ts
[see jest.preset.js](jest.preset.js)

```js
// root jest.preset.js
const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^d3$': 'node_modules/d3/dist/d3.min.js',
  },
};
```

### Okta (https://github.com/okta/okta-auth-js)

Okta's login widget relies on the canvas api, you can mock this with the [jest-canvas-mock package](https://www.npmjs.com/package/jest-canvas-mock). You can add this to the `setupFilesAfterEnv` array.

```ts
// project level jest.config.ts
export default {
  // ... other config options
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts', 'jest-canvas-mock'],
};
```

## TODO

### Jest

- [ ] add code examples for Okta
- [ ] mock lib imports in app (https://github.com/nrwl/nx/issues/10029)
- [ ] use coveragePathIgnorePatterns from root dir (https://github.com/nrwl/nx/issues/10477)
- [ ] Merge code coverage reports together (https://github.com/nrwl/nx/issues/10423)
- Libraries to add to the list:
  - [KY](https://www.npmjs.com/package/ky)
  - [testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) ref: https://github.com/nrwl/nx/issues/9140

### Cypress

- [ ] using env vars within cypress
- [ ] static service FE app
- [ ] in depth component tests (ref: https://github.com/nrwl/nx/issues/11372)
