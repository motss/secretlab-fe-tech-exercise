import { NextResponse } from 'next/server';

import { getProducts } from '@/app/helpers/getProducts/getProducts';
import { parseProductsSearchParams } from '@/app/helpers/parseProductsSearchParams/parseProductsSearchParams';
import type { ApiResponse } from '@/app/types/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filters = parseProductsSearchParams(searchParams);

  const { data, error } = await getProducts(filters);

  if (error) {
    return NextResponse.json<ApiResponse<undefined, typeof error>>({
      data: undefined,
      error,
    });
  }

  return NextResponse.json<ApiResponse<typeof data, undefined>>({
    data,
    error: undefined,
  });
}
