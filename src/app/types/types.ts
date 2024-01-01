import type { InferGetServerSidePropsType } from 'next/types';

export type ApiResponse<Data extends object | undefined = undefined, Err extends Error | undefined = undefined> = {
  data: Data;
  error: undefined;
} | {
  data: undefined;
  error: Err;
};

interface AppPageProps<
  Params extends object = object,
  SearchParams extends object = object
> {
  params: Params;
  searchParams: SearchParams;
}

export type AppPageServerProps<
  Params extends object = object,
  SearchParams extends object = object,
  Fn extends (args: any) => Promise<{ props: object; }> = (args: any) => Promise<{ props: object; }>
> = FallbackNever<InferGetServerSidePropsType<Fn>> & AppPageProps<Params, SearchParams>;

type FallbackNever<T extends object | never> = T extends never ? object : T;
