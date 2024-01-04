import { beforeEach, describe, expect, it, vi } from 'vitest';

import { productMock } from '@/app/__mocks__/product-mock';
import { Products } from '@/app/types/api-products';
import type { ApiResponse } from '@/app/types/types';
import { getProducts } from './getProducts';

describe(getProducts.name, () => {
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

  it('gets products', async () => {
    const result = await getProducts();

    console.debug(result);
    expect(result).toEqual(defaultResponse);
  });

  it('gets products error', async () => {
    const testError = new Error('test');
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          throw testError;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await getProducts();

    expect(result).toEqual({
      data: undefined,
      error: testError,
    });
  });

});
