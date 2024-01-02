'use client';

import Link from 'next/link';

import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';
import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import { useCalculateCart } from '@/app/hooks/useCalculateCart/useCalculateCart';

export function HeaderCartCount() {
  const { getTotalProductCount } = useStoreActions();
  const ready = useIsClient();
  useCalculateCart();

  return ready ? (
    <Link href="/cart">{getTotalProductCount()}</Link>
  ) : null;
}
