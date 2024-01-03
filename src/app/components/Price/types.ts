import type { ComponentProps } from 'react';

import type { Product } from '@/app/types/api-product';

type K = keyof JSX.IntrinsicElements;
type P = Pick<Product, 'discountPercentage' | 'price'>;

export type PriceProps<T extends K> = ComponentProps<T> & P & {
  as?: T;
  size?: 'small';
};
