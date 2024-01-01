import Link from 'next/link';

export function Header() {
  return (
    <header>
      <Link href="/products">Home</Link>
      <p>Header</p>
      {/* <Link href="/cart" /> */}
    </header>
  );
}
