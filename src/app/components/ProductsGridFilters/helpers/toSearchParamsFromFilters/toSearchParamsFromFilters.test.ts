import { describe, expect, it } from 'vitest';

import type { ProductsGridFiltersState } from '../../types';
import { toSearchParamsFromFilters } from './toSearchParamsFromFilters';

describe(toSearchParamsFromFilters.name, () => {
  const defaultState: ProductsGridFiltersState = {
    category: 'test',
    maxPrice: '10',
    maxRating: '5',
    minPrice: '1',
    minRating: '2',
  };

  it('parses filters into search params correctly', () => {
    const result = toSearchParamsFromFilters(defaultState);

    expect(Object.fromEntries(result)).toEqual({
      'filter.category': 'test',
      'filter.price': '1,10',
      'filter.rating': '2,5',
    });
  });

  it('parses empty filters into search params correctly', () => {
    const result = toSearchParamsFromFilters({
      category: '',
      maxPrice: '',
      maxRating: '',
      minPrice: '',
      minRating: '',
    } satisfies ProductsGridFiltersState);

    expect(Object.fromEntries(result)).toEqual({});
  });
});
