import { describe, expect, it } from 'vitest';

import { formatPrice } from './formatPrice';

describe(formatPrice.name, () => {
  it('formats price correctly', () => {
    const result = formatPrice(1111);

    expect(result).toBe('S$1,111.00');
  });

});
