import { Product } from '@/app/types/api-product';

export function toProductUid({ brand, category, id }: Product) {
  return [
    category,
    brand,
    id,
  ].map(n => String(n).replace(/\s/g, '+'))
    .join(':');
}
