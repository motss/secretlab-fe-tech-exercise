import type { ComponentProps } from 'react';

import type { Product } from '@/app/types/api-product';
import type { OmitKey } from '@/app/types/utility';

export interface AddToCartProps extends
  OmitKey<ComponentProps<'div'>, 'onClick' | 'onInput'>,
  Pick<ComponentProps<'input'>, 'onInput' | 'value'>,
  Pick<ComponentProps<'button'>, 'onClick'>,
  Pick<Product, 'stock'> {}
