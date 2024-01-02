import { RatingIcon } from '../RatingIcon/RatingIcon';
import styles from './styles.module.css';
import type { ProductCardProps } from './types';

export function ProductCard({
  product
}: ProductCardProps) {
  return (
    <div
      className={`${styles.card} grid gap-2 grid-cols-[1fr,auto]`}
      data-id={product.id}
      data-stock={product.stock}
    >
      <img className={`${styles.img} aspect-video object-contain object-center bg-slate-100`} decoding='async' loading='lazy' src={product.thumbnail} />

      <div className="ps-2">
        <p className={styles.title}>{product.title}</p>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.category}>{product.category}</p>
      </div>

      <div className="flex flex-col items-end pe-2">
        <p className={`${styles.price} flex gap-2 items-center text-2xl font-bold`}>${product.price.toFixed(2)}</p>
        <p className={`${styles.rating} flex gap-1 items-center text-sm`}><RatingIcon fill="#ff9800" />{product.rating}</p>
      </div>
    </div>
  );
}
