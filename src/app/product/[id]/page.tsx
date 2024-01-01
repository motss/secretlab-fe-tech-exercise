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

  return (
    <div>
      Product [id]
      <br />
      id: {id}

      {error ? (
        <p>{error.message}</p>
      ) : (
        <section>
          <p>id: {data.id}</p>
          <p>title: {data.title}</p>
          <p>brand: {data.brand}</p>
          <p>price: {data.price}</p>
          <p>rating: {data.rating}</p>
          <p>stock: {data.stock}</p>
          <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{data.thumbnail}</p>
          <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{data.images.join()}</p>
        </section>
      )}
    </div>
  );
}

// todo: view product details
// todo: add to cart button to add product to cart
// todo: product detail should show added count when added to cart
