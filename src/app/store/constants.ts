import type { AppStoreState } from '@/app/store/types';

export const initialStoreState: AppStoreState = {
  cart: {
    discountTotal: 0,
    products: {},
    shouldRecalculate: true,
    subtotal: 0,
    total: 0,
  },
};
