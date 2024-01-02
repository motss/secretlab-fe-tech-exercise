import { Big } from 'big.js';
import { NextResponse } from 'next/server';

import { getProducts } from '@/app/helpers/getProducts/getProducts';
import type { StoreCart, StoreCartProduct } from '@/app/store/types';
import type { Product } from '@/app/types/api-product';
import type { ApiResponse } from '@/app/types/types';
import { toProductUid } from '@/app/helpers/toProductUid/toProductUid';

interface CartApiRequestBody extends Pick<StoreCart, 'products'> {}

export async function POST(req: Request) {
  try {
    const { data, error } = await getProducts();

    if (error) {
      throw error;
    }

    const productsMap = new Map(data.products.map((product) => [product.id, product]));
    const { products } = await req.json() as CartApiRequestBody;

    const summary: StoreCart = {
      discountTotal: 0,
      products: {},
      subtotal: 0,
      total: 0,
      shouldRecalculate: false,
    };
    const productsWithCalculation = Object.entries(products)
      .filter(([, v]) => {
        return productsMap.has(v.product.id);
      })
      .map<[string, StoreCartProduct]>(([, { count, product }]) => {
        const foundProduct = productsMap.get(product.id) as Product;
        const { discountPercentage, price, stock } = foundProduct;

        const soldOut = stock <= 0;

        const discountSubtotal = new Big(price).times(new Big(discountPercentage).div(100));
        const discountTotal = new Big(discountSubtotal).times(count);
        const subtotal = new Big(price).times(count);
        const total = subtotal.minus(discountTotal);

        if (discountTotal.toNumber() > 0) {
          summary.discountTotal = discountTotal.add(summary.discountTotal).toNumber();
        }

        if (subtotal.toNumber() > 0) {
          summary.subtotal = subtotal.add(summary.subtotal).toNumber();
        }

        return [
          toProductUid(product),
          {
            count,
            discountSubtotal: discountSubtotal.toNumber(),
            discountTotal: discountTotal.toNumber(),
            product: foundProduct,
            soldOut,
            subtotal: subtotal.toNumber(),
            total: total.toNumber(),
          }
        ];
      });

    summary.products = Object.fromEntries(productsWithCalculation);
    summary.total = new Big(summary.subtotal).minus(summary.discountTotal).toNumber();

    return NextResponse.json<ApiResponse<typeof summary, typeof error>>({
      data: summary,
      error: undefined,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<undefined, Error>>({
      data: undefined,
      error: error as Error,
    });
  }
}
