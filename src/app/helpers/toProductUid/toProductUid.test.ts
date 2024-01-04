import { describe, expect, it } from 'vitest';

import { toProductUid } from './toProductUid';
import { productMock } from '@/app/__mocks__/product-mock';

describe(toProductUid.name, () => {
  it('parses product search params correctly', () => {
    const result = toProductUid(productMock);

    expect(result).toBe('fragrances:Royal_Mirage:12');
  });

});;
