import type { AppPageServerProps } from '@/types';

interface Params {
  id: string;
}

export default function ProductId({
  params
}: AppPageServerProps<Params>) {
  const { id } = params;

  return (
    <div>
      Product [id]
      <br />
      id: {id}
    </div>
  );
}

// todo: view product details
// todo: add to cart button to add product to cart
// todo: product detail should show added count when added to cart
