import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
  it('should use jest-dom from testing library', () => {
    document.body.innerHTML = `
    <span data-testid="not-empty"><span data-testid="empty"></span></span>
    <div data-testid="visible">Visible Example</div>
  `;

    expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement();
    expect(screen.getByText('Visible Example')).toBeVisible();
  });
});
