import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initialStoreState } from '@/app/store/constants';
import type { StoreCart } from '@/app/store/types';
import type { ApiResponse } from '@/app/types/types';
import { getCartCalculation } from './getCartCalculation';

describe(getCartCalculation.name, () => {
  const mockFetch = vi.fn();
  const defaultResponse: ApiResponse<StoreCart> = {
    data: {
      discountTotal: 0,
      products: {},
      shouldRecalculate: false,
      subtotal: 0,
      total: 0,
    },
    error: undefined,
  };

  beforeEach(() => {
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          return defaultResponse;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  it('gets cart calculation', async () => {
    const result = await getCartCalculation(initialStoreState.cart);

    expect(result).toEqual(defaultResponse);
  });

  it('gets cart calculation error', async () => {
    const testError = new Error('test');
    mockFetch.mockImplementation(() => {
      return {
        async json() {
          throw testError;
        },
      };
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await getCartCalculation(initialStoreState.cart);

    expect(result).toEqual({
      data: undefined,
      error: testError,
    });
  });

});
