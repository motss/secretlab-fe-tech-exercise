import type { StateCreator } from 'zustand';

import type { AppStoreState, StoreCart, StoreCartActions } from '@/app/store/types';
import { toProductUid } from '../helpers/toProductUid/toProductUid';
import type { OmitKey } from '../types/utility';

export const createCartActions: StateCreator<AppStoreState, [], [], StoreCartActions> = (set, get) => {
  return {
    decrementProductCountBy(product, offset) {
      set((state) => {
        const uid = toProductUid(product);
        const found = state.cart.products[uid];

        if (found) {
          if (1 === found.count) {
            delete state.cart.products[uid];
          } else {
            state.cart.products[uid].count += (offset || 0);
          }
        }

        state.cart.shouldRecalculate = true;

        return state;
      });
    },
    getTotalProductCount(products) {
      return Object.values(products).reduce((sum, product) => sum + product.count, 0);
    },
    getProduct(product) {
      const uid = toProductUid(product);
      const found = get().cart.products[uid];

      return found;
    },
    getProductList(products) {
      return Object.values(products);
    },
    getSummary({ discountTotal, subtotal, total }) {
      return {
        discountTotal,
        subtotal,
        total,
      };
    },
    incrementProductCountBy(product, offset) {
      set((state) => {
        const uid = toProductUid(product);
        const found = state.cart.products[uid];

        if (found) {
          found.count += (offset || 0);
        } else {
          state.cart.products[uid] = {
            count: 1,
            discountSubtotal: 0,
            discountTotal: 0,
            product,
            soldOut: false,
            subtotal: 0,
            total: 0,
          };
        }

        state.cart.shouldRecalculate = true;

        return state;
      });
    },
    removeProduct(product) {
      set((state) => {
        delete state.cart.products[toProductUid(product)];
        state.cart.shouldRecalculate = true;

        return state;
      });
    },
    updateCartWithCalculation(cart) {
      set((state) => {
        Object.entries(cart).forEach(([k, v]) => {
          state.cart[k as keyof OmitKey<StoreCart, 'shouldRecalculate'>] = v as any;
        });

        state.cart.shouldRecalculate = false;

        return state;
      });
    },
    updateProductCount(product, count) {
      set((state) => {
        const uid = toProductUid(product);
        const found = state.cart.products[uid];

        if (found) {
          found.count = count;
        }

        state.cart.shouldRecalculate = true;

        return state;
      });
    },
  };
};
