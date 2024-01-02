import type { ProductsGridProps } from './types';
import Link from 'next/link';

export function ProductsGrid({
  products,
}: ProductsGridProps) {
  return (
    <div>
      Products

      <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>
                <p>id: {product.id}</p>
                <p>title: {product.title}</p>
                <p>brand: {product.brand}</p>
                <p>category: {product.category}</p>
                <p>price: {product.price}</p>
                <p>rating: {product.rating}</p>
                <p>stock: {product.stock}</p>
                <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.thumbnail}</p>
                <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.images.join()}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
