'use client';

import { useState, type ComponentProps } from 'react';

import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';
import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import { Price } from '../Price/Price';
import { Rating } from '../Rating/Rating';
import type { ProductDetailsProps } from './types';

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
    <section className="flex flex-col items-center" data-id={product.id}>
      <img className="w-full max-h-[500px] object-contain aspect-video bg-slate-900" loading="lazy" decoding="async" alt={product.title} src={product.images[0]} />

      <div className="max-w-[800px] w-full p-4 py-6">
        <section className="mb-4">
          <Rating rating={product.rating} />
          <h2 className="text-2xl">{product.title}</h2>
          <Price as="h2" discountPercentage={product.discountPercentage} price={product.price} />
        </section>

        <section className="mb-6">
          <input type="number" value={value} min="1" max={product.stock || 99} onInput={handleInput} />
          <button type="button" onClick={handleClick}>Add to cart</button>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold">Description</h2>
          <p>{product.description}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold">Attributes</h2>
          <table>
            <thead>
              <tr>
                <th className="border text-start px-2">Name</th>
                <th className="border text-start px-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2">Price</td>
                <td className="border px-2">${product.price.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border px-2">Discount percentage</td>
                <td className="border px-2">{product.discountPercentage.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="border px-2">Brand</td>
                <td className="border px-2">{product.brand}</td>
              </tr>
              <tr>
                <td className="border px-2">Category</td>
                <td className="border px-2">{product.category}</td>
              </tr>
              <tr>
                <td className="border px-2">Stock</td>
                <td className="border px-2">{product.stock}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </section>
  ) : null;
}
