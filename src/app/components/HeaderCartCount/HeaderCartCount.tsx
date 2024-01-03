'use client';

import Link from 'next/link';

import { useCalculateCart } from '@/app/hooks/useCalculateCart/useCalculateCart';
import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';
import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import { CartIcon } from '../CartIcon/CartIcon';
import { Badge } from '../Badge/Badge';

export function HeaderCartCount() {
  const { getTotalProductCount } = useStoreActions();
  const ready = useIsClient();
  useCalculateCart();

  return ready ? (
    <Link className="flex items-center gap-1" href="/cart">
      <CartIcon />
      <Badge count={getTotalProductCount()} />
    </Link>
  ) : null;
}
