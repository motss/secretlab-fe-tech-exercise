import { apiProductsUrl } from '@/app/constants/global';
import type { Products } from '@/app/types/api-products';
import type { ApiResponse } from '@/app/types/types';

export async function getProducts(): Promise<ApiResponse<Products, Error>> {
  try {
    const response = await fetch(apiProductsUrl, {
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();

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
