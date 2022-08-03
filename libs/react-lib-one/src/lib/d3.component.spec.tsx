import { render } from '@testing-library/react';

import D3Component from './d3.component';

describe(D3Component.name, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<D3Component />);
    expect(baseElement).toBeTruthy();
  });
});
