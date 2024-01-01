'use client';

import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import Link from 'next/link';

export function HeaderCartCount() {
  const { getTotalProductCount } = useStoreActions();

  return (
    <Link href="/cart">{getTotalProductCount()}</Link>
  );
}
