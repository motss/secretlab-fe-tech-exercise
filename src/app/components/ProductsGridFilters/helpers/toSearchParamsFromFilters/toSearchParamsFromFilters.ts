import type { ProductsGridFiltersState } from '../../types';

export function toSearchParamsFromFitlers({
  category,
  maxPrice,
  maxRating,
  minPrice,
  minRating,
}: ProductsGridFiltersState) {
  const searchParams = new URLSearchParams({
    ...(category && { 'filter.category': category }),
    ...(minPrice || maxPrice ? { 'filter.price': `${minPrice},${maxPrice}` } : {}),
    ...(minRating || maxRating ? { 'filter.rating': `${minRating},${maxRating}` } : {}),
  });

  searchParams.sort();

  return searchParams;
}
