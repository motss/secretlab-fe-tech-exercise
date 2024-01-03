import Link from 'next/link';

import { ProductCard } from '../ProductCard/ProductCard';
import type { ProductsGridProps } from './types';

export function ProductsGrid({
  className,
  products,
}: ProductsGridProps) {
  return (
    <div className={`grid gap-6 gap-y-8 px-4 ${className}`}>
      <p className="text-center">Showing <b>{products.length}</b> products:</p>

      <ul className="grid gap-8 gap-x-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="grid justify-center mt-6 mb-8">End of page</p>
    </div>
  );
}
