import { render } from '@testing-library/react';

import BlankContainer from './container';

describe('BlankContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BlankContainer>
        <main />
      </BlankContainer>,
    );
    expect(baseElement).toBeTruthy();
  });
});
