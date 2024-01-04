import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Discount } from './Discount';
import { DiscountProps } from './types';

describe('Discount', () => {
  const defaultProps: DiscountProps = {
    discountPercentage: 0,
    price: 10,
  };

  it('renders correctly', () => {
    render(<Discount {...defaultProps} />);

    expect(screen.getByText('Save S$0.00 (0% off)')).toBeInTheDocument();
  });
});
