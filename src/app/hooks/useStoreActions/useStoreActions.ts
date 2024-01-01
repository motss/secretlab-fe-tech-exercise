import { useStore } from 'zustand';

import { store } from '@/app/helpers/store/store';

export function useStoreActions() {
  const storeActions = useStore(store, state => state.actions);

  return storeActions;
}
