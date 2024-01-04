import { describe, expect, it } from 'vitest';

import { productMock } from '@/app/__mocks__/product-mock';
import type { ProductsSearchParams } from '../parseProductsSearchParams/types';
import { filteredProductsWithPriceAndRating } from './filteredProductsWithPriceAndRating';

describe(filteredProductsWithPriceAndRating.name, () => {
  const defaultProductList = [productMock];
  const defaultProductSearchParams: ProductsSearchParams = {
    filter: {
      category: 'test',
      price: [1, Infinity],
      rating: [-1, 4.4],
    },
  };

  it('filters product list correctly', () => {
    const result = filteredProductsWithPriceAndRating(defaultProductList, defaultProductSearchParams);

    expect(result).toEqual([productMock]);
  });

  it('filters product list with empty filters correctly', () => {
    const result = filteredProductsWithPriceAndRating(defaultProductList, {});

    expect(result).toEqual([productMock]);
  });

  it('filters product list with no-match filters correctly', () => {
    const result = filteredProductsWithPriceAndRating(defaultProductList, {
      filter: {
        price: [-1, 30],
        rating: [4.7, Infinity],
      }
    });

    expect(result).toEqual([]);
  });

});
