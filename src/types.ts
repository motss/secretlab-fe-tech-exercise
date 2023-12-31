import type { InferGetServerSidePropsType } from 'next/types';

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
  Fn extends (args: any) => { props: object; } = (args: any) => { props: object; }
> = FallbackNever<InferGetServerSidePropsType<Fn>> & AppPageProps<Params, SearchParams>;

type FallbackNever<T extends object | never> = T extends never ? object : T;
