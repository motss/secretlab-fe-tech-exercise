import type { InferGetServerSidePropsType } from 'next/types';
import type { FallbackNever } from './utility';

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
  Fn extends (...args: any) => Promise<{ props: object; }> = (...args: unknown[]) => Promise<{ props: object; }>
> = FallbackNever<InferGetServerSidePropsType<Fn>> & AppPageProps<Params, SearchParams>;

export type ApiResponse<Data extends object | undefined | null = undefined, Err extends Error | undefined | null = undefined> = {
  data: NonNullable<Data>;
  error: undefined;
} | {
  data: undefined;
  error: NonNullable<Err>;
};
