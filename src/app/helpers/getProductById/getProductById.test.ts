import { beforeEach, describe, expect, it, vi } from 'vitest';

import { productMock } from '@/app/__mocks__/product-mock';
import type { Product } from '@/app/types/api-product';
import type { ApiResponse } from '@/app/types/types';
import { getProductById } from './getProductById';

describe(getProductById.name, () => {
  const mockFetch = vi.fn();
  const defaultResponse: ApiResponse<Product> = {
    data: productMock,
    error: undefined,
  };

  beforeEach(() => {
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          return productMock;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  it('gets product by id', async () => {
    const result = await getProductById('1');

    expect(result).toEqual(defaultResponse);
  });

  it('gets product by id error', async () => {
    const testError = new Error('test');
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          throw testError;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await getProductById('1');

    expect(result).toEqual({
      data: undefined,
      error: testError,
    });
  });

});
