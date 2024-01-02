import { apiCartUrl } from '@/app/constants/global';
import type { StoreCart } from '@/app/store/types';
import type { ApiResponse } from '@/app/types/types';

export async function getCartCalculation({ products }: StoreCart, init?: RequestInit): Promise<ApiResponse<StoreCart, Error>> {
  try {
    const response = await fetch(apiCartUrl, {
      body: JSON.stringify({ products }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      ...init,
    });
    const { data, error } = await response.json() as ApiResponse<StoreCart, Error>;

    if (error) {
      throw error;
    }

    return {
      data,
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error as Error,
    };
  }
}
