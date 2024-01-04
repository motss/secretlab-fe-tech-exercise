import { computePriceWithoutDiscount } from '@/app/helpers/computePriceWithDiscount/computePriceWithDiscount';
import { Pill } from '../Pill/Pill';
import type { DiscountProps } from './types';

export function Discount({
  discountPercentage,
  price,
}: DiscountProps) {
  const { discountPrice } = computePriceWithoutDiscount({ discountPercentage, price });

  return (
    <Pill className="!ps-2 !pe-2" as="p">
      Save ${discountPrice.toFixed(2)} ({discountPercentage}% off)
    </Pill>
  );
}
