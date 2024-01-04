import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ApiResponse } from '@/app/types/types';
import { getProductsCategories } from './getProductsCategories';

describe(getProductsCategories.name, () => {
  const mockFetch = vi.fn();
  const defaultResponse: ApiResponse<string[]> = {
    data: ['a', 'b'],
    error: undefined,
  };

  beforeEach(() => {
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          return ['a', 'b'];
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  it('gets products categories', async () => {
    const result = await getProductsCategories();

    expect(result).toEqual(defaultResponse);
  });

  it('gets products categories error', async () => {
    const testError = new Error('test');
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          throw testError;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await getProductsCategories();

    expect(result).toEqual({
      data: undefined,
      error: testError,
    });
  });

});
