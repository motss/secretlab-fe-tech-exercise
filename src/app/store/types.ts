import { Product } from '../types/api-product';

export interface AppStoreActions {
  actions: StoreActions;
}

export interface AppStoreState {
  cart: StoreCart;
}

export interface AppStoreStateAndActions extends AppStoreState, AppStoreActions {}

interface StoreActions extends StoreCartActions {}

interface StoreCart {
  discountTotal: number;
  products: Record<string, StoreCartProduct>;
  subtotal: number;
  total: number;
}

export interface StoreCartActions {
  decrementProductCount(product: Product): void;
  getProductList(): StoreCartProduct[];
  getSummary(): Pick<StoreCart, 'discountTotal' | 'subtotal' | 'total'>;
  getTotalProductCount(): number;
  incrementProductCount(product: Product): void;
  removeProduct(product: Product): void;
}

interface StoreCartProduct {
  discountSubtotal: number;
  discountTotal: number;
  product: Product;
  count: number;
  soldOut: boolean;
  subtotal: number;
  total: number;
}