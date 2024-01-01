import Link from 'next/link';

import { HeaderCartCount } from './HeaderCartCount/HeaderCartCount';

export function Header() {
  return (
    <header>
      <Link href="/products">Home</Link>
      <p>Header</p>
      <HeaderCartCount />
    </header>
  );
}
