import { ProductsGrid } from '../components/ProductsGrid/ProductsGrid';
import { ProductsGridFilters } from '../components/ProductsGridFilters/ProductsGridFilters';
import { getProducts } from '../helpers/getProducts/getProducts';
import { getProductsCategories } from '../helpers/getProductsCategories/getProductsCategories';
import { parseProductsSearchParams } from '../helpers/parseProductsSearchParams/parseProductsSearchParams';
import type { Products } from '../types/api-products';
import type { AppPageServerProps } from '../types/types';

export default async function Products({
  searchParams,
}: AppPageServerProps) {
  const filters = parseProductsSearchParams(new URLSearchParams(searchParams as Record<string, string>));

  const products = await getProducts(filters);
  const categories = await getProductsCategories();

  const error = products.error || categories.error;

  return (
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          <ProductsGridFilters categories={categories.data} />
          <ProductsGrid products={products.data.products} />
        </div>
      )}
    </div>
  );
}

// todo: list of products in a grid
// todo: filter functiosn to filter by categories
// todo: filter functiosn to filter by rating
// todo: filter functiosn to filter by price range
