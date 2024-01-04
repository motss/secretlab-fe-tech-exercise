import type { Product } from '@/app/types/api-product';

export interface DiscountProps extends Pick<Product, 'discountPercentage' | 'price'> {}
