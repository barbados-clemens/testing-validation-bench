import { render } from '@testing-library/react';

import ReactLibOne from './react-lib-one';

describe('ReactLibOne', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactLibOne />);
    expect(baseElement).toBeTruthy();
  });
});
