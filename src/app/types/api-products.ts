import type { Product } from './api-product';

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
