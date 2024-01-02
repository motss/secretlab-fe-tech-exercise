import { NextResponse } from 'next/server';

import { getProducts } from '@/app/helpers/getProducts/getProducts';
import { ApiResponse } from '@/app/types/types';

export async function GET() {
  const { data, error } = await getProducts();

  return NextResponse.json<ApiResponse<typeof data, typeof error>>(
    error ? { data: undefined, error } : { data, error: undefined }
  );
}
