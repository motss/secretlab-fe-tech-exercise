import { describe, expect, it } from 'vitest';

import { computePriceWithoutDiscount } from './computePriceWithDiscount';
import type { ComputePriceWithoutDiscountResult } from './types';

describe(computePriceWithoutDiscount.name, () => {
  it('returns price without discount correctly', () => {
    const result = computePriceWithoutDiscount({ price: 10, discountPercentage: 0 });

    expect(result).toEqual({
      discountPrice: 0,
      price: 10,
      priceAfterDiscount: 10,
    } satisfies ComputePriceWithoutDiscountResult);
  });

  it('returns price with discount correctly', () => {
    const result = computePriceWithoutDiscount({ price: 10, discountPercentage: 10 });

    expect(result).toEqual({
      discountPrice: 1,
      price: 10,
      priceAfterDiscount: 9,
    } satisfies ComputePriceWithoutDiscountResult);
  });
});
