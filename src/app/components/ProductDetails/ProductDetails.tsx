'use client';

import { useState, type ComponentProps } from 'react';

import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import type { ProductDetailsProps } from './types';
import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';

export function ProductDetails({
  product,
}: ProductDetailsProps) {
  const ready = useIsClient();
  const { getProduct, incrementProductCountBy: incrementProductCount } = useStoreActions();

  const cartProduct = getProduct(product);
  const [value, setValue] = useState(cartProduct?.count || 1);

  const handleClick = () => {
    if (product && value) {
      incrementProductCount(product, value);
    }
  };

  const handleInput: ComponentProps<'input'>['onInput'] = (ev) => {
    const newQuantity = ev.currentTarget.valueAsNumber;

    setValue(newQuantity);
  };

  return ready ? (
    <article>
      <p>id: {product.id}</p>
      <p>title: {product.title}</p>
      <p>brand: {product.brand}</p>
      <p>price: {product.price}</p>
      <p>rating: {product.rating}</p>
      <p>stock: {product.stock}</p>
      <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.thumbnail}</p>
      <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.images.join()}</p>

      <input type="number" value={value} min="1" max={product.stock || 99} onInput={handleInput} />
      <button type="button" onClick={handleClick}>Add to cart</button>
    </article>
  ) : null;
}
