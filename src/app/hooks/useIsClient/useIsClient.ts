import { useState } from 'react';
import { useMount } from 'react-use';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useMount(() => {
    setIsClient(true);
  });

  return isClient;
}
