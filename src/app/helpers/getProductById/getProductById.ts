import { toApiProductByIdUrl } from '@/app/constants/global';
import type { Product } from '@/app/types/api-product';
import type { ApiResponse } from '@/app/types/types';

export async function getProductById(id: string): Promise<ApiResponse<Product, Error>> {
  try {
    const response = await fetch(toApiProductByIdUrl(id), {
      headers: {
        'content-type': 'application/json',
      },
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
