# TVB

Testing Validation Bench for nx testing plugins

## Notes

nano id requires adding extra transform in the project jest config
with react there is an issue where the preset has to be included in the root level babel.config.json
firebase seems to work fine without any transforms or resolver overrides?

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
[see ng-lib-one library](libs/ng-lib-one/src/lib/d3.component.ts)

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
