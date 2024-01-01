'use client';

import { type ComponentProps, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useStoreActions } from '../hooks/useStoreActions/useStoreActions';
import { useIsClient } from '../hooks/useIsClient/useIsClient';

export default function Cart() {
  const { push } = useRouter();
  const ready = useIsClient();
  const { getProductList, getSummary, removeProduct } = useStoreActions();
  const [checkingOut, setCheckingOut] = useState(false);

  const products = getProductList();
  const { discountTotal, subtotal, total } = getSummary();

  const handleCheckout = () => {
    setCheckingOut(true);

    // fixme: simulate checkout flow
    window.setTimeout(() => {
      push('/checkout');
    }, 3e3);
  };

  const handleRemoveProduct: ComponentProps<'button'>['onClick'] = (ev) => {
    const { id } = ev.currentTarget.dataset as { id: string; };

    const product = products.find(({ product }) => id === String(product.id));

    if (product) {
      removeProduct(product.product);
    };
  };

  return ready ? (
    <div>
      <ul>
        {products.map(({
          count,
          discountSubtotal,
          discountTotal,
          product,
          soldOut,
          subtotal,
          total,
        }) => {
          return (
            <li key={product.id}>
              <p>id: {product.id}</p>
              <p>title: {product.title}</p>
              <p>brand: {product.brand}</p>
              <p>price: {product.price}</p>
              <p>rating: {product.rating}</p>
              <p>stock: {product.stock}</p>
              <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.thumbnail}</p>
              <p className="w-[100%] break-words break-all whitespace-nowrap text-balance text-ellipsis">{product.images.join()}</p>
              <p>count: {count}</p>
              <p>subtotal: {subtotal}</p>
              <p>total: {total}</p>
              <p>discountSubtotal: {discountSubtotal}</p>
              <p>discountTotal: {discountTotal}</p>
              <p>soldOut: {soldOut}</p>

              <button type="button" data-id={product.id} onClick={handleRemoveProduct}>Remove</button>
            </li>
          );
        })}
      </ul>

      <div>
        <p>Cart summary</p>
        <p>subtotal: {subtotal}</p>
        <p>discountTotal: {discountTotal}</p>
        <p>total: {total}</p>

        <button type="button" onClick={handleCheckout}>Checkout</button>
        {checkingOut ? <p>Redirecting to checkout page...</p> : null}
      </div>
    </div>
  ) : null;
}

// todo: view added products
// todo: able to inc/ dec quantity of added product
// todo: able to remove added product
// todo: able to update cart on quantity changes without page refresh
// todo: live calculation of all prices including cart summary total
