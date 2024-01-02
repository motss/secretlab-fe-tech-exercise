import { useStore } from 'zustand';

import { store } from '@/app/store/store';
import type { UseStoreActionsResult } from './types';

export function useStoreActions(): UseStoreActionsResult {
  const cart = useStore(store, state => state.cart);
  const storeActions = useStore(store, state => state.actions);

  return {
    ...storeActions,
    getProductList: () => storeActions.getProductList(cart.products),
    getSummary: () => storeActions.getSummary(cart),
    getTotalProductCount: () => storeActions.getTotalProductCount(cart.products),
  };
}
