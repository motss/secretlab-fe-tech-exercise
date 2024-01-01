export type DeepReadonly<T> = T extends object ? {
  [K in keyof T]: Readonly<T[K]>;
} : Readonly<T>;

export type FallbackNever<T extends object | never> = T extends never ? object : T;
