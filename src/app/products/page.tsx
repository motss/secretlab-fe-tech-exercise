import { ProductsGrid } from '../components/ProductsGrid/ProductsGrid';
import { ProductsGridFilters } from '../components/ProductsGridFilters/ProductsGridFilters';
import { getProducts } from '../helpers/getProducts/getProducts';
import { getProductsCategories } from '../helpers/getProductsCategories/getProductsCategories';
import { parseProductsSearchParams } from '../helpers/parseProductsSearchParams/parseProductsSearchParams';
import type { Products } from '../types/api-products';
import type { AppPageServerProps } from '../types/types';

export const revalidate = 0;

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
        <>
          <ProductsGridFilters className="xl:px-8" categories={categories.data} />
          <ProductsGrid className="xl:px-8" products={products.data.products} />
        </>
      )}
    </div>
  );
}
