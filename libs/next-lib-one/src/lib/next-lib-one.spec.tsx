import { render } from '@testing-library/react';

import NextLibOne from './next-lib-one';

describe('NextLibOne', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLibOne />);
    expect(baseElement).toBeTruthy();
  });
});
