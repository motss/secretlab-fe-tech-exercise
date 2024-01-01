'use client';

import Link from 'next/link';

import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';
import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';

export function HeaderCartCount() {
  const { getTotalProductCount } = useStoreActions();
  const ready = useIsClient();

  return ready ? (
    <Link href="/cart">{getTotalProductCount()}</Link>
  ) : null;
}
