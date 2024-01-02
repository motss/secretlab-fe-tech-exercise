import { parseProductsSearchParams } from '@/app/helpers/parseProductsSearchParams/parseProductsSearchParams';
import type { ProductsGridFiltersState } from '../../types';

export function parseSearchParamsIntoFilters(searchParams: URLSearchParams): ProductsGridFiltersState {
  const currentSearchParams = new URLSearchParams(searchParams);

  currentSearchParams.sort();

  const filters = parseProductsSearchParams(currentSearchParams);
  const [minPrice, maxPrice] = filters.filter?.price ?? [];
  const [minRating, maxRating] = filters.filter?.rating ?? [];
  const state = {
    category: filters.filter?.category ?? '',
    minPrice: (minPrice ?? -1) === -1 ? '' : String(minPrice),
    maxPrice: (maxPrice ?? Infinity) === Infinity ? '' : String(maxPrice),
    minRating: (minRating ?? -1) === -1 ? '' : String(minRating),
    maxRating: (maxRating ?? Infinity) === Infinity ? '' : String(maxRating),
  };

  return state;
}
