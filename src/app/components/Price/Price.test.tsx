import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Price } from './Price';
import type { PriceProps } from './types';

describe('Price', () => {
  const defaultProps: PriceProps<'div'> = {
    discountPercentage: 0,
    price: 10,
  };

  it('renders correctly', () => {
    render(<Price {...defaultProps} />);

    expect(screen.getByText('S$10.00')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    render(<Price {...defaultProps} discountPercentage={1} />);

    expect(screen.getByText('S$9.90')).toBeInTheDocument();
    expect(screen.getByText('S$10.00')).toBeInTheDocument();
  });
});
