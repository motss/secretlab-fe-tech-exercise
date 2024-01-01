import type { StateCreator } from 'zustand';

import type { Product } from '@/app/types/api-product';
import type { AppStoreState, StoreCartActions } from '@/app/types/store';

function toUid({ brand, category, id }: Product) {
  return [
    category,
    brand,
    id,
  ].join(':');
}

export const createCartActions: StateCreator<AppStoreState, [], [], StoreCartActions> = (set, get) => {
  return {
    decrementProductCount(product) {
      set((state) => {
        const uid = toUid(product);
        const found = state.cart.products[uid];

        if (found) {
          if (1 === found.count) {
            delete state.cart.products[uid];
          } else {
            state.cart.products[uid].count += 1;
          }
        }

        return state;
      });
    },
    getTotalProductCount() {
      return Object.keys(get().cart.products).length;
    },
    incrementProductCount(product) {
      debugger;
      set((state) => {
        const uid = toUid(product);
        const found = state.cart.products[uid];

        if (found) {
          found.count += 1;
        } else {
          state.cart.products[uid] = {
            // todo: create action to retrieve values
            count: 1,
            discountSubtotal: 0,
            discountTotal: 0,
            product,
            soldOut: false,
            subtotal: 0,
            total: 0,
          };
        }

        return state;
      });
    },
    removeProduct(product) {
      set((state) => {
        delete state.cart.products[toUid(product)];
        return state;
      });
    },
  };
};
