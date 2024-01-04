import { Big } from 'big.js';

import type { ComputePriceWithoutDiscountInit, ComputePriceWithoutDiscountResult } from './types';

export function computePriceWithoutDiscount({
  price,
  discountPercentage
}: ComputePriceWithoutDiscountInit): ComputePriceWithoutDiscountResult {
  const priceBig = new Big(price);
  const discountPercentageBig = new Big(discountPercentage ?? 0);
  const discountPriceBig = priceBig.times(discountPercentageBig).div(100);
  const priceAfterDiscountBig = priceBig.minus(discountPriceBig);

  return {
    price: priceBig.toNumber(),
    discountPrice: discountPriceBig.toNumber(),
    priceAfterDiscount: priceAfterDiscountBig.toNumber(),
  };
}
