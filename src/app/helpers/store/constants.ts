import type { AppStoreState } from '@/app/types/store';

export const initialStoreState: AppStoreState = {
  cart: {
    discountTotal: 0,
    products: {},
    subtotal: 0,
    total: 0,
  },
};
