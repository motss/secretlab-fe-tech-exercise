import type { ComponentProps } from 'react';

import type { Product } from '@/app/types/api-product';

export interface ProductsGridProps extends ComponentProps<'div'> {
  products: Product[];
}
