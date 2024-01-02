export const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000' as const;
export const apiBaseUrl = `${baseUrl}/api` as const;
export const dummyJsonApiUrl = 'https://dummyjson.com' as const;

export const apiProductsUrl = `${dummyJsonApiUrl}/products` as const;
export const toApiProductByIdUrl = (id: string) => `${dummyJsonApiUrl}/products/${id}` as const;
export const apiCartUrl = `${apiBaseUrl}/cart`;
export const debounceTimeoutInMs = 350 as const;
