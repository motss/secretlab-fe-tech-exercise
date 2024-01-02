import { parse } from 'tyqs';

import { defaultOutOfRange } from '@/app/constants/global';
import type { ProductsSearchParams } from './types';

export function parseProductsSearchParams(searchParams: URLSearchParams): ProductsSearchParams {
  const parsed = parse<ProductsSearchParams>(searchParams, ({
    key,
    rawValue,
    value,
  }) => {
    if (key === 'filter.price' || key === 'filter.rating') {
      const [maybeMin, maybeMax] = rawValue;
      const min = maybeMin ?? '';
      const max = maybeMax ?? '';
      const minAsNumber = Number(min);
      const maxAsNumber = Number(max);

      if (min === '' && max === '') {
        return defaultOutOfRange;
      } else if (min === '') {
        return [-1, maxAsNumber];
      } else if (max == '') {
        return [minAsNumber, Infinity];
      }

      return [minAsNumber, maxAsNumber];
    }

    return value;
  });

  return parsed;
}
