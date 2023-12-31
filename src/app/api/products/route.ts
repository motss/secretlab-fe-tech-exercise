import { NextResponse } from 'next/server';

import { getProducts } from '@/app/helpers/getProducts/getProducts';

export async function GET() {
  const { data, error } = await getProducts();

  return NextResponse.json({ data, error });
}
