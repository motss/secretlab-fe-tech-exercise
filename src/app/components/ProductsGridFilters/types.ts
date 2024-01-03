import type { ComponentProps } from 'react';

export interface ProductsGridFiltersProps extends ComponentProps<'form'> {
  categories: string[];
}

export type ProductsGridFiltersState = Record<
  | 'category'
  | 'minPrice'
  | 'maxPrice'
  | 'minRating'
  | 'maxRating',
  string
>;
