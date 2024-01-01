import Link from 'next/link';

import { getProducts } from '../helpers/getProducts/getProducts';
import type { Products } from '../types/api-products';
import type { AppPageServerProps } from '../types/types';

export default async function Products({
}: AppPageServerProps) {
  const { data, error } = await getProducts();

  return (
    <div>
      Products

      {error ? (<p>{error.message}</p>) : (
        <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {data.products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/product/${product.id}`}>
                  <p>id: {product.id}</p>
                  <p>title: {product.title}</p>
                  <p>brand: {product.brand}</p>
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
      )}
    </div>
  );
}

// todo: list of products in a grid
// todo: filter functiosn to filter by categories
// todo: filter functiosn to filter by rating
// todo: filter functiosn to filter by price range
