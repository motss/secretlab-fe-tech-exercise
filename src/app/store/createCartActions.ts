import type { StateCreator } from 'zustand';

import type { Product } from '@/app/types/api-product';
import type { AppStoreState, StoreCartActions } from '@/app/store/types';

function toUid({ brand, category, id }: Product) {
  return [
    category,
    brand,
    id,
  ].join(':');
}

export const createCartActions: StateCreator<AppStoreState, [], [], StoreCartActions> = (set, get) => {
  return {
    decrementProductCountBy(product, offset) {
      set((state) => {
        const uid = toUid(product);
        const found = state.cart.products[uid];

        if (found) {
          if (1 === found.count) {
            delete state.cart.products[uid];
          } else {
            state.cart.products[uid].count += (offset || 0);
          }
        }

        return state;
      });
    },
    getTotalProductCount(products) {
      return Object.values(products).reduce((sum, product) => sum + product.count, 0);
    },
    getProduct(product) {
      const uid = toUid(product);
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
        const uid = toUid(product);
        const found = state.cart.products[uid];

        if (found) {
          found.count += (offset || 0);
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
    updateProductCount(product, count) {
      set((state) => {
        const uid = toUid(product);
        const found = state.cart.products[uid];

        if (found) {
          found.count = count;
        }

        return state;
      });
    }
  };
};
