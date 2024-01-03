import { Price } from '../Price/Price';
import { Rating } from '../Rating/Rating';
import type { ProductCardProps } from './types';

export function ProductCard({
  product
}: ProductCardProps) {
  return (
    <article data-id={product.id} data-stock={product.stock}>
      <img className="aspect-video object-contain object-center bg-slate-100 mb-2" decoding='async' loading='lazy' alt={''} src={product.thumbnail} />

      <Rating rating={product.rating} />
      <h2 className="text-xl">{product.title}</h2>
      <h2 className="text-slate-500">{product.category}</h2>

      <div className="ps-2">
      </div>

      <Price as="h2" discountPercentage={product.discountPercentage} price={product.price} size="small" />
    </article>
  );
}
