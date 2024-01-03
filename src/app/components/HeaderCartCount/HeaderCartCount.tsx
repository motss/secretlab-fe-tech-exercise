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
    <Link className="block relative w-10 h-10" href="/cart">
      <CartIcon />
      <Badge className="absolute right-0 -bottom-[2px]" count={getTotalProductCount()} />
    </Link>
  ) : null;
}
