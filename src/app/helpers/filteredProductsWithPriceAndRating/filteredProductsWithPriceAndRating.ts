import { defaultOutOfRange } from '@/app/constants/global';
import type { Product } from '@/app/types/api-product';
import type { ProductsSearchParams } from '../parseProductsSearchParams/types';

export function filteredProductsWithPriceAndRating(products: Product[], { filter }: ProductsSearchParams) {
  const filtered = products.filter((product) => {
    const [minPrice, maxPrice] = filter?.price ?? defaultOutOfRange;
    const [minRating, maxRating] = filter?.rating ?? defaultOutOfRange;

    const isWithinPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const isWithinRatingRange = product.rating >= minRating && product.rating <= maxRating;

    return isWithinPriceRange && isWithinRatingRange;
  });

  return filtered;
}
