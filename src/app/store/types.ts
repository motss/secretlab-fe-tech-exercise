import type { Product } from '../types/api-product';
import type { OmitKey } from '../types/utility';

export interface AppStoreActions {
  actions: StoreActions;
}

export interface AppStoreState {
  cart: StoreCart;
}

export interface AppStoreStateAndActions extends AppStoreState, AppStoreActions {}

interface StoreActions extends StoreCartActions {}

export interface StoreCart {
  discountTotal: number;
  error?: Error;
  products: Record<string, StoreCartProduct>;
  shouldRecalculate: boolean;
  subtotal: number;
  total: number;
}

export interface StoreCartActions {
  decrementProductCountBy(product: Product, offset?: number): void;
  getProduct(product: Product): StoreCartProduct | undefined;
  getProductList(products: NonNullable<StoreCart['products']>): StoreCartProduct[];
  getSummary(cart: StoreCart): OmitKey<StoreCart, 'products' | 'shouldRecalculate'>;
  getTotalProductCount(products: NonNullable<StoreCart['products']>): number;
  incrementProductCountBy(product: Product, offset?: number): void;
  removeProduct(product: Product): void;
  updateCartWithCalculation(cart: Partial<StoreCart>): void;
  updateProductCount(product: Product, count: number): void;
}

export interface StoreCartProduct {
  discountSubtotal: number;
  discountTotal: number;
  product: Product;
  count: number;
  soldOut: boolean;
  subtotal: number;
  total: number;
}
