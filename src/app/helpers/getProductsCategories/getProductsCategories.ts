import { apiProductsCategoriesUrl } from '@/app/constants/global';
import type { ApiResponse } from '@/app/types/types';

export async function getProductsCategories(): Promise<ApiResponse<string[], Error>> {
  try {
    const response = await fetch(apiProductsCategoriesUrl, {
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
