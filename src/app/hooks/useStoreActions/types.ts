import { StoreCartActions } from '@/app/store/types';

type RemoveFunctionArgsByKey<T extends object, Key extends keyof T> = {
  [K in keyof T]: K extends Key ?
  T[K] extends (...args: infer _Args) => infer R ?
  () => R :
  T[K]
  : T[K];
};

export interface UseStoreActionsResult extends RemoveFunctionArgsByKey<StoreCartActions, 'getProductList' | 'getSummary' | 'getTotalProductCount'> {}
