'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ComponentProps } from 'react';

import { Button } from '../components/Button/Button';
import { Price } from '../components/Price/Price';
import { TextField } from '../components/TextField/TextField';
import { useIsClient } from '../hooks/useIsClient/useIsClient';
import { useStoreActions } from '../hooks/useStoreActions/useStoreActions';

export default function Cart() {
  const { push } = useRouter();
  const ready = useIsClient();
  const { getProductList, getSummary, removeProduct, updateProductCount } = useStoreActions();

  const products = getProductList();
  const { discountTotal, subtotal, total } = getSummary();

  const handleCheckout = () => {
    push('/checkout');
  };

  const handleRemoveProduct: ComponentProps<'button'>['onClick'] = (ev) => {
    const { id } = ev.currentTarget.dataset as { id: string; };
    const product = products.find(({ product }) => id === String(product.id));

    if (product) {
      removeProduct(product.product);
    };
  };

  const handleCount: ComponentProps<'input'>['onInput'] = (ev) => {
    const { id } = ev.currentTarget.dataset as { id: string; };
    const product = products.find(({ product }) => id === String(product.id));
    const newCount = ev.currentTarget.valueAsNumber;

    if (product) {
      if (newCount === 0) {
        removeProduct(product.product);
      } else {
        updateProductCount(product.product, newCount);
      }
    }
  };

  return ready ? (
    <div className="lg:flex lg:gap-6 xl:gap-10 px-2 lg:px-6 xl:px-10">
      <ul className="lg:basis-9/12 pt-4 pb-[300px]">
        {products.map(({
          count,
          product,
          total,
        }) => {
          return (
            <li key={product.id} className="flex gap-x-2 mb-2 ps-2 pe-2 pb-6">
              <Link className="flex gap-x-2 basis-9/12" href={`/products/${product.id}`}>
                <section className="basis-1/12 min-w-16 lg:min-w-24 aspect-square">
                  <img className="w-full max-h-[500px] object-contain bg-slate-900" loading="lazy" decoding="async" alt={product.title} src={product.images[0]} />
                </section>

                <section className="">
                  <h2 className="text-2xl">{product.title}</h2>
                  <Price className="mb-4" discountPercentage={product.discountPercentage} price={product.price} size="small" />
                  <h3>{product.brand}</h3>
                  <h3>{product.category}</h3>
                </section>
              </Link>

              <section className="flex flex-col gap-1 basis-3/12 items-end">
                <p className="text-lg font-bold">${total.toFixed(2)}</p>
                <TextField type="number" data-id={product.id} value={count} min="0" max={product.stock || 99} onInput={handleCount} />
                <Button className="max-w-fit pe-0 bg-transparent hover:bg-transparent hover:text-red-600 underline decoration-dotted" type="button" data-id={product.id} onClick={handleRemoveProduct}>Remove</Button>
              </section>
            </li>
          );
        })}
      </ul>

      <div className="lg:relative lg:basis-3/12 flex flex-col fixed inset-x-0 bottom-0 bg-white lg:bg-transparent shadow-inner lg:shadow-none px-2 pb-10 lg:p-0">
        <table className="mb-8 lg:mb-10 border-none">
          <caption className="lg:text-center font-bold p-4 ps-2 pe-2">Cart summary</caption>
          <colgroup>
            <col className="w-[50%]"></col>
            <col className="w-[50%]"></col>
          </colgroup>
          <tbody>
            <tr>
              <th className="text-start" scope="row">Subtotal</th>
              <td className="text-end">${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-start" scope="row">Discount</th>
              <td className="text-end">${discountTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-start" scope="row">Total</th>
              <td className="text-end">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <Button className="mx-4 lg:mx-1" type="button" disabled={!total} onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  ) : null;
}

// todo: view added products
// todo: able to inc/ dec quantity of added product
// todo: able to remove added product
// todo: able to update cart on quantity changes without page refresh
// todo: live calculation of all prices including cart summary total
