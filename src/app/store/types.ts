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
  decrementProductCountBy(product: Product, offset?: number): void;
  getProduct(product: Product): StoreCartProduct | undefined;
  getProductList(products: NonNullable<StoreCart['products']>): StoreCartProduct[];
  getSummary(cart: StoreCart): Pick<StoreCart, 'discountTotal' | 'subtotal' | 'total'>;
  getTotalProductCount(products: NonNullable<StoreCart['products']>): number;
  incrementProductCountBy(product: Product, offset?: number): void;
  removeProduct(product: Product): void;
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
