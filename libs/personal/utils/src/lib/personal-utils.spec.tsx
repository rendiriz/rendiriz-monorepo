import { render } from '@testing-library/react';

import PersonalUtils from './personal-utils';

describe('PersonalUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PersonalUtils />);
    expect(baseElement).toBeTruthy();
  });
});
