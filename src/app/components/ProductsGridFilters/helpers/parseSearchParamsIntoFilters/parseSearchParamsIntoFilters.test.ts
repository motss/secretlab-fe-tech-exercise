import { describe, expect, it } from 'vitest';

import type { ProductsGridFiltersState } from '../../types';
import { parseSearchParamsIntoFilters } from './parseSearchParamsIntoFilters';

describe(parseSearchParamsIntoFilters.name, () => {
  const defaultSearchParams = new URLSearchParams({
    'filter.category': 'test',
    'filter.price': '1,',
    'filter.rating': ',4.44',
  });

  it('parses search params into filters correctly', () => {
    const result = parseSearchParamsIntoFilters(defaultSearchParams);

    expect(result).toEqual({
      category: 'test',
      maxPrice: '',
      maxRating: '4.44',
      minPrice: '1',
      minRating: '',
    } satisfies ProductsGridFiltersState);
  });

  it('parses missing search params into filters correctly', () => {
    const result = parseSearchParamsIntoFilters(new URLSearchParams({}));

    expect(result).toEqual({
      category: '',
      maxPrice: '',
      maxRating: '',
      minPrice: '',
      minRating: '',
    } satisfies ProductsGridFiltersState);
  });

  it('parses empty search params into filters correctly', () => {
    const result = parseSearchParamsIntoFilters(new URLSearchParams({
      'filter.category': '',
      'filter.price': '',
      'filter.rating': '',
    }));

    expect(result).toEqual({
      category: '',
      maxPrice: '',
      maxRating: '',
      minPrice: '',
      minRating: '',
    } satisfies ProductsGridFiltersState);
  });
});
