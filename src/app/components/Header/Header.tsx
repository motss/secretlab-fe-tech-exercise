import Link from 'next/link';

import { HeaderCartCount } from '../HeaderCartCount/HeaderCartCount';

export function Header() {
  return (
    <header className="sticky top-0 flex justify-between items-center p-4 py-6 mb-6 bg-white drop-shadow-sm text-xl">
      <Link href="/products">Home</Link>
      <HeaderCartCount />
    </header>
  );
}
