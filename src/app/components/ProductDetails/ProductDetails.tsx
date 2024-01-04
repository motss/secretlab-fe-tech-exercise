'use client';

import { useState, type ComponentProps } from 'react';

import { formatPrice } from '@/app/helpers/formatPrice/formatPrice';
import { useIsClient } from '@/app/hooks/useIsClient/useIsClient';
import { useStoreActions } from '@/app/hooks/useStoreActions/useStoreActions';
import { AddToCart } from '../AddToCart/AddToCart';
import { Discount } from '../Discount/Discount';
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
          <div className="flex flex-gap gap-2 items-center mb-2">
            <Discount discountPercentage={product.discountPercentage} price={product.price} />
            <Rating rating={product.rating} />
          </div>
          <h2 className="text-2xl">{product.title}</h2>
          <Price as="h2" discountPercentage={product.discountPercentage} price={product.price} />
        </section>

        <section className="mb-6">
          <AddToCart stock={product.stock} value={value} onClick={handleClick} onInput={handleInput} />
        </section>

        <dl className="mb-4">
          <dt className="text-lg font-bold">Description</dt>
          <dd>{product.description}</dd>
        </dl>

        <dl className="mb-4">
          <dt className="text-lg font-bold">Attributes</dt>
          <dd>
            <table>
              <caption className="sr-only">List of product attributes</caption>
              <thead>
                <tr>
                  <th className="border text-start px-2">Name</th>
                  <th className="border text-start px-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2">Price</td>
                  <td className="border px-2">{formatPrice(product.price)}</td>
                </tr>
                <tr>
                  <td className="border px-2">Discount percentage</td>
                  <td className="border px-2">{product.discountPercentage}%</td>
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
          </dd>
        </dl>
      </div>
    </section>
  ) : null;
}
