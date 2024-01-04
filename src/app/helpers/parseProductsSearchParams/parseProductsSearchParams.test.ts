import { describe, expect, it } from 'vitest';

import { parseProductsSearchParams } from './parseProductsSearchParams';
import type { ProductsSearchParams } from './types';

describe(parseProductsSearchParams.name, () => {
  const defaultSearchParams = new URLSearchParams({
    'filter.category': 'test',
    'filter.price': '1,',
    'filter.rating': ',4.4',
  });

  it('parses product search params correctly', () => {
    const result = parseProductsSearchParams(defaultSearchParams);

    expect(result).toEqual({
      filter: {
        category: 'test',
        price: [1, Infinity],
        rating: [-1, 4.4],
      }
    } as ProductsSearchParams);
  });

});;
