import { ProductDetails } from '@/app/components/ProductDetails/ProductDetails';
import { getProductById } from '@/app/helpers/getProductById/getProductById';
import type { AppPageServerProps } from '@/app/types/types';

interface Params {
  id: string;
}

export default async function ProductId({
  params
}: AppPageServerProps<Params>) {
  const { id } = params;
  const { data, error } = await getProductById(id);

  if (error) {
    return (
      <div>
        <p>Unable to render due to the following error:</p>
        <code>
          <blockquote>{error.message}</blockquote>
        </code>
      </div>
    );
  }

  return (
    <ProductDetails product={data} />
  );
}

// todo: view product details
// todo: add to cart button to add product to cart
// todo: product detail should show added count when added to cart
