import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ApiResponse } from '@/app/types/types';
import { getProductsOfCategory } from './getProductsOfCategory';
import { Products } from '@/app/types/api-products';
import { productMock } from '@/app/__mocks__/product-mock';

describe(getProductsOfCategory.name, () => {
  const mockFetch = vi.fn();
  const defaultResponse: ApiResponse<Products> = {
    data: {
      limit: 30,
      products: [productMock],
      skip: 0,
      total: 1,
    },
    error: undefined,
  };

  beforeEach(() => {
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          return defaultResponse.data;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  it('gets products of category', async () => {
    const result = await getProductsOfCategory('test');

    expect(result).toEqual(defaultResponse);
  });

  it('gets products of category error', async () => {
    const testError = new Error('test');
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          throw testError;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await getProductsOfCategory('test');

    expect(result).toEqual({
      data: undefined,
      error: testError,
    });
  });

});
