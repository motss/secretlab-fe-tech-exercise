export interface ProductsGridFiltersProps {
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
