import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { initialStoreState } from './constants';
import { createCartActions } from './createCartActions';
import type { AppStoreStateAndActions } from './types';

export const store = createStore<AppStoreStateAndActions>()(
  persist(
    immer(
      (...args) => {
        return {
          ...initialStoreState,
          actions: {
            ...createCartActions(...args),
          },
        };
      },
    ),
    {
      name: 'app:store',
      partialize({ actions, ...rest }) {
        return rest;
      },
      version: 0,
    }
  )
);
