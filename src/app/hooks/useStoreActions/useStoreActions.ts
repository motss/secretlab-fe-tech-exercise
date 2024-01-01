import { useStore } from 'zustand';

import { store } from '@/app/store/store';
import type { UseStoreActionsResult } from './types';

export function useStoreActions(): UseStoreActionsResult {
  const { discountTotal, products, subtotal, total } = useStore(store, state => state.cart);
  const storeActions = useStore(store, state => state.actions);

  return {
    ...storeActions,
    getProductList: () => storeActions.getProductList(products),
    getSummary: () => storeActions.getSummary({ discountTotal, products, subtotal, total }),
    getTotalProductCount: () => storeActions.getTotalProductCount(products),
  };
}
