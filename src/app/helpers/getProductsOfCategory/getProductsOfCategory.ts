import { toApiProductsOfCategoryUrl } from '@/app/constants/global';
import type { Products } from '@/app/types/api-products';
import type { ApiResponse } from '@/app/types/types';

export async function getProductsOfCategory(category: string): Promise<ApiResponse<Products, Error>> {
  try {
    const response = await fetch(toApiProductsOfCategoryUrl(category), {
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
