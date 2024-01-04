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
