import { Big } from 'big.js';

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
  const discountFontSizeCls = isSizeSmall ? 'text-xs' : 'text-sm';

  const priceBig = new Big(price);
  const discountPercentageBig = new Big(discountPercentage ?? 0);
  const discountPriceBig = priceBig.times(discountPercentageBig).div(100);
  const discountedPriceBig = priceBig.minus(discountPriceBig);

  return (
    <Comp className={`flex items-center gap-2 ${className}`}>
      <p className={discountPriceBig.toNumber() ? `line-through text-gray-500 ${fontSizeCls}` : 'text-slate-950'}>{priceBig.toFixed(2)}</p>
      {discountedPriceBig ? (
        <>
          <p className={fontSizeCls}>${discountedPriceBig.toFixed(2)}</p>
          <p className={`bg-pink-600 text-white rounded-2xl p-1 px-2 ${discountFontSizeCls}`}>{'-'}{discountPercentageBig.toFixed(2)}%</p>
        </>
      ) : null}
    </Comp>
  );
}
