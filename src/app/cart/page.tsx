'use client';

import { useRouter } from 'next/navigation';
import { useStoreActions } from '../hooks/useStoreActions/useStoreActions';
import { useState } from 'react';

export default function Cart() {
  const { push } = useRouter();
  const { getProductList, getSummary } = useStoreActions();
  const [checkingOut, setCheckingOut] = useState(false);

  const products = getProductList();
  const { discountTotal, subtotal, total } = getSummary();

  const handleClick = () => {
    setCheckingOut(true);

    // fixme: simulate checkout flow
    window.setTimeout(() => {
      push('/checkout');
    }, 3e3);
  };

  return (
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
            <li>
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
            </li>
          );
        })}
      </ul>

      <div>
        <p>Cart summary</p>
        <p>subtotal: {subtotal}</p>
        <p>discountTotal: {discountTotal}</p>
        <p>total: {total}</p>

        <button type="button" onClick={handleClick}>Checkout</button>
        {checkingOut ? <p>Redirecting to checkout page...</p> : null}
      </div>
    </div>
  );
}

// todo: view added products
// todo: able to inc/ dec quantity of added product
// todo: able to remove added product
// todo: able to update cart on quantity changes without page refresh
// todo: live calculation of all prices including cart summary total
