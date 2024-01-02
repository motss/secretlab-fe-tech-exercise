import { useDebounce, useMount } from 'react-use';
import { useStore } from 'zustand';

import { debounceTimeoutInMs } from '@/app/constants/global';
import { getCartCalculation } from '@/app/helpers/getCartCalculation/getCartCalculation';
import { store } from '@/app/store/store';
import type { StoreCart } from '@/app/store/types';
import { useCallback, useEffect, useRef } from 'react';

export function useCalculateCart() {
  const storeCart = useStore(store, state => state.cart);
  const updateCartWithCalculation = useStore(store, state => state.actions.updateCartWithCalculation);
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const runUpdater = useCallback(async (cart: StoreCart) => {
    const { data, error } = await getCartCalculation(cart, { signal: abortControllerRef.current.signal });

    if (error && error.message !== 'signal is aborted without reason') {
      updateCartWithCalculation({ error });
    } else if (data) {
      updateCartWithCalculation({ ...data, error: undefined });
    }

    abortControllerRef.current = new AbortController();
  }, [updateCartWithCalculation]);

  const [isReady] = useDebounce(
    () => {
      if (storeCart.shouldRecalculate) runUpdater(storeCart);
    },
    debounceTimeoutInMs,
    [storeCart],
  );

  useEffect(() => {
    if (storeCart.shouldRecalculate) {
      const state = isReady();

      if (!state) {
        abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();
      }
    }
  }, [isReady, storeCart]);

  useMount(() => {
    runUpdater(storeCart);
  });
}
