export interface ProductsSearchParams {
  filter?: {
    category?: string;
    price?: [number, number];
    rating?: [number, number];
  };
}
