import type { Product } from '@/app/types/api-product';

export interface ComputePriceWithoutDiscountInit extends Pick<Product, 'discountPercentage' | 'price'> {}

export interface ComputePriceWithoutDiscountResult extends Pick<Product, 'price'> {
  discountPrice: number;
  priceAfterDiscount: number;
}
