import { computePriceWithoutDiscount } from '@/app/helpers/computePriceWithDiscount/computePriceWithDiscount';
import { formatPrice } from '@/app/helpers/formatPrice/formatPrice';
import type { PriceProps } from './types';

export function Price<As extends keyof JSX.IntrinsicElements>({
  as,
  className,
  discountPercentage,
  price,
  size,
}: PriceProps<As>) {
  const Comp = (as ?? 'div') as keyof JSX.IntrinsicElements;

  const isSizeSmall = size === 'small';
  const fontSizeCls = isSizeSmall ? 'text-lg' : 'text-2xl';

  const { priceAfterDiscount } = computePriceWithoutDiscount({ discountPercentage, price });

  return (
    <Comp className={`flex items-baseline gap-2 ${className}`}>
      {priceAfterDiscount ? (
        <>
          <p className={fontSizeCls}>{formatPrice(priceAfterDiscount)}</p>
        </>
      ) : null}
      <p className={priceAfterDiscount ? `line-through text-gray-500 ${isSizeSmall ? 'text-sm' : 'text-lg'}` : `${fontSizeCls}`}>{formatPrice(price)}</p>
    </Comp>
  );
}
