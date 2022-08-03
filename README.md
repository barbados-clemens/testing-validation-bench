# TVB

Testing Validation Bench for nx testing plugins

## Notes

nano id requires adding extra transform in the project jest config
with react there is an issue where the preset has to be included in the root level babel.config.json
firebase seems to work fine without any transforms or resolver overrides?

### Nano Id

add nanoid to the transformIgnorePatterns patterns.
react (babel-jest) also requires adding a preset to the root babel.config.json file.

- [angular jest config](apps/ng-app-one/jest.config.ts)
- [react jest config](apps/react-app-one/jest.config.ts) + [react root babel config](babel.config.json)
