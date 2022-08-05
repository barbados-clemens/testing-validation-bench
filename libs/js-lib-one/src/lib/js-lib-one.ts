import { blah } from './no-coverage';

export function jsLibOne(isBranch = false): string {
  if (isBranch) {
    return blah();
  }
  return 'js-lib-one';
}
