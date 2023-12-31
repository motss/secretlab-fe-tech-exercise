export const apiBaseUrl = 'https://dummyjson.com' as const;
export const apiProductsUrl = `${apiBaseUrl}/products` as const;
export const toApiProductByIdUrl = (id: string) => `${apiBaseUrl}/products/${id}` as const;
