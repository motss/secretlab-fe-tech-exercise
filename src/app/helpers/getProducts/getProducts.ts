import { apiProductsUrl, toApiProductsOfCategoryUrl } from '@/app/constants/global';
import type { Products } from '@/app/types/api-products';
import type { ApiResponse } from '@/app/types/types';
import { filteredProductsWithPriceAndRating } from '../filteredProductsWithPriceAndRating/filteredProductsWithPriceAndRating';
import type { ProductsSearchParams } from '../parseProductsSearchParams/types';

export async function getProducts(maybeFilters?: ProductsSearchParams): Promise<ApiResponse<Products, Error>> {
  try {
    const filters = maybeFilters ?? {};
    const response = await fetch(
      filters.filter?.category ? toApiProductsOfCategoryUrl(filters.filter.category) : apiProductsUrl
    );
    const data = await response.json();

    const filteredProducts = filteredProductsWithPriceAndRating(data.products, filters);

    return {
      data: {
        ...data,
        products: filteredProducts,
        total: filteredProducts.length,
      },
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error as Error,
    };
  }
}
